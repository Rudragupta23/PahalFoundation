from django.shortcuts import render, redirect
from .models import Blog, BlogComment
from django.contrib.auth.decorators import login_required
from math import ceil as c
from .models import Attendance
from datetime import datetime
from django.shortcuts import get_object_or_404, redirect, render
from .models import Volunteer

def volunteer_management(request):
    volunteers = Volunteer.objects.all()
    
    # Handle suspension toggle via POST
    if request.method == "POST":
        volunteer_id = request.POST.get('volunteer_id')
        volunteer = get_object_or_404(Volunteer, Reg_no=volunteer_id)
        volunteer.is_suspended = not volunteer.is_suspended
        volunteer.save()
        return redirect('volunteer_management')

    return render(request, 'content/volunteer_management.html', {'volunteers': volunteers})
def attendance_analysis(request):
    # Get the date from the URL parameter, or default to today's date
    selected_date = request.GET.get('date', datetime.now().strftime('%Y-%m-%d'))
    
    # Fetch records for the selected date
    records = Attendance.objects.filter(date=selected_date).select_related('student')
    
    # Calculate statistics for the summary pills
    present_count = records.filter(status='present').count()
    absent_count = records.filter(status='absent').count()
    total = records.count()
    rate = round((present_count / total * 100)) if total > 0 else 0

    context = {
        'attendance_records': records,
        'selected_date': selected_date,
        'present_count': present_count,
        'absent_count': absent_count,
        'attendance_rate': rate
    }
    return render(request, 'content/attendance_analysis.html', context)
# Create your views here.

def show_blog(request, blogs):
    no_of_posts = 3
    page = request.GET.get('page')
    if page is None:
        page = 1
    else:
        page = int(page)

    length = len(blogs)
    blogs = blogs[(page - 1) * no_of_posts: page * no_of_posts]

    if page > 1:
        prev = page-1
    else:
        prev = None
    if page < c(length/no_of_posts):
        nxt = page + 1
    else:
        nxt = None
    # context = {'blogs': blogs, 'prev': prev, 'nxt': nxt}
    start_index = (page - 1) * no_of_posts

    context = {
        'blogs': blogs,
        'prev': prev,
        'nxt': nxt,
        'start_index': start_index
    }    
    return render(request, 'content/blogs.html', context)

@login_required(login_url='/login/')
def your_blogs(request):
    blogs = Blog.objects.filter(owner=request.user).order_by('-time')
    return show_blog(request, blogs)

from django.core.paginator import Paginator

def blog(request):
    all_blogs = Blog.objects.all().order_by('-time')

    paginator = Paginator(all_blogs, 3)   # 3 blogs per page
    page_number = request.GET.get('page')

    blogs = paginator.get_page(page_number)

    context = {
        'blogs': blogs,
        'prev': blogs.previous_page_number() if blogs.has_previous() else None,
        'nxt': blogs.next_page_number() if blogs.has_next() else None,
        'start_index': blogs.start_index() - 1,
    }

    return render(request, 'content/blogs.html', context)

def blogpost(request, slug):
    this_blog = Blog.objects.filter(slug=slug).first()
    context = {'post': this_blog}
    if this_blog:
        this_blog.views += 1
        this_blog.save()

    if request.method == "POST":
        comment = request.POST.get("new_comment")
        blog_comment = BlogComment(blog=this_blog, name=request.user, body=comment)
        blog_comment.save()

        return render(request, 'content/blogpost.html', context)

    return render(request, 'content/blogpost.html', context)

# Added for like_post view
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required

@login_required(login_url='/login/')
def like_post(request, slug):
    post = get_object_or_404(Blog, slug=slug)

    if request.method == "POST":
        post.likes += 1
        post.save()

    return redirect('blogpost', slug=slug)

