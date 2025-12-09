
from rest_framework.throttling import AnonRateThrottle


class SheetRateThrottle(AnonRateThrottle):
    scope = 'sheets'


class MathsExpressionRateThrottle(AnonRateThrottle):
    scope = 'maths_expressions'
