
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from ..domain.models import MathsExpression, Sheet


class SheetSerializer(serializers.ModelSerializer):
    maths_expressions_count = serializers.SerializerMethodField()
    creator = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Sheet
        fields = '__all__'
        read_only_fields = ('id', 'creator', 'created_at', 'updated_at')

    def get_maths_expressions_count(self, obj):
        return obj.maths_expressions.count()


class MathsExpressionSerializer(serializers.ModelSerializer):
    sheet = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = MathsExpression
        fields = '__all__'
        read_only_fields = ('id', 'sheet')


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        data['user_id'] = self.user.id
        data['username'] = self.user.username
        data['email'] = self.user.email
        
        return data
