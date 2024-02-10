from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .models import User, Shifts
from .serializers import UserSeriazlier, ShiftsSerializer
import logging

logger = logging.getLogger(__name__)

# Create your views here.

class RegisterView(GenericAPIView):
    """View for registering to the app"""
    queryset = User
    serializer_class = UserSeriazlier
    
    def post(self, request):
        try:
            # Gather the data from the request
            id = request.data.get("userID")
            name = request.data.get("fullName")
            phone_number = request.data.get("phoneNumber")
            email = request.data.get("email")
            password = request.data.get("password")
            user_type = request.data.get("user_type")
            
            # Check if the user already exists
            if(User.objects.filter(username=id).exists()):
                return Response(status=403)
            
            # if the user does not exists, create it
            new_user_object = User.objects.create(username=id, name=name, phone_number=phone_number, email=email, password=password, type=user_type)
            new_user_object.save()
            
            # serialize the user data and return it
            user_data = self.get_serializer(new_user_object).data
            return Response({"user": user_data}, status=201)
        except Exception as e:
            logger.exception(f"RegisterView: {e}, request:{request}")
            return Response(e, status=500)


class LoginView(GenericAPIView):
    """View for logging in to the app"""
    queryset = User
    serializer_class = UserSeriazlier
    
    def post(self, request):
        try:
            # Gather the data from the request
            id = request.data.get("userID")
            password = request.data.get("password")
            user_found = User.objects.filter(username=id, password=password).first()
            
            # Check if the user exists
            if user_found:
                # serialize the user data and return it
                user_data = self.get_serializer(user_found).data
                return Response({"user": user_data}, status=200)
            else:
                return Response(status=404)
        except Exception as e:
            logger.exception(f"LoginView: {e}, request:{request}")
            return Response(e, status=500)


class SelectShiftsView(GenericAPIView):
    """View for managing shift selection by the worker"""
    queryset = User
    serializer_class = UserSeriazlier
    
    def get(self, request):
        pass
    
    def post(self, request):
        pass

class UsersListView(GenericAPIView):
    queryset = User
    serializer_class = UserSeriazlier
    
    def get(self, request):
        try:
            data = self.get_queryset().objects.all()
            serializer = self.get_serializer(data, many=True)
            return Response({"docs":serializer.data})
        except Exception as e:
            logger.error(f"protocolTypeView: {e}")
            return Response(status=403)