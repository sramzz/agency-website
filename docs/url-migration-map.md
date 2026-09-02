# URL migration map

Cloudflare Pages reads the repository-root `_redirects` file. These permanent redirects preserve authority for retired URLs with a direct replacement.

Removed Spanish, onboarding, inactive market, and specialist URLs without an equivalent intentionally use the normal `404.html` response.

Proposals remain accessible only by their exact link. They are excluded from navigation and the sitemap, marked `noindex`, and disallowed in `robots.txt`.
