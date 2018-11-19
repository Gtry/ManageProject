# from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.core import serializers
import json
#from django.views.decorators.csrf import csrf_exempt 
from backend.svn.models import SvnList
# 分页功能
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@require_http_methods(['POST'])
def getSVNPathList(request):
    response = {}
    try:
        #a = SvnList(name='b',dir_n=0,url='bbbb',number='bb',base_url='bbbbbb')
        #a.save()
        req = json.loads(request.body.decode())
        svnLists = SvnList.objects.filter(dir_n=req['dir_n']).values('name', 'dir_n', 'url', 'number', 'base_url')
        total = len(svnLists)
        svn_lists = []
        page = req['page']
        # Show 10 contacts per page
        paginator = Paginator(svnLists, 20)
        try:
            contacts = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            contacts = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            contacts = paginator.page(paginator.num_pages)

        for svnList in contacts:
            svn_lists.append(svnList)

        response['data'] = {
            'svn_lists': svn_lists,
            'total': total
        }
        response['message'] = 'Success: get svn lists success!'
        response['status'] = 200
    except Exception as e:
        response['message'] = 'Failed: {}'.format(str(e))
        response['status'] = 500

    return JsonResponse(response)

