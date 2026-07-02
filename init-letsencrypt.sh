#!/bin/bash
# Bootstrap Let's Encrypt certificates for crivo.in
# Run once on a fresh server before starting docker-compose.
set -e

DOMAINS=(crivo.in www.crivo.in)
EMAIL="ai@zeoncharging.com"          # change if needed
STAGING=0                            # set to 1 to test without rate-limiting

DATA_PATH="./certbot"
RSA_KEY_SIZE=4096

# ── 1. Download recommended TLS parameters ───────────────────────────────────
if [ ! -e "$DATA_PATH/conf/options-ssl-nginx.conf" ] || \
   [ ! -e "$DATA_PATH/conf/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters…"
  mkdir -p "$DATA_PATH/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf \
    > "$DATA_PATH/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem \
    > "$DATA_PATH/conf/ssl-dhparams.pem"
fi

# ── 2. Create dummy certificate so nginx can start ───────────────────────────
LIVE="$DATA_PATH/conf/live/crivo.in"
if [ ! -e "$LIVE/fullchain.pem" ]; then
  echo "### Creating dummy certificate for crivo.in…"
  mkdir -p "$LIVE"
  openssl req -x509 -nodes -newkey rsa:$RSA_KEY_SIZE -days 1 \
    -keyout "$LIVE/privkey.pem" \
    -out    "$LIVE/fullchain.pem" \
    -subj '/CN=localhost' 2>/dev/null
fi

# ── 3. Start nginx with dummy cert ───────────────────────────────────────────
echo "### Starting nginx…"
docker compose up --build -d crivo

# ── 4. Delete dummy cert ─────────────────────────────────────────────────────
echo "### Deleting dummy certificate…"
docker compose run --rm --entrypoint \
  "rm -Rf /etc/letsencrypt/live/crivo.in \
          /etc/letsencrypt/archive/crivo.in \
          /etc/letsencrypt/renewal/crivo.in.conf" \
  certbot

# ── 5. Request real certificate ──────────────────────────────────────────────
STAGING_FLAG=""
[ "$STAGING" -eq 1 ] && STAGING_FLAG="--staging"

DOMAIN_ARGS=""
for d in "${DOMAINS[@]}"; do DOMAIN_ARGS="$DOMAIN_ARGS -d $d"; done

echo "### Requesting Let's Encrypt certificate…"
docker compose run --rm --entrypoint \
  "certbot certonly --webroot -w /var/www/certbot \
    $STAGING_FLAG \
    $DOMAIN_ARGS \
    --email $EMAIL \
    --rsa-key-size $RSA_KEY_SIZE \
    --agree-tos \
    --non-interactive \
    --force-renewal" \
  certbot

# ── 6. Reload nginx with real cert ───────────────────────────────────────────
echo "### Reloading nginx…"
docker compose exec crivo nginx -s reload

echo ""
echo "Done! Bring up the full stack with: docker compose up -d"
