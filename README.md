# save-sync
Manage game saves in an s3 bucket.

Application is built using electronJS.

## Publish
electron-packager ./save-sync SaveSync --platform=win32 --arch=x64 
mv SaveSync-win32-x64/resources/app.js SaveSync-win32-x64/resources/index.js

