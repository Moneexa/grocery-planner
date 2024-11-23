from django.urls import path
from .views import get_data

urlpatterns = [
    path(
        "get-dishes-list/",  # URL structure
        get_data,
        name="get_dishes_list",
    ),
]
