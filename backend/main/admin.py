
from django.contrib import admin
from .models import Sheet, MathsExpression


@admin.register(Sheet)
class SheetAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    search_fields = ('title', )
    list_filter = ('creator', )


@admin.register(MathsExpression)
class MathsExpressionAdmin(admin.ModelAdmin):
    list_display = ('expression_text', 'calculation_result')
    search_fields = ('expression_text', 'calculation_result')
    list_filter = ('sheet', )
