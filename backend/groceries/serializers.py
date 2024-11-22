from rest_framework import serializers
from base.models import GroceryPlan


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=GroceryPlan
        fields='__all__'
