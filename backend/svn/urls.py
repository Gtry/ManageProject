from django.urls import path, include

from backend.svn import views

urlpatterns = [
	path(r'getSVNPathList', views.getSVNPathList),
]
