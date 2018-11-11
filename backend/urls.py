from django.urls import path, include

from backend import views

urlpatterns = [
	path(r'add_user', views.add_user),
	path(r'show_repository', views.show_repository),
]
