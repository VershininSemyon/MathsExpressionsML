
from django.conf import settings
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import MathsExpression, Sheet
from .permissions import IsSheetAuthorOrReadOnly
from .serializers import (CustomTokenObtainPairSerializer,
                          MathsExpressionSerializer, SheetSerializer)
from .caching import cache_api_view


schema_view = get_schema_view(
    openapi.Info(
        title="Maths Recognition Service API",
        default_version='v1',
        description="Maths Recognition Service API",
    ),
    public=True,
    permission_classes=[AllowAny,]
)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class SheetViewSet(ModelViewSet):
    queryset = Sheet.objects.all()
    serializer_class = SheetSerializer

    permission_classes = [IsSheetAuthorOrReadOnly]
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    throttle_scope = 'sheets'

    @cache_api_view(
        timeout=settings.CACHE_KEYS['SHEETS_LIST']['TIMEOUT'], 
        key_prefix=settings.CACHE_KEYS['SHEETS_LIST']['NAME']
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    

    @cache_api_view(
        timeout=settings.CACHE_KEYS['SHEET_DETAIL']['TIMEOUT'], 
        key_prefix=settings.CACHE_KEYS['SHEET_DETAIL']['NAME']
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)


class MathsExpressionViewSet(ModelViewSet):
    queryset = MathsExpression.objects.all()
    serializer_class = MathsExpressionSerializer

    permission_classes = [IsSheetAuthorOrReadOnly]
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    throttle_scope = 'maths_expressions'

    def get_queryset(self):
        queryset = super().get_queryset()
        sheet_pk = self.kwargs.get('sheet_id')

        if sheet_pk:
            queryset = queryset.filter(sheet_id=sheet_pk)

        return queryset
    

    @cache_api_view(
        timeout=settings.CACHE_KEYS['MATHS_EXPRESSIONS_LIST']['TIMEOUT'], 
        key_prefix=settings.CACHE_KEYS['MATHS_EXPRESSIONS_LIST']['NAME']
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    

    @cache_api_view(
        timeout=settings.CACHE_KEYS['MATHS_EXPRESSION_DETAIL']['TIMEOUT'], 
        key_prefix=settings.CACHE_KEYS['MATHS_EXPRESSION_DETAIL']['NAME']
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
