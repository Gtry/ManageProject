# from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.core import serializers
import json
#from django.views.decorators.csrf import csrf_exempt 
from backend.svn.models import SvnList

@require_http_methods(['POST'])
def getSVNPathList(request):
	response = {}
	try:
		dir_n = 0
		start_number = 0
		end_number = 0
		svn_lists = []
		svnLists = SvnList.object.filter(dir_n=dir_n)[start_number:end_number].value('name', 'dir_n', 'url', 'number', 'base_url')
		for svnList in svnLists:
			svn_lists.append(svnList)
			response['svn_lists'] = svn_lists
		response['message'] = 'Success: get svn lists success!'
		response['status'] = 200
	except Exception as e:
		response['message'] = 'Failed: {}'.format(str(e))
		response['status'] = 500
	return JsonResponse(response)
