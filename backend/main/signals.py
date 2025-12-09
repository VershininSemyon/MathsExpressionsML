
from django.conf import settings
from django.core.cache import cache
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from .models import Sheet, MathsExpression


@receiver([post_save, post_delete], sender=Sheet)
def invalidate_sheet_cache(sender, instance, **kwargs):
    cache.delete_pattern(f"*{settings.CACHE_KEYS['SHEETS_LIST']['NAME']}*")
    cache.delete_pattern(f"*{settings.CACHE_KEYS['SHEET_DETAIL']['NAME']}*")


@receiver([post_save, post_delete], sender=MathsExpression)
def invalidate_maths_expression_cache(sender, instance, **kwargs):
    cache.delete_pattern(f"*{settings.CACHE_KEYS['SHEETS_LIST']['NAME']}*")
    cache.delete_pattern(f"*{settings.CACHE_KEYS['SHEET_DETAIL']['NAME']}*")
    
    cache.delete_pattern(f"*{settings.CACHE_KEYS['MATHS_EXPRESSIONS_LIST']['NAME']}*")
    cache.delete_pattern(f"*{settings.CACHE_KEYS['MATHS_EXPRESSION_DETAIL']['NAME']}*")
