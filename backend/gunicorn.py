
import os
from multiprocessing import cpu_count

from dotenv import load_dotenv
load_dotenv()


bind = '0.0.0.0:' + os.getenv('PORT', '8000')
max_requests = 2500
worker_class = 'gevent'
workers = cpu_count()

env = {
    'DJANGO_SETTINGS_MODULE': 'backend.maths_recognition.settings'
}

reload = True
name = 'maths_recognition'
