### Django Sqlite DB.

from django.db import models
import datetime

class Weveos(models.Model):
    name = models.CharField(max_length=200)
    bhour =  models.IntegerField(default = 0)
    ehour =  models.IntegerField(default = 0)
    pub_date = models.DateTimeField('date published')
    group = models.ForeignKey(Group)

class Eventos(models.Model):
	name = models.CharField(max_length=200)
	location = models.CharField(max_length= 200)
    bhour =  models.IntegerField(default = 0)
    ehour =  models.IntegerField(default = 0)
    pub_date = models.DateTimeField('date published')


class User(models.Model):
	name = models.CharField(max_length = 200)

class IsInGroup(models.Model):
	group = models.ForeignKey(Group, on_delete=models.CASCADE)
	user = models.ForeignKey(User, on_delete=models.CASCADE)

class Group(models.Model):
	size = models.IntegerField(default = 0)

