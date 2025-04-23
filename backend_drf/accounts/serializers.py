from .models import Account
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, min_length = 4,style = {'input_type':'password'})

    class Meta:
        model = Account
        fields = ['username','email','full_name','password']

    def create(self, validated_data):
        #User.objects.create_user  this create_user automatically hash the password other store as plain text

        user = Account.objects.create_user(
            validated_data['username'],
            validated_data['full_name'],
            validated_data['email'],
            validated_data['password'],
        )
        return user