#!/usr/bin/env python3
#
# #
# A Shell Program that syncs game save files in an s3 bucket.
import cmd
import signal
import os
import shutil
import time
import datetime
import shlex
import argparse
import configparser

CONFIG_FOLDER = '.sync'
CONFIG_FILE = 'config.ini'

class SaveSync(cmd.Cmd):
    ''' Save Sync '''

    def __init__(self):
        cmd.Cmd.__init__(self)       
        self.ac = None

    def emptyline(self):
            pass

    def getConfigPath(self):
        return os.path.join('.', CONFIG_FOLDER, CONFIG_FILE)

    def do_configuration(self, args):
        ''' Show the configuration. '''
        configReader = configparser.ConfigParser()
        configReader.read(self.getConfigPath())
        for key in configReader['CONFIG']:
            print('%s=%s' %(key, configReader['CONFIG'][key]))
        
    def do_configure(self, args):
        ''' Store configuration information in a local folder '''
        parser = argparse.ArgumentParser(description='Configure the script. Responses will be stored in the directory that this script was execeuted in. \n e.g. configure --key 123 --secret 123 --token 123 --url http://google.com --save \'%appdata%\\SpaceEngineers\\Saves\\76561197979926525\\Hot Peanut Butter\'')
        parser.add_argument('--key',nargs='?',const='',type=str, help='The access key for the s3 bucket in aws.')
        parser.add_argument('--secret',nargs='?',const='',type=str, help='The secret key for the s3 bucket in aws.')
        parser.add_argument('--token',nargs='?',const='',type=str, help='The session token for the s3 bucket in aws.')
        parser.add_argument('--url',nargs='?',const='',type=str, help='The url the s3 bucket in aws.')
        parser.add_argument('--save',nargs='?',const='',type=str, help='The file path location of the folder where the space engineers saves will be synced.')
        

        try:
            args = parser.parse_args(shlex.split(args))

            if not args.key:
                print('You must provide an access key.')
                return
            elif not args.secret:
                print('You must provide a secret')
                return
            elif not args.token:
                print('You must provide a token.')
                return
            elif not args.url:
                print('You must provide the url for the s3 bucket which save files are stored.')
                return

            configWriter = configparser.ConfigParser()
            configWriter['CONFIG'] = {}
            configWriter['CONFIG']['accessKey'] = args.key
            configWriter['CONFIG']['secretKey'] = args.secret
            configWriter['CONFIG']['sessionToken'] = args.token
            configWriter['CONFIG']['saveLocation'] = args.save
            with open(self.getConfigPath(), 'w') as configfile:
                configWriter.write(configfile)


  
        except SystemExit:
            print('Invalid paramaters')

    
    def do_upload(self, args):
        ''' Share the Save file to the s3 bucket. The name of the file will be the current timestamp. '''
        #TODO: read the credentials, prompt the user if this is the correct save file, connect to s3 bucket, send the file
        
    def do_download(self, args):
        ''' Get the latest save file'''
    
    def do_exit(self, arg=None):
        ''' shut down the main thread including all daemon threads that have been spawned.'''
        os.sys.exit(0)

def init():
    os.makedirs(CONFIG_FOLDER, exist_ok=True)
    shell = SaveSync()        
    signal.signal(signal.SIGINT, lambda _signo, _stack: shell.do_exit())
    shell.prompt = '%> '
    shell.intro = '-== Save Sync v1.0.0 ==-'
    shell.cmdloop()     



if __name__ == '__main__':
    init()
