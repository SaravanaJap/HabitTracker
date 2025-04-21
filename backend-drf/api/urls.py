from django.contrib import admin
from django.urls import path,include
import accounts.views as Userviews
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
import add_habit.views as Habitviews


urlpatterns = [
    path('register/',Userviews.RegisterView.as_view()),
    path('habits/',Habitviews.HabitView.as_view()),
    path('habitdata/',Habitviews.HabitsData.as_view()),
    path('habits/<int:pk>/', Habitviews.HabitView.as_view()),
    path('token/',TokenObtainPairView.as_view(),name = 'token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(),name = 'token_refresh'),
    path('protected_view/',Userviews.ProtectedView.as_view()),
    path('habitlog/<int:pk>/',Habitviews.HabitlogView.as_view()),
    path('habitlog/',Habitviews.HabitlogView.as_view()),
    path('get_quote/',Habitviews.GetQuote.as_view()),
    path('streak/<int:habit_id>/', Habitviews.HabitStreakView.as_view(), name='habit-streak'),
    path('streaks/', Habitviews.AllHabitStreaksView.as_view(), name='all-habit-streaks'),
    path('habit/<int:habit_id>/heatmap/', Habitviews.HabitHeatmapView.as_view(), name='habit-heatmap'),

]