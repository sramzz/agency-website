const logo = (name) => `<img class="platform" src="/assets/images/platforms/logo-${name}.svg" alt="">`;
const frame = (id, title, content, footer) => `<div class="canvas ${id}" data-concept="${id}"><div class="canvas-head"><span class="micro">${title}</span><span class="micro">Ranking Rebels</span></div>${content}<div class="canvas-foot">${footer}</div></div>`;
const variants = [
() => frame('journey','From discovery to enquiry',`
<div class="window search" data-enter="100"><div class="window-bar"><i></i><i></i><i></i>SEARCH / LOCAL DISCOVERY</div><div class="window-content"><div class="query">${logo('google')} Personal trainer near me</div><div class="result"><span class="micro">Northside Studio · Brisbane</span><h3>Your next training session starts here.</h3><p class="small">Personal coaching. A local business, ready to be found.</p></div></div></div>
<div class="window visit" data-enter="1800" data-from="right"><div class="window-bar"><i></i><i></i><i></i>WEBSITE / MAKE IT COUNT</div><div class="window-content"><div><span class="index-label">02 / INTEREST</span><h3 class="title-sm">Turn interest into action.</h3></div><span class="pill">Book a session</span></div></div>
<div class="window lead" data-enter="3600"><div><span class="index-label">03 / ENQUIRY</span><h3 class="title-sm">A new opportunity.</h3><p class="small">Alex would like to book a first session.</p></div><span class="chip accent">Received</span></div>
<div class="handoff" data-enter="5300">Follow-up prepared · Ready for human review</div>`, 'Found. Interested. Contacted. Handled better.'),
() => frame('hub','Your website. Working harder.',`
<div class="hub-layout"><div class="hub-source" data-enter="1100">${logo('google')}Organic discovery</div><div class="hub-source" data-enter="2300">${logo('facebook')}Paid demand</div><div class="hub-source" data-enter="3500">${logo('chatgpt')}Practical automation</div></div>
<div class="window web" data-enter="100"><div class="window-bar"><i></i><i></i><i></i>NORTHSIDE.STUDIO / YOUR GROWTH HUB</div><div class="web-hero"><div><span class="index-label">MOVE WITH PURPOSE</span><h3>Find your strength.<br>Start your next chapter.</h3><span class="pill">Book your first session</span></div><img src="/assets/images/home/organic-discovery-search.webp" alt="Illustrative website visual"></div><div class="web-form"><span>Your next session starts here.</span><span class="chip">Enquiry form</span></div></div>
<div class="hub-success" data-enter="5000">New enquiry received · Follow-up connected</div>`, 'One website. Every channel connected.'),
() => frame('crm','Turn attention into action',`
<div class="crm-board"><div class="crm-col"><h3>01 / NEW</h3><p>Enquiry received</p></div><div class="crm-col"><h3>02 / ASSIGNED</h3><p>Someone owns the next step</p></div><div class="crm-col"><h3>03 / READY</h3><p>Follow-up prepared</p></div></div>
<div class="crm-card"><span class="index-label">NORTHSIDE STUDIO</span><h3 class="title-sm">Alex Morgan</h3><p class="small">First-session enquiry<br>Source: website</p><span class="chip accent">Opportunity</span><div class="crm-tag">One person. A clear next step.</div></div>
<div class="crm-event" data-enter="5300"><span>Follow-up draft is ready</span><span class="index-label">HUMAN REVIEW</span></div>`, 'Marketing creates the opportunity. Systems move it forward.'),
() => frame('system','Build a connected growth system',`
<div class="modules"><div class="module" data-module="0">${logo('google')}<h3>Discovery</h3><p>Search, Maps<br>and AI visibility.</p><div class="module-status" data-enter="2200">VISIBILITY CONNECTED</div></div><div class="module" data-module="1">${logo('facebook')}<h3>Demand</h3><p>Campaigns built<br>around intent.</p><div class="module-status" data-enter="3200">DEMAND CONNECTED</div></div><div class="module" data-module="2">${logo('chatgpt')}<h3>Automation</h3><p>Less admin.<br>Better follow-up.</p><div class="module-status" data-enter="4200">FOLLOW-UP CONNECTED</div></div></div>
<div class="system-spine" data-enter="4500"><div class="line"></div><span class="micro">Connected by strategy</span><div class="line"></div></div>
<div class="system-outcome" data-enter="5200"><h3>One system. More momentum.</h3><p>Start with one constraint. Connect the next useful move.</p></div>`, 'Independent solutions. Stronger connections.'),
() => frame('services','Three solutions. See them work.',`
<div class="service-tabs" aria-label="Choose a service demonstration"><button type="button" data-service="0" aria-pressed="true">Organic</button><button type="button" data-service="1" aria-pressed="false">Paid Ads</button><button type="button" data-service="2" aria-pressed="false">Automation</button></div>
<div class="service-theater"><div class="service-scene" data-scene="0"><span class="index-label">01 / ORGANIC DISCOVERY</span><h3>Be there when they search.</h3><div class="query">${logo('google')} Personal training in Brisbane</div><div class="search-list"><b>Northside Studio — Personal training</b>Relevant local content. A clear reason to choose you.</div><span class="chip accent">Found in the moments that matter</span></div>
<div class="service-scene" data-scene="1"><span class="index-label">02 / PAID DEMAND</span><h3>Make attention count.</h3><div class="ad"><img src="/assets/images/home/paid-ads-platforms.webp" alt="Illustrative paid campaign visual"><div><span class="micro">Northside Studio · Sponsored</span><p class="title-sm">Your first session.<br>Your next step.</p><span class="pill">Explore the programme</span></div></div><p class="small">Relevant campaign → Focused landing page → Enquiry</p></div>
<div class="service-scene" data-scene="2"><span class="index-label">03 / PRACTICAL AUTOMATION</span><h3>Give your team time back.</h3><div class="automation-row"><span>Website enquiry</span><b>RECEIVED</b></div><div class="automation-row"><span>CRM contact</span><b>ASSIGNED</b></div><div class="automation-row"><span>Follow-up draft</span><b>READY TO REVIEW</b></div></div></div>`, 'Explore a service above. Every scene is an illustrative example.')
];
const descriptions = [
['Del descubrimiento a la consulta','Una búsqueda lleva a la web, genera una consulta y prepara el seguimiento. La historia más directa para explicar el valor de los servicios.'],
['La web como centro del crecimiento','La página es el punto de encuentro de búsqueda, anuncios y automatización. Da más protagonismo al diseño y desarrollo web.'],
['De una visita a una oportunidad atendida','La misma consulta avanza por un CRM. Una dirección sobria que demuestra qué ocurre después de conseguir el contacto.'],
['De piezas sueltas a un sistema conectado','Tres módulos se ordenan y se conectan alrededor de una estrategia. Una composición más conceptual y enfocada en el conjunto.'],
['Tres servicios, tres demostraciones','Búsqueda, campañas y automatización en un escenario interactivo. Puedes elegir cada servicio para inspeccionarlo.']
];
let motion = [], paused = false, progressAnimation;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const isReduced = () => reduced.matches || document.getElementById("reduce-motion").checked;
document.getElementById("reduce-motion").addEventListener("change",()=>mount(current));
function animateElement(el, frames, options) {
  const animation = el.animate(frames, options); motion.push(animation); return animation;
}
function enter(el, delay, from = 'bottom') {
  if (isReduced()) return;
  const transform = from === 'right' ? 'translateX(18px)' : 'translateY(14px)';
  animateElement(el,[{opacity:0,transform},{opacity:1,transform:'translate(0,0)'}],{delay,duration:650,easing:'cubic-bezier(.23,1,.32,1)',fill:'both'});
}
function selectService(index) {
  motion.forEach(a => a.cancel()); motion=[];
  const scenes = [...document.querySelectorAll('[data-scene]')];
  scenes.forEach((el,i) => {el.style.opacity=i===index?'1':'0';el.style.visibility=i===index?'visible':'hidden';});
  document.querySelectorAll('[data-service]').forEach((button,i) => button.setAttribute('aria-pressed',String(i===index)));
  progressAnimation?.cancel();document.getElementById('progress').style.transform='scaleX(1)';
  document.getElementById('play-state').textContent='Escena seleccionada';document.getElementById('pause').disabled=true;
}
function initializeMotion() {
  const canvas=document.querySelector('[data-concept]');if(!canvas)return;
  motion.forEach(a=>a.cancel());motion=[];progressAnimation?.cancel();paused=false;
  document.getElementById('pause').textContent='Pausar';document.getElementById('pause').disabled=isReduced();
  const index=variants.findIndex((_,i)=>['journey','hub','crm','system','services'][i]===canvas.dataset.concept);
  document.getElementById('variant-number').textContent=`0${index+1} / 05`;
  document.getElementById('variant-name').textContent=descriptions[index][0];document.getElementById('variant-description').textContent=descriptions[index][1];
  document.getElementById('play-state').textContent=isReduced()?'Vista con movimiento reducido':'Secuencia de 7 segundos';
  document.getElementById('progress').style.transform='scaleX(1)';
  canvas.querySelectorAll('[data-enter]').forEach(el=>enter(el,Number(el.dataset.enter),el.dataset.from));
  if(index===2 && !isReduced()){const board=canvas.querySelector('.crm-board');const col=canvas.querySelector('.crm-col');const step=col.getBoundingClientRect().width+10;
    animateElement(canvas.querySelector('.crm-card'),[{transform:'translateX(0)',opacity:0,offset:0},{transform:'translateX(0)',opacity:1,offset:.1},{transform:'translateX(0)',opacity:1,offset:.28},{transform:`translateX(${step}px)`,opacity:1,offset:.4},{transform:`translateX(${step}px)`,opacity:1,offset:.6},{transform:`translateX(${step*2}px)`,opacity:1,offset:.72},{transform:`translateX(${step*2}px)`,opacity:1,offset:1}],{duration:6500,easing:'cubic-bezier(.23,1,.32,1)',fill:'both'});
  }
  if(index===3 && !isReduced()){canvas.querySelectorAll('[data-module]').forEach((el,i)=>animateElement(el,[{transform:`translateY(${[24,-15,32][i]}px) rotate(${[-6,3,7][i]}deg)`},{transform:'translateY(0) rotate(0)'}],{delay:600+i*350,duration:1300,easing:'cubic-bezier(.23,1,.32,1)',fill:'both'}));}
  if(index===2 && isReduced()){const col=canvas.querySelector('.crm-col');canvas.querySelector('.crm-card').style.transform=`translateX(${(col.getBoundingClientRect().width+10)*2}px)`;}
  if(index===4){const scenes=[...canvas.querySelectorAll('[data-scene]')];scenes.forEach((el,i)=>{el.style.opacity=i===0?'1':'0';el.style.visibility='visible';el.style.pointerEvents='none';});
    if(!isReduced()){scenes.forEach((el,i)=>{const start=i/3,end=(i+1)/3;const frames=i===0?[{opacity:1,transform:'translateY(0)',offset:0},{opacity:1,transform:'translateY(0)',offset:end-.04},{opacity:0,transform:'translateY(-8px)',offset:end},{opacity:0,transform:'translateY(-8px)',offset:1}]:i===1?[{opacity:0,transform:'translateY(12px)',offset:0},{opacity:0,transform:'translateY(12px)',offset:start-.04},{opacity:1,transform:'translateY(0)',offset:start+.02},{opacity:1,transform:'translateY(0)',offset:end-.04},{opacity:0,transform:'translateY(-8px)',offset:end},{opacity:0,transform:'translateY(-8px)',offset:1}]:[{opacity:0,transform:'translateY(12px)',offset:0},{opacity:0,transform:'translateY(12px)',offset:start-.04},{opacity:1,transform:'translateY(0)',offset:start+.02},{opacity:1,transform:'translateY(0)',offset:1}];animateElement(el,frames,{duration:7000,fill:'both',easing:'linear'});});
      canvas.querySelectorAll('[data-service]').forEach((el,i)=>el.setAttribute('aria-pressed',String(i===0)));
    }
  }
  if(!isReduced()){progressAnimation=document.getElementById('progress').animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:7000,easing:'linear',fill:'both'});progressAnimation.finished.then(()=>{document.getElementById('play-state').textContent='Secuencia completa · Repite para comparar';document.getElementById('pause').disabled=true;}).catch(()=>{});}
}
new MutationObserver(initializeMotion).observe(document.getElementById('stage'),{childList:true});
document.getElementById('pause').addEventListener('click',()=>{paused=!paused;[...motion,progressAnimation].filter(Boolean).forEach(a=>paused?a.pause():a.play());document.getElementById('pause').textContent=paused?'Continuar':'Pausar';document.getElementById('play-state').textContent=paused?'Animación pausada':'Secuencia de 7 segundos';});
document.getElementById('repeat').addEventListener('click',()=>mount(current));
document.getElementById('stage').addEventListener('click',e=>{const control=e.target.closest('[data-service]');if(control)selectService(Number(control.dataset.service));});
reduced.addEventListener('change',initializeMotion);
document.addEventListener('visibilitychange',()=>{if(document.hidden){[...motion,progressAnimation].filter(Boolean).forEach(a=>a.pause());paused=true;document.getElementById('pause').textContent='Continuar';}});
new IntersectionObserver(entries=>{if(!entries[0].isIntersecting){[...motion,progressAnimation].filter(Boolean).forEach(a=>a.pause());paused=true;document.getElementById('pause').textContent='Continuar';}},{threshold:.15}).observe(document.getElementById('stage'));


