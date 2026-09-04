import { deleteExpiredLeads } from "./storage";

export type ScheduledLeadEnv = {
  DB: D1Database;
  LEAD_EMAIL_QUEUE: LeadQueueProducer;
  LEAD_REQUEUE_AFTER_SECONDS?: string;
};

export type LeadQueueProducer = {
  send: (message: { submissionId: string }) => Promise<unknown> | unknown;
};

export type LeadCleanupMetrics = {
  event: "daily_lead_cleanup";
  expiredLeadsDeleted: number;
  executedAt: string;
  notificationsRequeued?: number;
};

const DEFAULT_REQUEUE_AFTER_SECONDS = 24 * 60 * 60;
const MAX_REQUEUES_PER_RUN = 100;

export async function runDailyLeadCleanup(
  db: D1Database,
  nowIso = new Date().toISOString()
): Promise<LeadCleanupMetrics> {
  const expiredLeadsDeleted = await deleteExpiredLeads(db, nowIso);
  return {
    event: "daily_lead_cleanup",
    expiredLeadsDeleted,
    executedAt: nowIso,
  };
}

export async function runDailyLeadMaintenance(
  env: ScheduledLeadEnv,
  nowIso = new Date().toISOString(),
  maxRequeues = MAX_REQUEUES_PER_RUN
): Promise<LeadCleanupMetrics> {
  const expiredLeadsDeleted = await deleteExpiredLeads(env.DB, nowIso);
  const configuredSeconds = Number(env.LEAD_REQUEUE_AFTER_SECONDS);
  const requeueAfterSeconds = Number.isFinite(configuredSeconds) && configuredSeconds >= 0
    ? configuredSeconds
    : DEFAULT_REQUEUE_AFTER_SECONDS;
  const threshold = new Date(Date.parse(nowIso) - requeueAfterSeconds * 1000).toISOString();
  const stale = await env.DB.prepare(
    `SELECT submission_id FROM leads
     WHERE notification_status IN ('pending', 'failed')
       AND (notification_updated_at IS NULL OR notification_updated_at <= ?)
     ORDER BY notification_updated_at ASC
     LIMIT ?`
  ).bind(threshold, Math.max(0, Math.floor(maxRequeues))).all<{ submission_id: string }>();
  for (const { submission_id: submissionId } of stale.results) {
    await env.LEAD_EMAIL_QUEUE.send({ submissionId });
  }
  return {
    event: "daily_lead_cleanup",
    expiredLeadsDeleted,
    notificationsRequeued: stale.results.length,
    executedAt: nowIso,
  };
}

export async function handleScheduled(
  _controller: ScheduledController,
  env: ScheduledLeadEnv
): Promise<LeadCleanupMetrics> {
  return runDailyLeadMaintenance(env);
}
