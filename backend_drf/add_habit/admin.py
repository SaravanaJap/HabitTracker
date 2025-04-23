from django.contrib import admin
from .models import Habit
from .models import HabitLog
# Register your models here.

class HabitLogAdmin(admin.ModelAdmin):
   list_display = ('user','habit_name','date','completed')


class HabitAdmin(admin.ModelAdmin):
   list_display = ('user','habit_name','description')


admin.site.register(Habit,HabitAdmin)
admin.site.register(HabitLog,HabitLogAdmin)
