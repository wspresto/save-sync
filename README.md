# save-sync
Manage game saves in an s3 bucket.


## Installing

You must have python3 installed.
https://www.python.org/downloads/

Make sure that python is added to your PATH variable.

Once you have python3 installed, execute the following command.
```pip3 install boto3```

More Details on:
https://github.com/boto/boto3
## Commands

    -help - shows available commands. Type command name plus --help flag for more details on the command.
    -configuration - Display stored configuration information.
    -configure - Provided information is stored in a .ini file in the directory where the script was executed.
    -download - download the save file from the s3 bucket
    -upload - upload the save file to the s3 bucket