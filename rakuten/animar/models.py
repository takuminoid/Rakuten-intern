from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, _user_has_perm
)
from django.core import validators
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone

# class User(models.Model):
#     id = models.AutoField(primary_key=True)
#     mail = models.EmailField()
#     user_id = CharField(max_length=255, primary_key=True)
#     password = models.CharField(max_length=50) # 要確認
#     name = models.CharField(max_length=255)
#     image = models.ImageField()
#     sex = models.IntegerField()
#     type = models.IntegerField()
#     birthday = models.DateTimeField(default=timezone.now)
#     residence = models.CharField(max_length=255)
#     profile = models.TextField()# Textでok?
#     created_at = models.DateTimeField(default=timezone.now)



class UserManager(BaseUserManager):
    def create_user(self, request_data, **kwargs):
        now = timezone.now()
        if not request_data['user_id']: # user_idが無い場合エラーを返す
            raise ValueError('Users must have an user id.')

        profile = "" # 必要ある？
        if request_data.get('profile'):
            profile = request_data['profile']

        user = self.model( # パスワード含める？
            mail=request_data['mail'],
            user_id=request_data['user_id'],
            name=request_data['name'],
            image=request_data['password'],
            sex=request_data['sex'],
            type=request_data['type'],
            birthday=request_data['birthday'],
            residence=request_data['residence'],
            profile=profile,
            created_at=now
        )

        user.set_password(request_data['password'])
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **extra_fields): # 未着手
        request_data = {
            'username': username,
            'email': email,
            'password': password
        }
        user = self.create_user(request_data)
        user.is_active = True
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    # https://qiita.com/xKxAxKx/items/60e8fb93d6bbeebcf065

    id = models.AutoField(primary_key=True, unique=True)
    mail = models.EmailField()
    user_id = models.CharField(max_length=255, unique=True) # 主キーは1つまでらしいからIDでやる、uniqueで制限をかける
    password = models.CharField(max_length=50) # 要確認
    name = models.CharField(max_length=255, blank=True)
    image = models.ImageField(blank=True)
    sex = models.IntegerField(blank=True)
    type = models.IntegerField(blank=True)
    birthday = models.DateTimeField(default=timezone.now, blank=True)
    residence = models.CharField(max_length=255, blank=True)
    profile = models.TextField(blank=True) # Textでok?
    created_at = models.DateTimeField(default=timezone.now, blank=True)

    objects = UserManager()

    # USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['username']

    def user_has_perm(user, perm, obj):
        return _user_has_perm(user, perm, obj)

    def has_perm(self, perm, obj=None):
        return _user_has_perm(self, perm, obj=obj)

    def has_module_perms(self, app_label):
        return self.is_admin

    @property
    def is_superuser(self):
        return self.is_admin

    # 何これ
    # class Meta:
    #     db_table = 'api_user'
    #     swappable = 'AUTH_USER_MODEL'
