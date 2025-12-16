
from django.apps import AppConfig


class MainConfig(AppConfig):
    name = 'main'

    def ready(self):
        from .infrastructure import signals

        return super().ready()
