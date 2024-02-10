from django.db import models
from django.contrib.auth.models import AbstractUser

class Workplace(models.Model):
    name = models.TextField()
    
    def __str__(self):
        return str(self.name)

class User(AbstractUser):
    username = models.TextField(unique=True,blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    phone_number = models.IntegerField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    password = models.TextField(blank=True, null=True)
    type = models.IntegerField(blank=True, null=True)
    workplace = models.ManyToManyField(Workplace, blank=True)

class Shifts(models.Model):
    date = models.DateField()
    type = models.TextField(blank=True, null=True)
    workplace = models.ForeignKey(Workplace, on_delete=models.CASCADE)
    assigned_users = models.ManyToManyField(User, related_name="shifts_assigned_users")
    proposed_users = models.ManyToManyField(User, related_name="shifts_proposed_users")
    title = models.TextField(blank=True, null=True)
    start = models.TextField(blank=True, null=True)
    end = models.TextField(blank=True, null=True)

class ActualShift(models.Model):
    date = models.DateField()
    workplace = models.ForeignKey(Workplace, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    time_worked = models.IntegerField()