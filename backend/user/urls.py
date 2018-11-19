from django.urls import path, include

from backend.user import views

urlpatterns = [
	path(r'userLogon', views.userLogon),
	path(r'userLogin', views.userLogin),
	path(r'userInfo', views.userInfo),
]