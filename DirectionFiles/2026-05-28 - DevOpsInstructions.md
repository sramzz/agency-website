
## DevOps Task: Multi-Site Routing & Cloudflare Domain Setup

- [ ] **Task: Route Cloudflare Domain to the Specific Coolify App**
  Since the Hetzner server IP is shared across multiple websites, DNS directs the traffic to the server, and Coolify's reverse proxy catches it and routes it to the specific `Ranking Rebels` static container based on the domain name.

  **Step-by-step execution:**
  1. **Get the Server IP:** Copy the public IPv4 address of your Hetzner VM where Coolify is installed.
  2. **Set up Cloudflare DNS:**
     * Go to your new domain in the Cloudflare Dashboard -> **DNS** -> **Records**.
     * Add an **A Record**: Name = `@` (root), Content = `[Your Hetzner IP Address]`.
     * Add a **CNAME Record**: Name = `www`, Content = `rankingrebels.com` (or your root domain).
     * Ensure the **Proxy status** switch is toggled to **ON** (Orange Cloud) for both records.
  3. **Configure Cloudflare SSL:**
     * Go to **SSL/TLS** -> **Overview** in Cloudflare.
     * Set the encryption mode to **Full (Strict)**. This ensures traffic is encrypted from the user to Cloudflare, and from Cloudflare to your Hetzner server.
     * Go to **SSL/TLS** -> **Edge Certificates** and toggle **"Always Use HTTPS"** to ON.
  4. **Set the FQDN in Coolify:**
     * Log into your Coolify dashboard and open the `Ranking Rebels` static application.
     * Go to **Settings** -> **Domains (FQDN)**.
     * Enter your fully qualified domain names exactly as you want them: `https://rankingrebels.com, https://www.rankingrebels.com`. (Using `https://` tells Coolify to expect an SSL connection).
  5. **Generate SSL on Coolify (Let's Encrypt):**
     * In the Coolify app settings, ensure the SSL/TLS toggle is enabled so Coolify automatically provisions a Let's Encrypt certificate for the domain. 
     * *(Note: Because Cloudflare proxy is ON, Coolify will successfully verify the SSL via HTTP challenge passed through Cloudflare, or you can use a Cloudflare Origin Certificate if you prefer).*
  6. **Deploy & Verify:**
     * Click **Deploy** or **Restart** on the application in Coolify so the reverse proxy registers the new domain rules.
     * Visit the domain in an incognito window. The Coolify reverse proxy will recognize `rankingrebels.com`, ignore your other hosted websites, and serve the Ranking Rebels static files.