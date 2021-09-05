from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect
from .models import *
import datetime

backend_sort_trigger = 0

def index(request):
    return render(request, "index.html")

def backend(request):
    global backend_sort_trigger
    if backend_sort_trigger == 0:
        entry_data = EntryTable.objects.all().filter(status=0).order_by('-udatetime')
    if backend_sort_trigger == 1:
        entry_data = EntryTable.objects.all().filter(status=0).order_by('udatetime')
    if backend_sort_trigger == 2:
        entry_data = EntryTable.objects.all().filter(status=0).order_by('-datecreated')
    if backend_sort_trigger == 3:
        entry_data = EntryTable.objects.all().filter(status=0).order_by('datecreated')

    arg = {'ticket_data': entry_data, 'backend_sort_trigger': backend_sort_trigger}
    return render(request, "administration.html", arg)

def response_form(request):
    return render(request, "response.html")

def downcallback(request):
    global backend_sort_trigger
    backend_sort_trigger = 0

    return HttpResponseRedirect('/backend/')

def upcallback(request):
    global backend_sort_trigger
    backend_sort_trigger = 1

    return HttpResponseRedirect('/backend/')

def downsub(request):
    global backend_sort_trigger
    backend_sort_trigger = 2

    return HttpResponseRedirect('/backend/')

def upsub(request):
    global backend_sort_trigger
    backend_sort_trigger = 3

    return HttpResponseRedirect('/backend/')

def archive(request, item_id):
    if request.method == 'POST':
        item = EntryTable.objects.get(pk=item_id)
        uname = item.uname
        uphone = item.uphone
        ucompany = item.ucompany
        uemail = item.uemail
        usubject = item.usubject
        umessage = item.umessage
        status = 1
        comments = item.comments
        udatetime = item.udatetime
        datecreated = item.datecreated
        datemodified = item.datemodified

        ticket_table = EntryTable(id=item_id, uname=uname, uphone=uphone, ucompany=ucompany, uemail=uemail, usubject=usubject, umessage=umessage, udatetime=udatetime, status=status, comments=comments, datecreated=datecreated, datemodified=datemodified)
        ticket_table.save()

        return HttpResponseRedirect('/backend/')

def new_comment(request):
    now_date = datetime.datetime.now()
    now = now_date.strftime("%Y-%m-%d %H:%M")

    item_id = request.GET.get('item_id', None)
    comment_get = request.GET.get('comment_get', None)

    item = EntryTable.objects.get(pk=item_id)
    uname = item.uname
    uphone = item.uphone
    ucompany = item.ucompany
    uemail = item.uemail
    usubject = item.usubject
    umessage = item.umessage
    status = 0
    comments = item.comments
    if item.comments != '':
        comments = '<p class="textblackleft" style="color:gray; border-top: 1px solid lightgray;">author: guest<span style="float:right;">' + str(now) + '</span></p><p class="textblackleft" style="text-align:justify;">' + comment_get + '</p>' + item.comments
    else:
        comments = '<p class="textblackleft" style="color:gray; border-top: 1px solid lightgray;">author: guest<span style="float:right;">' + str(now) + '</span></p><p class="textblackleft" style="text-align:justify;">' + comment_get + '</p>'
    udatetime = item.udatetime
    datecreated = item.datecreated
    datemodified = item.datemodified

    ticket_table = EntryTable(id=item_id, uname=uname, uphone=uphone, ucompany=ucompany, uemail=uemail, usubject=usubject, umessage=umessage, udatetime=udatetime, status=status, comments=comments, datecreated=datecreated, datemodified=datemodified)
    ticket_table.save()

    jquery_comment = str(comment_get)
    data = {'message': str(jquery_comment)}
    return JsonResponse(data)



def update_date(request):
    date = request.GET.get('date', None)
    jquery_data = str(date)

    year = request.GET.get('year', None)
    month = request.GET.get('month', None)
    day = request.GET.get('day', None)
    saturday_trigger = 0
    day_of_week = datetime.datetime(int(year), int(month), int(day), 23, 55, 55, 173504).weekday()
    if day_of_week == 5:
        saturday_trigger = 1

    data = {'message': jquery_data, 'saturday': saturday_trigger}
    return JsonResponse(data)

def submit_form(request):
    if request.method == 'POST':
        try:
            uname = request.POST["name"]
            uphone = request.POST["phone"]
            ucompany = request.POST["company"]
            uemail = request.POST["email"]
            usubject = request.POST["subject"]
            umessage = request.POST["message"]
            status = 0
            udate = request.POST["date"]
            utime = request.POST["time"]

            if utime != "":
                udatetime = udate + ' ' + utime
            else:
                udatetime = 'Not selected'


            entry_table = EntryTable(uname=uname, uphone=uphone, ucompany=ucompany, uemail=uemail, usubject=usubject, umessage=umessage, status=status, udatetime=udatetime)
            entry_table.save()

            data = "Thank you for your feedback"
            message = "We will get back to you with more informations."
            arg = {"data": data, "message": message}
            return render(request, "response.html", arg)
        except:
            data = "Ooops! Something went wrong"
            message = "Please try again and if the error keeps happening get in contact with us."
            arg = {"data": data, "message": message}
            return render(request, "response.html", arg)
    else:
        data = "The request is not valid"
        message = "The server could not accept your request because it was not valid. Please try again and if the error keeps happening get in contact with us."
        arg = {"data": data, "message": message}
        return render(request, "response.html", arg)