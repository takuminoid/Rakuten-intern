from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, _user_has_perm, UserManager, PermissionsMixin
)
from django.core import validators
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone

class CustomUserManager(UserManager):
    use_in_migrations = True
    def _create_user(self, user_id, mail, password, name=None, image=None, sex=None, type=None, birthday=None, residence=None, profile=None, **extra_fields):

        user = self.model(user_id=user_id, mail=mail, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user_id

    def create_user(self, user_id, mail, password, name=None, image=None, sex=None, type=None, birthday=None, residence=None, profile=None, **extra_fields):
        if not user_id: # user_idが無い場合エラーを返す
            raise ValueError('mast.')

        # profile = "" # 必要ある？
        # if request_data.get('profile'):
        #     profile = request_data['profile']

        # user = self.model( # パスワード含める？
        #     mail=request_data['mail'],
        #     user_id=request_data['user_id'],
        #     name=request_data['name'],
        #     image=request_data['password'],
        #     sex=request_data['sex'],
        #     type=request_data['type'],
        #     birthday=request_data['birthday'],
        #     residence=request_data['residence'],
        #     profile=profile,
        #     created_at=now
        # )
        # user_id = self.model.normalize_username(user_id)
        # mail = self.normalize_email(mail)
        # user = self.model(
        #     mail=mail,
        #     user_id=user_id,
        #     **extra_fields
        # )
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(user_id, mail, password, name, image, sex, type, birthday, residence, profile, **extra_fields)

    def create_superuser(self, user_id, mail, password, name=None, image=None, sex=None, type=None, birthday=None, residence=None, profile=None, **extra_fields):
        # request_data = {
        #     'user_id': user_id,
        #     'mail': mail,
        #     'password': password
        # }

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        # user.save(using=self._db)
        # return user
        return self._create_user(user_id, mail, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    # https://qiita.com/xKxAxKx/items/60e8fb93d6bbeebcf065

    id = models.AutoField(primary_key=True, unique=True)
    mail = models.EmailField(max_length=70)
    user_id = models.CharField(max_length=255, unique=True) # 主キーは1つまでらしいからIDでやる、uniqueで制限をかける
    name = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    sex = models.IntegerField(blank=True, null=True)
    type = models.ForeignKey('Type', on_delete=models.CASCADE, blank=True, null=True)
    birthday = models.DateField(default=timezone.now, blank=True, null=True)
    residence = models.CharField(max_length=255, blank=True, null=True)
    profile = models.TextField(blank=True, null=True) # Textでok?
    created_at = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_(
            'Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'user_id'
    REQUIRED_FIELDS = ['mail']

    def user_has_perm(self, user, perm, obj):
        return _user_has_perm(user, perm, obj)

    def has_perm(self, perm, obj=None):
        return _user_has_perm(self, perm, obj=obj)

    # def has_module_perms(self, app_label):
    #     return self.is_admin

    # @property
    # def is_superuser(self):
    #     return self.is_admin

    # 何これ
    # class Meta:
    #     db_table = 'animar_user'
    #     swappable = 'AUTH_USER_MODEL'

class Type(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Like(models.Model):
    post_id = models.models.ForeignKey('Post', to_field='id', on_delete=models.CASCADE)
    user_id = models.models.ForeignKey('User', to_field='id', on_delete=models.CASCADE)
