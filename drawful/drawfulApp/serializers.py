from rest_framework import serializers
from drawfulApp import models

########## Example Serialiser ##########
#class TodoSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = models.Todo
#        fields = ('id', 'title', 'description', 'completed')

class PromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Prompt_List
        fields = ('id', 'prompt', 'promptGenre', 'alreadyUsed', 'previousWinner')

class User_MemoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User_Memories
        fields = ('id','username', 'date', 'timeCompleted', 'difficulty', 'avgRating', 'timeTaken', 'prompt', 'drawing')

class User_AccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User_Accounts
        fields = ('id','username','password','first_name','last_name','email','bio','profilePicture','favouriteDraw','badgesEarned','averageRating','currentStreak','maxStreak','totalStars','friends','friendRequests','last_login','is_superuser')

    def create(self, validated_data):
        #user = models.User_Accounts.objects.create(**validated_data)
        #user.password = ArgonHash.hashPassword(validated_data['password'])
        #user.save()
        #return user
        password = validated_data.pop('password', None)
        #instance = self.Meta.model(**validated_data)
        instance = models.User_Accounts(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class BadgesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Badges
        fields = ('badgeName', 'badgeIcon', 'badgeDescription', 'badgeUnlocked')
