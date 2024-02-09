from rest_framework import serializers
from .models import Workplace, User, Shifts, ActualShift

class UserSeriazlier(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"

class WorkplaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Workplace
        fields = "__all__"

class ShiftsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Shifts
        fields = "__all__"

class ActualShiftsSerializer(serializers.ModelSerializer):

    class Meta:
        model = ActualShift
        fields = "__all__"