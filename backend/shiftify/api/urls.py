from django.urls import path
from .views import RegisterView, UsersListView, LoginView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("users/", UsersListView.as_view()),
    path("login/", LoginView.as_view()),
]