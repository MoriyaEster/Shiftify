from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Workplace, Shifts, ActualShift

# Register your models here.
admin.site.register(User, UserAdmin)

admin.site.register(Workplace)

admin.site.register(Shifts)

admin.site.register(ActualShift)