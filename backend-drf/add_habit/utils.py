from datetime import date,timedelta
from .models import HabitLog


def calculate_streak(habit):

    today = date.today()
    streak = 0

    logs = HabitLog.objects.filter(habit_name = habit).order_by('-date')
    log_date  =  [log.date for log in logs]

    for i in range(len(log_date)):
        expected_date = today - timedelta(days=i)
        if expected_date in log_date:
            streak+=1
        else:
            break

    return streak