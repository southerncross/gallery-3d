#!/bin/sh
# Local procedure of deployment
#
# Usage: ./deploy.sh
#
# Note: $GALLERY_3D_USER_HOST should be set in environment already
# e.g. lishunyang@123.456.789

if [ ! $GALLERY_3D_USER_HOST ]; then
  echo '\033[31mERROR:\033[0m $GALLERY_3D_USER_HOST not found' && exit 1
fi

# Step 1: Build and install npm modules
gulp build && cd dist && npm install --production && cd .. || exit 1

# Step 2: Zip and upload dist
commit_sha1=`git rev-parse --short HEAD`
date_str=`date +%Y%m%d`
filename="dist-${date_str}-${commit_sha1}"
zip_filename="${filename}.zip"
zip -r $zip_filename dist && scp $zip_filename $GALLERY_3D_USER_HOST:~/ && rm -Rf dist || exit 1

# Step 3: Call remote script
ssh -t $GALLERY_3D_USER_HOST "sh ./deploy_remote.sh ${filename}"

echo "\033[32mDeploy finished!\033[0m"
