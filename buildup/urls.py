from django.conf.urls import patterns, url
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = patterns('', url(r'^$', 'buildup.views.hello', name='hello'),
url(r'^hello_template/(?P<yourname>\w+)/$', 'buildup.views.hello_template', name='hello_template'),url(r'^megaman/$', 'buildup.views.megaman', name='megaman'),)+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)                       