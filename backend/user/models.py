from django.db import models
from datetime import date

# Create your models here.
class UserInfo(models.Model):
	username = models.CharField(max_length=64, unique=True)
	password = models.CharField(max_length=64)
	email = models.EmailField()
	phone = models.CharField(max_length=64)
	last_login = models.DateField(default=date.today)
	date_joined = models.DateField(default=date.today)
	# sex = 
	# age = 
	# others = 
	"""docstring for User"""
	#def __init__(self, arg):
	#	super(User, self).__init__()
	#	self.arg = arg

	# python2: def __unicode__
	def __str__(self):
		return self.username
