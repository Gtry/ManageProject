# from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.core import serializers
import json
#from django.views.decorators.csrf import csrf_exempt 
# from backend.models.user import svn

@require_http_methods(['POST'])
def getSVNPathList(request):
	pass
