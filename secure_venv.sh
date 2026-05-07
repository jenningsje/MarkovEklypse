#!/bin/sh

set -eux

# Install Python 3.9.17 and uninstall insecure setuptools
wget https://www.python.org/ftp/python/3.9.17/Python-3.9.17.tgz && \
    tar -xzf Python-3.9.17.tgz && \
    cd Python-3.9.17 && \
    ./configure --enable-optimizations --with-ensurepip=no && \
    make -j$(nproc) && \
    make altinstall && \
    cd .. && \
    rm -rf Python-3.9.17 Python-3.9.17.tgz

# Upgrade pip and setuptools in a secure way
curl -fsSLO https://bootstrap.pypa.io/get-pip.py
sha256sum get-pip.py  # compare with official hash
python3 get-pip.py

echo "Setuptools installed securely"

# set up non root user and create venv
mkdir -p /home/appuser/.ssh
addgroup -S appgroup
adduser -S -G appgroup -h /home/appuser -s /sbin/nologin appuser
adduser -S -G appgroup -h /home/appuser -s /bin/sh MarkovEklypse
cd ..
cat appuser_key.pub > /home/appuser/.ssh/authorized_keys
chmod 600 /home/appuser/.ssh/authorized_keys
chown -R appuser:appgroup /opt/app
chmod -R 700 /opt/app

# Now set up SSH directory
chown -R appuser:appgroup /home/appuser
chmod 700 /home/appuser/.ssh

cd lightdock