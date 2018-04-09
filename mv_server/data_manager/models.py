from django.db import models
from django.contrib.auth.models import User

class SAVE_FILE(models.Model):
    user = models.ForeignKey(User, unique=True, blank = True, null=True, on_delete=models.CASCADE)
    save_file_id = models.IntegerField()
    save_file = models.TextField()
