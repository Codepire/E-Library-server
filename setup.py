import os
import subprocess
import time

print("""

This project needs Python, Node.js, Docker installed on system, make sure you have that.
Will start setting up your project in few seconds...

""")

time.sleep(10)

print('Setting up the Project for your system...\n')

def linux_setup():
    subprocess.run(['chmod', '+x', 'linux-setup.sh'])
    subprocess.run(['./linux-setup.sh'])
    subprocess.run(['clear'])


def windows_setup():
    subprocess.run(['windows-setup.bat'])
    subprocess.run(['cls'])

if os.name == 'posix':
    linux_setup()
elif os.name == 'nt':
    windows_setup()


print("""

  ______            _      _ _                          
 |  ____|          | |    (_) |                         
 | |__     ______  | |     _| |__  _ __ __ _ _ __ _   _ 
 |  __|   |______| | |    | | '_ \| '__/ _` | '__| | | |
 | |____           | |____| | |_) | | | (_| | |  | |_| |
 |______|          |______|_|_.__/|_|  \__,_|_|   \__, |
                                                   __/ |
                                                  |___/ 

Project has been successfully setup.

To start project in watch mode => yarn run start:dev
""")

