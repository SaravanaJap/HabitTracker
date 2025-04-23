from .models import Habit,HabitLog
from rest_framework import serializers

class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ['id','habit_name','description']

    def create(self, validated_data):
        user = self.context['request'].user
        return Habit.objects.create(user=user, habit_name = validated_data['habit_name'], description=validated_data.get('description', ''))

class HabitLogSerializer(serializers.ModelSerializer):

    
    class Meta:
        model = HabitLog
        fields = '__all__'
