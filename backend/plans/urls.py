from django.urls import path
from . import views

urlpatterns=[
    path('', views.getData),
    path('<uuid:plan_id>/', views.get_plan_recipes),

    path('add/', views.postData ),
    path('today/', views.get_today_plan)
]