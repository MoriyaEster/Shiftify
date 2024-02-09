from django.db import models
from django.contrib.auth.models import AbstractUser

class Workplace(models.Model):
    name = models.TextField()

class User(AbstractUser):
    name = models.TextField()
    phone_number = models.IntegerField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    password = models.TextField(blank=True, null=True)
    type = models.IntegerField(blank=True, null=True)
    workplace = models.ManyToManyField(Workplace)

class Shifts(models.Model):
    date = models.DateTimeField()
    type = models.IntegerField()
    workplace = models.ForeignKey(Workplace, on_delete=models.CASCADE)
    assigned_users = models.ManyToManyField(User, related_name="shifts_assigned_users")
    proposed_users = models.ManyToManyField(User, related_name="shifts_proposed_users")

class ActualShift(models.Model):
    date = models.DateTimeField()
    type = models.IntegerField()
    workplace = models.ForeignKey(Workplace, on_delete=models.CASCADE)
    users = models.ForeignKey(User, on_delete=models.CASCADE)
    time_worked = models.IntegerField()