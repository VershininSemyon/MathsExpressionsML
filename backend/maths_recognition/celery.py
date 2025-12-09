
import os
from celery import Celery


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'maths_recognition.settings')

app = Celery('maths_recognition')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
