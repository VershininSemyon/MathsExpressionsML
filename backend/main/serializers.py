
from rest_framework import serializers
from .models import Sheet, MathsExpression
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class SheetSerializer(serializers.ModelSerializer):
    maths_expressions_count = serializers.SerializerMethodField()

    class Meta:
        model = Sheet
        fields = '__all__'
        read_only_fields = ('id', )

    def get_maths_expressions_count(self, obj):
        return obj.maths_expressions.count()


class MathsExpressionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MathsExpression
        fields = '__all__'
        read_only_fields = ('id', )


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        data['user_id'] = self.user.id
        data['username'] = self.user.username
        data['email'] = self.user.email
        
        return data
