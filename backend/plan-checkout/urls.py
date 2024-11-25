from django.urls import path
from . import views

urlpatterns=[
    path('<uuid:planId>/', views.getGroceryItems),

    path('add/', views.addGroceries ),

    path('', views.get_active_plan_with_groceries)
]