from django.shortcuts import render
from django.http import HttpResponse
def hello(request):
    return HttpResponse("Come on and slam")
def hello_template(request, yourname):
  return render(request, "hello.html", { "yourname": yourname, "foobar": 12 })