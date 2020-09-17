from django.contrib import admin

from .models import User


class UserView(admin.ModelAdmin):
    fields = ('name', 'age', )
    list_display =  ('name', 'age', )


admin.site.register(User, UserView)