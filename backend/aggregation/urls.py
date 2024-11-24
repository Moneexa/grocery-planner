from django.urls import path
from .views import get_plan_data_distribution

urlpatterns = [
    path(
        '', get_plan_data_distribution
    ),
]
