from rest_framework import serializers
from base.models import GroceryPlan


class GroceriesSerializer(serializers.ModelSerializer):
    class Meta:
        model=GroceryPlan
        fields='__all__'
