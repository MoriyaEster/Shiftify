from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .models import User, Shifts, Workplace, ActualShift
from .serializers import UserSeriazlier, ShiftsSerializer, WorkplaceSerializer, ActualShiftsSerializer
import logging
from datetime import date

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
    queryset = Shifts
    serializer_class = ShiftsSerializer
    
    def get(self, request):
        try:
            id = request.query_params.get("userid")
            workplace = request.query_params.get("workplace")
            if(id and workplace):
                user_object = User.objects.get(username=id)
                workplace_object = Workplace.objects.get(name=workplace)
                data = self.get_queryset().objects.filter(workplace=workplace_object, proposed_users__in=[user_object])
                serializer = self.get_serializer(data, many=True)
                return Response({"docs":serializer.data}, status=200)
            return Response(status=404)
        except Exception as e:
            logger.error(f"SelectShiftsView: {e}")
            return Response(status=500)
        
    def post(self, request):
        try:
            for json_object in request.data.get("docs"):
                username = json_object.get("userID")
                workplace = json_object.get("workplace")
                date_string = json_object.get("date")
                shift_type = json_object.get("type")
                title = json_object.get("title")
                start = json_object.get("start")
                end = json_object.get("end")
                
                workplace_object = Workplace.objects.get(name=workplace)
                date_object = date.fromisoformat(date_string)
                user_object = User.objects.get(username=username)
                if(self.queryset.objects.filter(workplace=workplace_object, date=date_object, type=shift_type).exists()):
                    shift = self.queryset.objects.get(workplace=workplace_object, date=date_object, type=shift_type)
                    shift.proposed_users.add(user_object)
                else:
                    shift = self.queryset.objects.create(date=date_object, type=shift_type, 
                                                         workplace=workplace_object, title=title, start=start, end=end)
                    shift.proposed_users.add(user_object)
            
                shift.save()           
            return Response(status=200)
        except Exception as e:
            logger.exception(f"SelectShiftsView: {e}, request:{request}")
            return Response(e, status=500)


class ApprovedShiftsView(GenericAPIView):
    """View for viewing shifts approved for the user by the manager"""
    queryset = Shifts
    serializer_class = ShiftsSerializer
    
    def get(self, request):
        try:
            id = request.query_params.get("userid")
            workplace = request.query_params.get("workplace")
            if(id and workplace):
                user_object = User.objects.get(username=id)
                workplace_object = Workplace.objects.get(name=workplace)
                data = self.get_queryset().objects.filter(workplace=workplace_object, assigned_users__in=[user_object])
                serializer = self.get_serializer(data, many=True)
                return Response({"docs":serializer.data}, status=200)
            return Response(status=404)
        except Exception as e:
            logger.error(f"ApprovedShiftsView: {e}")
            return Response(status=500)


class ManagerShiftsView(GenericAPIView):
    """View for the manager to choose users for shifts"""
    queryset = Shifts
    serializer_class = ShiftsSerializer
    
    def get(self, request):
        try:
            id = request.query_params.get("userid")
            workplace = request.query_params.get("workplace")
            date_string = request.query_params.get("date")
            if(id and workplace):
                user_object = User.objects.get(username=id)
                workplace_object = Workplace.objects.get(name=workplace)
                data = self.get_queryset().objects.filter(workplace=workplace_object, assigned_users__isnull=False)
                serializer = self.get_serializer(data, many=True)
                return Response({"docs":serializer.data}, status=200)
            elif(date_string and workplace):
                date_object = date.fromisoformat(date_string)
                workplace_object = Workplace.objects.get(name=workplace)
                data = self.get_queryset().objects.filter(workplace=workplace_object, assigned_users__isnull=False, date=date_object)
                serializer = self.get_serializer(data, many=True)
                return Response({"docs":serializer.data}, status=200)
            return Response(status=404)
        except Exception as e:
            logger.error(f"ManagerShiftsView: {e}")
            return Response(status=500)
        
    def post(self, request):
        try:
            for json_object in request.data.get("docs"):
                employees = json_object.get("employees")
                workplace = json_object.get("workplace")
                date_string = json_object.get("date")
                shift_type = json_object.get("type")
                title = json_object.get("title")
                start = json_object.get("start")
                end = json_object.get("end")
                
                workplace_object = Workplace.objects.get(name=workplace)
                date_object = date.fromisoformat(date_string)
                user_object_list = [User.objects.get(username=username) for username in employees]
                if(self.queryset.objects.filter(workplace=workplace_object, date=date_object, type=shift_type).exists()):
                    shift = self.queryset.objects.get(workplace=workplace_object, date=date_object, type=shift_type)
                    shift.title = title
                    shift.proposed_users.remove(user_object_list)
                    shift.assigned_users = user_object_list
                else:
                    shift = self.queryset.objects.create(date=date_object, type=shift_type, 
                                                         workplace=workplace_object, title=title, start=start, end=end)
                    shift.assigned_users = user_object_list
            
                shift.save()           
            return Response(status=200)
        except Exception as e:
            logger.exception(f"ManagerShiftsView: {e}, request:{request}")
            return Response(e, status=500)


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