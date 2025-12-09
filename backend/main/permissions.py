
from rest_framework import permissions
from .models import Sheet
from django.shortcuts import get_object_or_404


class IsSheetAuthorOrReadOnly(permissions.IsAuthenticatedOrReadOnly):
    def has_permission(self, request, view):
        flag = True

        if hasattr(view, 'kwargs') and 'sheet_id' in view.kwargs:
            sheet_id = view.kwargs['sheet_id']
            sheet = get_object_or_404(Sheet, id=sheet_id)
            flag = self.has(request, sheet)

        return super().has_permission(request, view) and flag

    def has(self, request, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        print(request.user)
        return obj.creator == request.user
