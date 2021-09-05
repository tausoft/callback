from django.urls import include, path
from django.conf.urls import *
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    url(r'backend/$', views.backend, name='backend'),
    url(r'^ajax/update_date/$', views.update_date, name='update_date'),
    url(r'^submit_form/$', views.submit_form, name ='submit_form'),
    url(r'^response_form/$', views.response_form, name ='response_form'),
    url(r'^archive/(?P<item_id>\d+)/$', views.archive, name ='archive'),
    url(r'^downcallback/$', views.downcallback, name ='downcallback'),
    url(r'^upcallback/$', views.upcallback, name ='upcallback'),
    url(r'^downsub/$', views.downsub, name ='downsub'),
    url(r'^upsub/$', views.upsub, name ='upsub'),
    url(r'^ajax/new_comment/$', views.new_comment, name='new_comment'),
]