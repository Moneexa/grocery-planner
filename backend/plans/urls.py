from django.urls import path
from . import views

urlpatterns=[
    path('', views.getData),
    path('<int:plan_id>/', views.get_specific_plan),

    path('add/', views.postData )
]