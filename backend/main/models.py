
from django.db import models
from django.contrib.auth.models import User


class Sheet(models.Model):
    title = models.CharField(max_length=300)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    creator = models.ForeignKey(
        to=User, 
        related_name='sheets',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.title}"


class MathsExpression(models.Model):
    expression_text = models.TextField(max_length=10000)
    calculation_result = models.FloatField()

    sheet = models.ForeignKey(
        to=Sheet,
        related_name='maths_expressions',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.expression_text} = {self.calculation_result}"
