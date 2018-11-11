from django.db import models

# Create your models here.
class User(models.Model):
	username = models.CharField(max_length=64)
	password = models.CharField(max_length=64)
	email = models.EmailField()
	# repository = models.CharField(max_length=64)
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

