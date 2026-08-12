# Production deployment

Target: `https://trofimoff.tdistina.ru`

## Build

```bash
pnpm install --frozen-lockfile
pnpm build
```

Upload the **contents** of `dist/` to the document root. Do not upload `src/`,
`node_modules/`, source spreadsheets, prompts, or the original `images/`
directory.

## Nginx

1. Upload `dist/` to `/var/www/trofimoff.tdistina.ru/dist`.
2. Install `deploy/nginx-trofimoff.conf` into `/etc/nginx/sites-available/`.
3. Enable the site, issue the Let's Encrypt certificate, test the config, and
   reload Nginx.
4. If the server uses another document root, update the `root` directive.

The essential SPA rule is:

```nginx
try_files $uri $uri/ /index.html;
```

## Apache or shared hosting

Upload the contents of `dist/`. The generated bundle includes `.htaccess` with
the React Router fallback and cache headers. Apache must allow overrides and
have `mod_rewrite`, `mod_headers`, and `mod_deflate` enabled.

## DNS and TLS

- Add an `A` record for `trofimoff.tdistina.ru` pointing to the server IPv4
  address (and an `AAAA` record only when IPv6 is configured).
- Issue a certificate for `trofimoff.tdistina.ru` before enabling the HTTPS
  server block.
- Redirect HTTP to HTTPS.

## Smoke test after upload

- `/` loads over HTTPS.
- `/flavors/virgin?line=no-aroma` opens directly without a 404.
- Category videos return HTTP 200 and play muted.
- `robots.txt` and `sitemap.xml` return HTTP 200.
