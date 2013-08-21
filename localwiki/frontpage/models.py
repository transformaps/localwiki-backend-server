from django.db import models
from django.utils.translation import ugettext_lazy

from django_randomfilenamestorage.storage import (
    RandomFilenameFileSystemStorage)

from regions.models import Region


class FrontPage(models.Model):
    cover_photo = models.ImageField(ugettext_lazy("cover_photo"), upload_to="frontpage/files/",
        storage=RandomFilenameFileSystemStorage(), null=True)
    region = models.ForeignKey(Region)
