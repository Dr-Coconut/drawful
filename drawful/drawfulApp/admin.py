from django.contrib import admin

# Register your models here.
from drawfulApp import models

########## Example Class ##########
#class TodoAdmin(admin.ModelAdmin):
#    list_display = ('title', 'description', 'completed')

class User_AccountsAdmin(admin.ModelAdmin):
    pass

# Register your models here.
#admin.site.register(Todo, TodoAdmin)
admin.site.register(models.User_Accounts, User_AccountsAdmin)