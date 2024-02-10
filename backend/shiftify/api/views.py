from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .models import User, Shifts, Workplace, ActualShift
from .serializers import UserSeriazlier, ShiftsSerializer, WorkplaceSerializer, ActualShiftsSerializer
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
            user_found = User.objects.get(username=id, password=password)
            
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
            id = request.query_params.get("userid")
            if(id):
                data = self.get_queryset().objects.filter(username=id)
            else:
                data = self.get_queryset().objects.all()
            serializer = self.get_serializer(data, many=True)
            return Response({"users":serializer.data})
        except Exception as e:
            logger.error(f"UsersListView: {e}")
            return Response(status=500)

    def post(self, request):
        try:
            # Gather the data from the request
            id = request.data.get("userID")
            name = request.data.get("fullName")
            phone_number = request.data.get("phoneNumber")
            email = request.data.get("email")
            password = request.data.get("password")
            user_type = request.data.get("user_type")
            
            # Check if the user exists
            if(User.objects.filter(username=id).exists()):
                user = User.objects.get(username=id)
                if(name):
                    user.name = name
                if(phone_number):
                    user.phone_number = phone_number
                if(email):
                    user.email = email
                if(password):
                    user.password = password
                if(user_type):
                    user.type = user_type
                user.save()
                return Response(status=200)
            else:
                return Response(status=404)
        except Exception as e:
            logger.exception(f"UsersListView: {e}, request:{request}")
            return Response(e, status=500)


class WorkHoursView(GenericAPIView):
    """View for managing the actual shifts done"""
    queryset = ActualShift
    serializer_class = ActualShiftsSerializer
        
    def get(self, request):
        try:
            id = request.query_params.get("userid")
            workplace = request.query_params.get("work_place")
            month = request.query_params.get("month")
            year = request.query_params.get("year")
            
            if(id and workplace and month and year):
                user = User.objects.get(username=id)
                workplace = Workplace.objects.get(name=workplace)
                data = self.get_queryset().objects.filter(user=user, workplace=workplace,date__year=year, date__month=month)
            else:
                data = self.get_queryset().objects.all()
            serializer = self.get_serializer(data, many=True)
            return Response({"users":serializer.data})
        except Exception as e:
            logger.error(f"WorkHoursView: {e}")
            return Response(status=500)
    
    def post(self, request):
        pass


class WorkersView(GenericAPIView):
    queryset = User
    serializer_class = UserSeriazlier
    
    def get(self, request):
        try:
            workplace = request.query_params.get("work_place")
            if(workplace):
                workplace = Workplace.objects.get(name=workplace)
                data = self.get_queryset().objects.filter(workplace=workplace)
                serializer = self.get_serializer(data, many=True)
                return Response({"users":serializer.data}, status=200)
            else:
                return Response(status=404)
        except Exception as e:
            logger.error(f"WorkersView: {e}")
            return Response(status=500)
    
    def post(self, request):
        try:
            id = request.query_params.get("userid")
            workplace = request.query_params.get("work_place")
            
            if(id and workplace):
                user = User.objects.get(username=id)
                workplace = Workplace.objects.get(name=workplace)
                user.workplace.add(workplace)
                return Response(status=200)
            else:
                return Response(status=404)
        except Exception as e:
            logger.error(f"WorkersView: {e}")
            return Response(status=500)

    def delete(self, request):
        try:
            id = request.query_params.get("userid")
            workplace = request.query_params.get("work_place")
            
            if(id and workplace):
                user = User.objects.get(username=id)
                workplace = Workplace.objects.get(name=workplace)
                user.workplace.remove(workplace)
                return Response(status=200)
            else:
                return Response(status=404)
        except Exception as e:
            logger.error(f"WorkersView: {e}")
            return Response(status=500)