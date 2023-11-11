from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import login
from rest_framework import viewsets
from drawfulApp import serializers
from drawfulApp import models
from drawfulApp.authenticationbackend import CustomBackend
from datetime import datetime
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from datetime import datetime
from django.contrib.auth.hashers import make_password
import json
# Create your views here.

########## Example view ##########
# class TodoView(viewsets.ModelViewSet):#
#    serializer_class = serializers.TodoSerializer
#    queryset = models.Todo.objects.all()


def main(request):
    context = {}
    return render(request, "index.html", context)


class PromptView(viewsets.ModelViewSet):
    serializer_class = serializers.PromptSerializer
    queryset = models.Prompt_List.objects.all()


class User_MemoriesView(viewsets.ModelViewSet):
    serializer_class = serializers.User_MemoriesSerializer
    queryset = models.User_Memories.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['date', 'username']

    def getLatestDrawing(request):
        value = request.GET.get('username')

        try:
            q = models.User_Memories.objects.filter(
                username=value).values().order_by("-id")
            maxId = q[0]["id"]
            p = models.User_Memories.objects.filter(
                username=value).filter(id=maxId).values()
            # print(p)
            # print(q)
        except:
            q = "NO DRAWINGS WITH USERNAME: "+value
        print(q[0]["id"])

        return HttpResponse(p)

    def getTodaysDrawings(request):
        serializer_class = serializers.User_MemoriesSerializer
        date = request.GET.get('date')
        today = datetime.today().strftime('%Y-%m-%d')
        print(today)
        try:
            q = models.User_Memories.objects.filter(
                date=today).values().order_by("-id")
        except:
            q = "No drawings today: "
        print(q)

        return HttpResponse(q)

    def getUserDrawings(request):
        username = request.GET.get('username')
        try:
            # print("Queryset =", User_MemoriesView.queryset)
            p = models.User_Memories.objects.filter(username=username).values()
            # print("p =", p)

            data = list(p)
        except:
            p = "0"
        # print("\n\nType is : ", data)
        return JsonResponse({"data": data})

    def getAvgRating(request):
        username = request.GET.get('username')
        try:
            q = models.User_Memories.objects.filter(
                username=username).values_list('avgRating')

        except:
            q = "not working"
        return HttpResponse(q)

    def getTotalDrawings(request):
        value = request.GET.get('username')

        try:
            total = models.User_Memories.objects.filter(
                username=value).values()
        except:
            total = "not working"
        return HttpResponse(len(total))

    def getPromptGenre(request):
        name = request.GET.get('username')
        try:
            allPromptsDone = models.User_Memories.objects.filter(
                username=name).values_list('prompt')
            genre = models.Prompt_List.objects.filter(
                prompt__in=allPromptsDone).values_list('promptGenre')
        except:
            prompt_genre = "Unknown"
        return HttpResponse(genre)


class User_AccountsView(viewsets.ModelViewSet):
    serializer_class = serializers.User_AccountsSerializer
    queryset = models.User_Accounts.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username']

    def getFriendsNew(request):
        value = request.GET.get('username')
        # print("Username =", value)
        friendsList = []
        try:
            friendsElement = models.User_Accounts.objects.filter(
                username=value).values_list("friends")
            # friendsList = list(friendsElement)
            # print("List of friends: \n", friendsElement)
            # print("Friend 1: \n", friendsElement[0])
            # print("Friend 2: \n", friendsElement[1])
            # for i in range(0, len(friendsList)):
            try:
                friendsQuerySet = models.User_Accounts.objects.filter(
                    username=friendsElement[0])
                friendsList = list(friendsQuerySet)
                # print("INNER TRY: friendsList = ", friendsList)
            except:
                friendsList = []
                print("ERROR OCCURED with INNER try except")
        except:
            friendsList = []
            print("ERROR OCCURED with OUTER try except")
        # print("Final return \n", friendsList)
        return JsonResponse({{"friendList": (friendsList)}})

    def getFriendsNames(request):
        value = request.GET.get('username')
        friendsElement = []
        print("\n")
        print("cheeky lil check ", value)
        try:
            friendsElement = models.User_Accounts.objects.filter(
                username=value).values("friends")
            friendsList = list(friendsElement)
            print("List of friends: \n", friendsList)
        except:
            print("ERROR OCCURED with OUTER try except")
        print("Friends found...")
        return JsonResponse({"users": friendsList})

    def getUserEntry(request):
        value = request.GET.get('username')
        userEntry = []
        print("\n")
        print("Commencing", value)
        try:
            userDetails = models.User_Accounts.objects.filter(
                username=value).values()
            userEntry = list(userDetails)
            print("List of userDeets: \n", userEntry)
        except:
            print("ERROR OCCURED with OUTER try except")

        print("MWUAHAHAHAHHHAHAH Im sending: ", userEntry)
        return JsonResponse({"singleFriend": (userEntry)})

    def getFriendsEntries(request):
        value = request.GET.get('username')

        try:
            q = models.User_Accounts.objects.filter(
                username=value).values_list('friends')
        except:
            q = "NO DRAWINGS WITH USERNAME: "+value
        # print(q)
        return HttpResponse(q)

    def getUsernameCount(request):
        username = request.GET.get('username')
        print("Hello")
        try:
            q = models.User_Accounts.objects.filter(username=username).count()
        except:
            q = 0

        return HttpResponse(q)

    def getEmailCount(request):
        email = request.GET.get('email')
        try:
            q = models.User_Accounts.objects.filter(email=email).count()
        except:
            q = 0

        return HttpResponse(q)

    def authenticateUser(request):
        username = request.GET.get('username')
        password = request.GET.get('password')
        # print("Password =", password + "...")

        user = CustomBackend.authenticate(
            request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse("1")
        else:
            return HttpResponse("0")

    def getUsernames(request):  # that aren't your own
        value = request.GET.get('username')
        # print("We got...", value)
        try:
            q = models.User_Accounts.objects.exclude(username=value).values()
        except:
            q = 0
        data = list(q)
        # print("\n")
        # print(" \n \n Th DATATATATATAT iss... \n \n", data)
        # print("\n")
        return JsonResponse({"allUsers": data})

    def getBadgesEarned(request):
        name = request.GET.get('username')
        try:
            user_account = models.User_Accounts.objects.get(username=name)
            badges_earned = user_account.badgesEarned
        except:
            print("not working")

        return HttpResponse(badges_earned)

    def updateProfilePicture(request):
        username = request.GET.get('username')
        newPP_id = request.GET.get('id')
        try:
            user_account = models.User_Accounts.objects.filter(
                username=username)
            newPP = models.User_Memories.objects.get(id=newPP_id)
        except:
            return HttpResponse('No user found')

        if (newPP == None):
            return HttpResponse("no image provided")
        print(newPP)
        user_account.update(profilePicture=newPP.drawing)
        return HttpResponse('Profile picture updated sucessfully', newPP)

    def getProfilePicture(request):
        username = request.GET.get('username')
        try:
            pp = models.User_Accounts.objects.get(
                username=username).profilePicture

        except:
            return HttpResponse('user not found')
        return HttpResponse(pp)

    def getUserProfile(request):
        username = request.GET.get('username')
        try:
            user = models.User_Accounts.objects.values().filter(username=username)

        except:
            print("ERROR")

        return JsonResponse({"User": list(user)})

    def updatePassword(request):
        username = request.GET.get('username')
        if request.method == 'PUT':
            try:
                data = json.loads(request.body)
                password = make_password(data['password'])
                models.User_Accounts.objects.filter(username=username).update(
                    password=password,
                )
                return HttpResponse('Password updated successfully')
            except:
                return HttpResponse('Error')
        else:
            return HttpResponse('Invalid request method')

    def update_user_account(request):
        username = request.GET.get('username')
        if request.method == 'PUT':
            try:

                data = json.loads(request.body)
                models.User_Accounts.objects.filter(username=username).update(
                    username=data['username'],
                    email=data['email'],
                    first_name=data['first_name'],
                    last_name=data['last_name'],
                    bio=data['bio'],
                    currentStreak=data['currentStreak'],
                    maxStreak=data['maxStreak'],
                    totalStars=data['totalStars'],
                    averageRating=data['averageRating']
                )
                models.User_Memories.objects.filter(username=username).update(
                    username=data['username'],
                )
                return HttpResponse('User account updated successfully')
            except:
                return HttpResponse('User not found')
        else:
            return HttpResponse('Invalid request method')
    def updateFriends(request):
        username = request.GET.get('username')
        friendList = request.GET.get('friends')
        print(friendList)
        try:
            models.User_Accounts.objects.filter(username=username).update(
                friends=friendList
            )
            return HttpResponse(friendList)

        except:
            return HttpResponse("failed")    

    def delete_user_account(request):
        username = request.GET.get('username')
        if request.method == 'DELETE':
            try:
                # Delete the user's account
                models.User_Accounts.objects.filter(username=username).delete()

                # Delete all user memories with the given username
                models.User_Memories.objects.filter(username=username).delete()

                return HttpResponse('User account and memories deleted successfully')
            except:
                return HttpResponse('Error')
        else:
            return HttpResponse('Invalid request method')


class BadgesView(viewsets.ModelViewSet):
    serializer_class = serializers.BadgesSerializer
    queryset = models.Badges.objects.all()

    def updateBadges(request):
        user = request.GET.get('username')
        badgesEarned = request.GET.get('badgesEarned')

        try:
            accountData = models.User_Accounts.objects.filter(username=user)
        except:
            return HttpResponse('Failed to identify user, are you sure you entered the username correctly?')
        accountData.update(badgesEarned=badgesEarned)
        return HttpResponse('badges updated successfully', badgesEarned)

    # def updateBadgeTime(request):
    #     badgeName = request.GET.get('badgeName')
    #     now = datetime.now()
    #     current_time = now.strftime("%H:%M:%S")
    #     current_date = now.strftime("%Y-%m-%d")
    #     try:
    #         badgeData = models.Badges.objects.filter(badgeName=badgeName)
    #         print(badgeData)
    #     except:
    #         print("no")
    #     badgeData.update(badgeTimeUnlocked=current_time, badgeDateUnlocked=current_date)
    #     return HttpResponse('badge time updated')


# class Usernames(viewsets.ModelViewSet):
 #   serializer_class = serializers.User_AccountsSerializer
    # queryset = models.User_Accounts.objects.filter(username=)
