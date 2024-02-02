from django.db import models

# Create your models here.

class Workplace(models.Model):
    name = models.TextField()

class User(models.Model):
    userid = models.TextField()
    name = models.TextField()
    phone_number = models.IntegerField()
    email = models.EmailField()
    password = models.TextField()
    type = models.IntegerField()
    workplace = models.ForeignKey(Workplace, on_delete=models.CASCADE, many=True)

class Shifts(models.Model):
    date = models.DateTimeField()
    type = models.IntegerField()
    workplace = models.ForeignKey(Workplace, on_delete=models.CASCADE)
    assigned_user = models.ForeignKey(User, on_delete=models.CASCADE, many=True)

class ProposedShifts(models.Model):
    date = models.DateTimeField()
    type = models.IntegerField()
    workplace = models.ForeignKey(Workplace, on_delete=models.CASCADE)
    assigned_user = models.ForeignKey(User, on_delete=models.CASCADE, many=True)