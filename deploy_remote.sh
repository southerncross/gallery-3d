#!/bin/sh
# Remote procedure of deployment
#
# Usage: ./deploy_remote.sh <zip file name>
# e.g. ./deploy_dist dist-20160307-64bed75

# Step 1: Stop app service
sudo systemctl stop gallery-3d

# Step 2: Unzip and overwrite app directory
unzip -o $1.zip || exit 1
rm -Rf /opt/app/*
mv dist/* /opt/app/
rm -Rf dist

# Step 3: Start app service
sudo systemctl start gallery-3d
