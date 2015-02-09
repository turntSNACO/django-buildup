import os
ROOT_URLCONF = 'buildup.urls'
WSGI_APPLICATION = 'buildup.wsgi.application'
SECRET_KEY = os.environ.get('DJANGO_SECRET', 'sekret')
DEBUG = True
MIDDLEWARE_CLASSES = ()
