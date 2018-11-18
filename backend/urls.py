from django.urls import path, include

from backend.views import user
from backend.views import svn

urlpatterns = [
	path(r'userLogon', user.userLogon),
	path(r'userLogin', user.userLogin),
	path(r'userInfo', user.userInfo),

	path(r'getSVNPathList', svn.getSVNPathList),
]
