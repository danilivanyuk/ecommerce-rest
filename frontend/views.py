from django.shortcuts import render, redirect

def frontend(request):
    return render(request, 'frontend/main.html') 
