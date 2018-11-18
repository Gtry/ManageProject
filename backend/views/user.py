# from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.core import serializers
import json
#from django.views.decorators.csrf import csrf_exempt 
from backend.models import UserInfo

# Create your views here.
#@csrf_exempt
@require_http_methods(["POST"])
def userLogon(request):
	response = {}
	try:
		req = json.loads(request.body.decode())
		if UserInfo.objects.filter(username=req['username']):
			response['message'] = 'username already exist!'
			response['status'] = 302
		else:
			user = UserInfo(username=req['username'], password=req['password'], email=req['email'])
			user.save()
			response['message'] = 'Register Success!'
			response['status'] = 200
	except Exception as e:
		response['message'] = str(e)
		response['status'] = 500
	return JsonResponse(response)

@require_http_methods(['POST'])
def userLogin(request):
	response = {}
	try:
		req = json.loads(request.body.decode())
		username = req['username']
		password = req['password']
		user = UserInfo.objects.get(username=req['username'])
		if user.username:
			if user.password == req['password']:
				# 生成随机字符串
				request.session['username'] = req['username']
				response['token'] = request.session.session_key
				response['username'] = req['username']
				response['message'] = 'Login Success'
				response['status'] = 200
			else:
				response['message'] = 'Login Failed: password error!'
				response['status'] = 401
		else:
			response['message'] = 'Login Failed: username not exist!'
			response['status'] = 401
	except Exception as e:
		response['message'] = str(e)
		response['status'] = 500
	return JsonResponse(response)

@require_http_methods(['POST'])
def userInfo(request):
	permission_classes = (permissions.IsAuthenticated,)
	response = {}
	try:
		req = json.loads(request.body.decode())
		response['message'] = request.session.session_key
		if req['token'] == request.session.session_key:
			response['token'] = req['token']
			response['username'] = req['username']
			response['message'] = "Success: show user info!"
			response['status'] = 200
		else:
			response['message'] = 'Failed: user not login!'
			response['status'] = 401
	except Exception as e:
		response['message'] = str(e)
		response['status'] = 500
	return JsonResponse(response)

@require_http_methods(['GET'])
def userLogout(request):
	response = {}
	try:
		request.session.flush()
		response['message'] = 'Logout Success'
		response['status'] = 200
	except Exception as e:
		response['message'] = str(e)
		response['status'] = 500
	return JsonResponse(response)

@require_http_methods(['GET'])
def show_repository(request):
	response = {}
	try:
		repository = UserInfo.objects.filter()
		response['list'] = json.loads(serializers.serialize("json", repository))
		response['message'] = 'success'
		response['code'] = 200
		del request.session['username']
	except Exception as e:
		response['message'] = str(e)
		response['code'] = 500

	return JsonResponse(response)
