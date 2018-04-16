# todo/views.py
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    # return HttpResponse("todo")
    return render(request, 'todo/index.html')