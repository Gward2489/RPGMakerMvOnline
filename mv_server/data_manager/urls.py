from django.urls import path

from . import views

app_name = 'data_manager'
urlpatterns = [
    path('save/', views.save, name='save'),
    path('load/', views.load, name='load'),
    path('login/', views.login, name='login'),
    
]