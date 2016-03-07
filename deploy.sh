#!/bin/sh
# Deploy to remote
# Usage: ./deploy

# Step 1: build target and install npm modules
gulp build && cd dist && npm install --production && cd .. || exit 1

# Step 2: zip and upload dist
commit_sha1=`git rev-parse HEAD`
date_str=`date +%Y%m%d`
filename="dist-${date_str}-${commit_sha1}"
zip_filename="${filename}.zip"
zip -r $zip_filename dist && scp $zip_filename lishunyang@112.74.81.37:~/ && rm -Rf dist || exit 1

# Step 3: remote deploy target branch
# ssh lishunyang@112.74.81.37 "nohup ./deploy_mage.sh ${filename}"
