# from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.core import serializers
import json
from django.views.decorators.csrf import csrf_exempt 
from backend.models import User

# Create your views here.
@csrf_exempt
@require_http_methods(["POST"])
def add_user(request):
	response = {}
	try:
		user = User(username="yang")
		user.save()
		response['msg'] = 'success'
		response['error_num'] = 0
	except Exception as e:
		response['msg'] = str(e)
		response['error_num'] = 1

	return JsonResponse(response)

@require_http_methods(['GET'])
def show_repository(request):
	response = {}
	try:
		repository = User.objects.filter()
		response['list'] = json.loads(serializers.serialize("json", repository))
		response['msg'] = 'success'
		response['error_num'] = 0
	except Exception as e:
		response['msg'] = str(e)
		response['error_num'] = 0

	return JsonResponse(response)
