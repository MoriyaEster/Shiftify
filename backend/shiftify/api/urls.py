from django.urls import path
from .views import RegisterView, UsersListView, LoginView, WorkHoursView, WorkersView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("users/", UsersListView.as_view()),
    path("work-hours/", WorkHoursView.as_view()),
    path("workers-mangement/", WorkersView.as_view()),
]