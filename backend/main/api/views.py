
import base64
import io

from celery.result import AsyncResult
from django.conf import settings
from django.core.cache import cache
from django.core.files.base import ContentFile
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from PIL import Image
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView

from ..domain.models import MathsExpression, Sheet
from ..infrastructure.caching import cache_api_view
from ..infrastructure.tasks import recognize_math_expression
from ..logic.permissions import IsSheetAuthorOrReadOnly
from .serializers import (CustomTokenObtainPairSerializer,
                          MathsExpressionSerializer, SheetSerializer)


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

    def get_queryset(self):
        return super().get_queryset().filter(creator=self.request.user)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
        return super().perform_create(serializer)

    # @cache_api_view(
    #     timeout=settings.CACHE_KEYS['SHEETS_LIST']['TIMEOUT'], 
    #     key_prefix=settings.CACHE_KEYS['SHEETS_LIST']['NAME']
    # )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    # @cache_api_view(
    #     timeout=settings.CACHE_KEYS['SHEET_DETAIL']['TIMEOUT'], 
    #     key_prefix=settings.CACHE_KEYS['SHEET_DETAIL']['NAME']
    # )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs) 
    
    @action(detail=True, methods=['POST'])
    def recognize(self, request, pk=None):
        """
        Отправить изображение для распознавания математического выражения
        """
        if 'image' not in request.FILES:
            return Response({'error': 'No image provided'}, status=400)
        
        # Сохраняем изображение временно
        image_file = request.FILES['image']
        
        # Запускаем Celery задачу
        task = recognize_math_expression.delay(image_file.read())
        
        return Response({
            'task_id': task.id,
            'status': 'PROCESSING',
            'message': 'Recognition started'
        })


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
    
    def perform_create(self, serializer):
        sheet_id = self.kwargs.get('sheet_id')
        if sheet_id:
            sheet = Sheet.objects.get(id=sheet_id)
            serializer.save(sheet=sheet)

        return super().perform_create(serializer)
    
    # @cache_api_view(
    #     timeout=settings.CACHE_KEYS['MATHS_EXPRESSIONS_LIST']['TIMEOUT'], 
    #     key_prefix=settings.CACHE_KEYS['MATHS_EXPRESSIONS_LIST']['NAME']
    # )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    

    # @cache_api_view(
    #     timeout=settings.CACHE_KEYS['MATHS_EXPRESSION_DETAIL']['TIMEOUT'], 
    #     key_prefix=settings.CACHE_KEYS['MATHS_EXPRESSION_DETAIL']['NAME']
    # )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
