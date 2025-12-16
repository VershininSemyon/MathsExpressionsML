
from django.shortcuts import get_object_or_404
from rest_framework import permissions

from ..domain.models import Sheet


class IsSheetAuthorOrReadOnly(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        flag = True

        if hasattr(view, 'kwargs') and 'sheet_id' in view.kwargs:
            sheet_id = view.kwargs['sheet_id']
            sheet = get_object_or_404(Sheet, id=sheet_id)
            flag = self.has_object_permission(request, view, sheet)

        return super().has_permission(request, view) and flag

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        if hasattr(obj, 'sheet'):
            return obj.sheet.creator == request.user
        elif hasattr(obj, 'creator'):
            return obj.creator == request.user
        
        return False
