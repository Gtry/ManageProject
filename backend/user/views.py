# from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.core import serializers
import json
#from django.views.decorators.csrf import csrf_exempt 
from backend.user.models import UserInfo
from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore

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

def userLogin(request):
	response = {}
	try:
		username = request.GET.get('username', '')
		password = request.GET.get('password', '')
		user = UserInfo.objects.get(username=username)
		if user.password == password:
			# 生成随机字符串
			if request.session.get('username'):
				del request.session["username"] 
			request.session['username'] = username
			request.session.set_expiry(60)
			response['token'] = request.session.session_key
			response['username'] = username
			response['message'] = 'Login Success'
			response['status'] = 200
		else:
			response['message'] = 'Login Failed: username and password not match!'
			response['status'] = 401
	except Exception as e:
		response['message'] = str(e)
		response['status'] = 500
	finally:
		pass
		#response["Access-Control-Allow-Credentials"] = "true"
		#response["Access-Control-Allow-Origin"] = "http://192.168.10.101:8080"
		#response["Access-Control-Allow-Methods"] = "GET,POST"
		#response["Access-Control-Allow-Headers"] = "Origin,Content-Type,Cookie,Accept,Token"
	return JsonResponse(response)

def userInfo(request):
	#permission_classes = (permissions.IsAuthenticated,)
	response = {}
	try:
		token = request.GET.get('token', '')
		username = request.GET.get('username', '')
		if token == request.session.session_key:
			response['token'] = token
			response['username'] = username
			response['message'] = "Success: show user info!"
			response['status'] = 200
		else:
			response['message'] = 'Failed: user not login!'
			response['status'] = 401
	except Exception as e:
		response['message'] = str(e)
		response['status'] = 500

	response['message'] = str(request.user.is_authenticated)
	return JsonResponse(response)

def userLogout(request):
	response = {}
	try:
		# request.session.flush()
		del request.session['username']
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
