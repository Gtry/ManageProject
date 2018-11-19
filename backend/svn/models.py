from django.db import models

# Create your models here.
class SvnList(models.Model):
	name	= models.CharField(max_length=50, blank=True, null=True)
	dir_n	= models.IntegerField(blank=True, null=True)
	url     = models.CharField(max_length=300, blank=True, null=True)
	number  = models.CharField(max_length=40, blank=True, null=True)
	base_url= models.CharField(max_length=300, blank=True, null=True)

	class Meta:
		managed = True
		db_table = 'svn_list'
		app_label = 'svn'
