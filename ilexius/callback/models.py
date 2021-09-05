from django.db import models

class EntryTable(models.Model):
    uname = models.CharField(max_length=50)
    uphone = models.CharField(max_length=20)
    ucompany = models.CharField(max_length=50)
    uemail = models.CharField(max_length=200)
    usubject = models.CharField(max_length=100)
    umessage = models.TextField()
    udatetime = models.CharField(max_length=20)
    status = models.IntegerField(default=0)
    comments = models.TextField(default='', blank=True, null=True)
    datecreated = models.DateTimeField(auto_now_add=True)
    datemodified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '%s %s' %(self.uname, self.uemail)