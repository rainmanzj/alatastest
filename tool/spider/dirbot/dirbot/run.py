
from scrapy import cmdline
import threading
import time


	
import os, sched 

schedule = sched.scheduler(time.time, time.sleep) 

def perform_command(cmd, inc): 
    os.system(cmd)
    print("show time after 30 seconds:")
    name = 'dmoz'
    cmd = 'scrapy crawl {0}'.format(name)
    timming_exe(cmd, 30)

def timming_exe(cmd, inc = 60): 
    schedule.enter(inc, 0, perform_command, (cmd, inc)) 
    schedule.run() 


print("show time after 30 seconds:") 
name = 'dmoz'
cmd = 'scrapy crawl {0}'.format(name)
timming_exe(cmd, 30)