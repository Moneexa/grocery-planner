from rest_framework import serializers
from base.models import Plan,Recipe


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model=Plan
        fields='__all__'
