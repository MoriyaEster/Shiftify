from rest_framework import serializers
from .models import Workplace, User, Shifts, ActualShift

class UserSeriazlier(serializers.ModelSerializer):
    workplace = serializers.StringRelatedField(many=True)
    class Meta:
        model = User
        fields = "__all__"

class WorkplaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Workplace
        fields = "__all__"

class ShiftsSerializer(serializers.ModelSerializer):
    proposed_users = serializers.StringRelatedField(many=True)
    assigned_users = serializers.StringRelatedField(many=True)
    workplace = serializers.StringRelatedField()
    class Meta:
        model = Shifts
        fields = "__all__"

class ActualShiftsSerializer(serializers.ModelSerializer):
    workplace = serializers.StringRelatedField()
    user = serializers.StringRelatedField()
    class Meta:
        model = ActualShift
        fields = "__all__"