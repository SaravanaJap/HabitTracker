from django.db import models
from accounts.models import  Account
from django.utils import timezone
# Create your models here.

class Habit(models.Model):
    user = models.ForeignKey(Account,on_delete=models.CASCADE,related_name="habits")
    habit_name = models.CharField(max_length=50)
    description = models.TextField(max_length=200)

    def __str__(self):
        return self.habit_name
    

class HabitLog(models.Model):
    user = models.ForeignKey(Account,on_delete=models.CASCADE,related_name='habit_logs')
    habit_name = models.ForeignKey(Habit,on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now)
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'habit_name', 'date')
