#!/bin/bash

echo "=== SETTING UP SSL FOR videobanhang.khoahocai.pro ==="

# Install Certbot
apt update
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d videobanhang.khoahocai.pro --non-interactive --agree-tos --email admin@khoahocai.pro

# Setup auto-renewal
echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -

# Copy certificates to container accessible location
mkdir -p /etc/letsencrypt/live/videobanhang.khoahocai.pro

echo "=== SSL SETUP COMPLETE ==="
echo "Certificates installed at: /etc/letsencrypt/live/videobanhang.khoahocai.pro/"
echo "Auto-renewal configured via cron"
