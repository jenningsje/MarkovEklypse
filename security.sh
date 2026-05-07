#!/usr/bin/env bash
set -euo pipefail

echo "=== Updating Alpine ==="
apk update

echo "=== Installing core system packages ==="
apk add --no-cache \
    ca-certificates \
    bash \
    curl \
    wget \
    openssl \
    tar \
    xz

update-ca-certificates

# -----------------------------
# Docker CLI (maintained, correct arch)
# -----------------------------
echo "=== Installing Docker CLI ==="
apk add --no-cache docker-cli

# -----------------------------
# OpenSSH (patched by Alpine)
# -----------------------------
echo "=== Installing OpenSSH ==="
apk add --no-cache openssh

# -----------------------------
# GnuTLS (patched, CVE-managed)
# -----------------------------
echo "=== Installing GnuTLS ==="
apk add --no-cache gnutls

# -----------------------------
# Optional: dev headers (only if you compile stuff later)
# -----------------------------
# apk add --no-cache gnutls-dev

# -----------------------------
# Cleanup (reduce image size + attack surface)
# -----------------------------
echo "=== Cleaning up ==="
rm -rf /var/cache/apk/*
rm -rf /tmp/*

# -----------------------------
# Verify installs
# -----------------------------
echo "=== Installed versions ==="
echo "--- SSH ---"
ssh -V || true

echo "--- GnuTLS ---"
gnutls-cli --version || true

echo "--- Docker ---"
docker --version || true

echo "=== Security setup complete ==="
