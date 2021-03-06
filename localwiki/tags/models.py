import re

from django.contrib.gis.db import models
from django.db.utils import IntegrityError
from django.template.defaultfilters import stringfilter
from django.utils.html import strip_tags
from django.utils.translation import ugettext_lazy as _

from regions.models import Region
from localwiki.utils.urlresolvers import reverse
from versionutils import versioning, diff


class Tag(models.Model):
    name = models.CharField(max_length=100, blank=False)
    slug = models.CharField(editable=False, max_length=100, blank=False, db_index=True)
    region = models.ForeignKey(Region, null=True)

    def __unicode__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.name = strip_tags(self.name)
        self.slug = slugify(self.name)
        if not self.slug:
            raise IntegrityError('Invalid tag name: %s' % self.name)
        super(Tag, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('tags:tagged', kwargs={'region': self.region.slug, 'slug':self.slug})

    class Meta:
        unique_together = ('slug', 'region')
        ordering = ('slug',)
        verbose_name = _(u'Tag')
        verbose_name_plural = _(u'Tags')

versioning.register(Tag)


def slugify(value):
    # normalize unicode
    import unicodedata
    value = unicodedata.normalize('NFKD', unicode(value))
    # remove non-word characters
    misc_characters = re.compile(('[^\w]'), re.UNICODE)
    value = re.sub(misc_characters, '', value)
    return value.lower()
slugify = stringfilter(slugify)


class PageTagSet(models.Model):
    page = models.OneToOneField('pages.Page')
    tags = models.ManyToManyField(Tag)
    region = models.ForeignKey(Region, null=True)

    objects = models.GeoManager()

    def __unicode__(self):
        return ', '.join(map(unicode, self.tags.all()))

    class Meta:
        ordering = ('page__slug',)


class TagsFieldDiff(diff.BaseFieldDiff):
    template = 'tags/tags_diff.html'

    def get_diff(self):
        set1 = set(self.field1 and self.field1.all() or [])
        set2 = set(self.field2 and self.field2.all() or [])
        deleted = set1.difference(set2)
        added = set2.difference(set1)
        equal = set1.intersection(set2)
        return {'equal': equal, 'deleted': deleted, 'added': added}


class PageTagSetDiff(diff.BaseModelDiff):
    fields = (('tags', TagsFieldDiff),
              )


diff.register(PageTagSet, PageTagSetDiff)
versioning.register(PageTagSet)


# For registration calls
import signals
import feeds
