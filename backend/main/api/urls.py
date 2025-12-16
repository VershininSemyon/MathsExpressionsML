

from django.urls import include, path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from .views import (CustomTokenObtainPairView, MathsExpressionViewSet,
                    SheetViewSet, schema_view)


urlpatterns = [
    path('docs/swagger/', schema_view.with_ui('swagger', cache_timeout=0)),
    path('docs/redoc/', schema_view.with_ui('redoc', cache_timeout=0)),

    path('auth/', include('djoser.urls')),
    path('auth/token/', CustomTokenObtainPairView.as_view()),
    path('auth/token/refresh/', TokenRefreshView.as_view()),
    path('auth/token/verify/', TokenVerifyView.as_view()),
    
    path('sheets/', SheetViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('sheets/<int:pk>/', SheetViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('sheets/<int:pk>/recognize/', SheetViewSet.as_view({'post': 'recognize'})),

    path('sheets/<int:sheet_id>/maths_expressions/', MathsExpressionViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('sheets/<int:sheet_id>/maths_expressions/<int:pk>/', MathsExpressionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})),
]
