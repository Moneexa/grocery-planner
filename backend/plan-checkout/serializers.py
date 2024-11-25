from rest_framework import serializers
from base.models import PlanCheckout


class PlanCheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model=PlanCheckout
        fields='__all__'
