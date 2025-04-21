

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Habit,HabitLog
from .serializers import HabitSerializer,HabitLogSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from datetime import datetime,timedelta
from datetime import date
import requests
from .utils import calculate_streak

class HabitView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if pk:
            habit = get_object_or_404(Habit, pk=pk, user=request.user)
            completed_days = HabitLog.objects.filter(habit_name=habit, completed=True).count()
            skipped_days = HabitLog.objects.filter(habit_name=habit, completed=False).count()

            serializer = HabitSerializer(habit, context={'request': request})
            return Response({
                "habit": serializer.data,
                "completed_days": completed_days,
                "skipped_days": skipped_days
            })

        else:
            habits = Habit.objects.filter(user=request.user)
            
            completed_days = HabitLog.objects.filter(habit_name__in=habits, completed=True).count()
            skipped_days = HabitLog.objects.filter(habit_name__in=habits, completed=False).count()



            serializer = HabitSerializer(habits, many=True, context={'request': request})
            return Response({
                "habit": serializer.data,
                "completed_days": completed_days,
                "skipped_days": skipped_days
            })
    


    def post(self, request):
        serializer = HabitSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        habit = get_object_or_404(Habit, pk=pk, user=request.user)
        habit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class HabitsData(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        habits = Habit.objects.filter(user=request.user)

        # Build response data for each habit
        habits_data = []
        for habit in habits:
            completed_days = HabitLog.objects.filter(habit_name=habit, completed=True).count()
            skipped_days = HabitLog.objects.filter(habit_name=habit, completed=False).count()

            habits_data.append({
                "id": habit.id,
                "habit_name": habit.habit_name,
                "description": habit.description,
                "completed_days": completed_days,
                "skipped_days": skipped_days,
            })

        return Response({"habits": habits_data})




        
class HabitlogView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if pk:
            habitlog = get_object_or_404(HabitLog, pk=pk, user=request.user,date=date.today()+timedelta(days=0))
            print(date.today())
            serializer = HabitLogSerializer(habitlog, context={'request': request})
            return Response(serializer.data)
        else:
            habitlog = HabitLog.objects.filter(user=request.user,date=date.today()+timedelta(days=0))
            serializer = HabitLogSerializer(habitlog, many=True, context={'request': request})
            return Response(serializer.data)

    def post(self, request, pk):
        user = request.user
        print(user.username)
        print(pk)
        print(date.today())

        data = request.data.copy()
        data['user'] = user.id
        data['habit_name'] = int(pk)

        data['date'] = date.today() + timedelta(days=0)
        print(date.today())

        serializer = HabitLogSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class GetQuote(APIView):

     def get(self, request):
        try:
            # Fetch quote from external API
            res = requests.get("https://zenquotes.io/api/random?tag=motivation")
            res.raise_for_status()  # Will raise an HTTPError if the HTTP request returned an unsuccessful status code

            # Check if the response has the expected structure
            if res.status_code == 200 and isinstance(res.json(), list) and 'q' in res.json()[0]:
                quote = res.json()[0]['q']
                return Response({"quote": quote}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Quote not found in the response."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        except requests.exceptions.RequestException as e:
            # Handle any request-related errors (like network issues)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


class HabitStreakView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self,request,habit_id):
        print("Requested habit ID:", habit_id)
        print("User:", request.user)
        try:
            habit = Habit.objects.get(pk = habit_id,user = request.user)
        except Habit.DoesNotExist:
            return Response({"error": "Habit not found."}, status=404)
        

        streak = calculate_streak(habit)
        return Response({
            'habit_id':habit_id,
            'habit_name': habit.habit_name,
            'streak':streak
        })
    

class HabitHeatmapView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, habit_id):
        try:
            habit = Habit.objects.get(pk=habit_id, user=request.user)
        except Habit.DoesNotExist:
            return Response({"error": "Habit not found."}, status=404)
        habit_logs = HabitLog.objects.filter(habit_name=habit)
        completed_dates = [log.date.isoformat() for log in habit_logs]

        print("habitid",habit.id)
        print("datescompleted",completed_dates)

        return Response({
            "habit_id": habit.id,
            "habit_name": habit.habit_name,
            "completed_dates": completed_dates
        })
    

class AllHabitStreaksView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        habits = Habit.objects.filter(user=request.user)
        result = []
        for habit in habits:
            streak = calculate_streak(habit)
            result.append({
                'habit_id': habit.id,
                'habit_name': habit.habit_name,
                'streak': streak
            })
        return Response(result)
    










