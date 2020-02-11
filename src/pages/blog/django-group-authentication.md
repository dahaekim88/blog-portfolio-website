---
title: "Django 사용자 인증 - Custom filters & decorators"
date: 2019-10-11T19:58:00.000Z
tags: ["django", "authentication", "custom-tags", "decorators"]
category: blog
open: false
---

<br />

Django의 인증 시스템은 사용자가 누구인지를 확인하는 Authentication과 사용자에게 권한을 부여하는 Authorization을 모두 핸들링한다. 따라서 이 시스템은 사용자(Users), 권한(Permissions), 그룹(Groups) 등으로 구성되어 있다.  

일반적으로 Django 템플릿에서 사용자의 인증 로직을 구현하려면, `django.contrib.auth` API의 Users 모델을 사용하여 유저의 권한을 간단하게 확인할 수 있다. 

아래 코드는 Navbar의 드랍다운 메뉴를 보여주는 부분인데, User 모델의 필드를 사용하여 (`user.is_superuser`) super admin인 유저에게만 어드민 버튼이 보이도록 설정할 수 있다.  

```html
<ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
  <li class="dropdown-header">{{ user.first_name|upper }}</li>
  {% if user.is_superuser %}
    <li>
      <a class="dropdown-item" href="/admin">{% trans 'Admin' %}</a>
    </li>
  {% endif %}
  <li>
    <a class="dropdown-item" href="{% url 'logout' %}">{% trans 'Logout' %}</a>
  </li>
</ul>
```

이처럼 사용자가 특정 권한을 가지고 있는지를 boolean 값으로 나타내어 주는 Permissions를 통해 인증이 가능하고, 이러한 권한 또한 세부적으로는 각 Group별 혹은 User별로 부여할 수 있다.   

<br />

Django의 어드민 패널에서 각 Group마다 요구되는 권한을 부여해준 다음 (여기서는 "Developement"), 

![i2-django-admin-group](/assets/i2-django-admin-group.png)

각 그룹에 속하는 사용자에게 해당 Group을 부여하거나 혹은 개별적인 권한을 일일이 부여해줄 수도 있다.  
(하지만 Group별로 권한을 묶어두는 것이 향후 관리하기가 용이하다) 

![i2-django-admin-user](/assets/i2-django-admin-user.png)

<br />

## Custom Filters

---

필요에 따라서 특정 그룹에 속하는 유저들을 별도로 확인해야 하는 경우가 발생할 수 있는데, 그럴 때에는 내장 API 만으로는 구현할 수가 없기 때문에 Custom Filter를 만들어서 사용할 수 있다.  

> #### templatetags/custom_tags.py

```py
from django import template

register = template.Library()

@register.filter(name='has_group')
def has_group(user, group_name):
    return user.groups.filter(name=group_name).exists()
```
> #### templates/navigation/primary-horizontal-navbar.html

```html
<ul class="navbar-nav flex-row">
  <li>
    <a class="nav-link {% active 'frontdesk' %}" href="{% url 'frontdesk:rooms' %}"><i
      class="fas fa-calendar nav-link-icon"></i><span class="nav-link-txt">{% trans 'frontdesk' %}</span></a>
  </li>
  {% if request.user|has_group:'Development' %}
  <li>
    <a class="nav-link {% active 'techdesk' %}" href="{% url 'techdesk:domains' %}"><i
      class="fas fa-calendar nav-link-icon"></i><span class="nav-link-txt">{% trans 'techdesk' %}</span></a>
  </li>
  {% endif %}
</ul>
```

![i2-navbar](/assets/i2-navbar.png)

만든 커스텀 필터를 이용하여 admin 버튼 또한 해당 그룹별로 권한을 받은 어드민 페이지로 넘겨주는 코드를 작성하였다.  

> #### templates/navigation/primary-horizontal-navbar.html

```html
<ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
  <li class="dropdown-header">{{ user.first_name|upper }}</li>
  {% if user.is_superuser %}
    <li>
      <a class="dropdown-item" href="/admin">{% trans 'Admin' %}</a>
    </li>
  {% elif request.user|has_group:'Development' %}
    <li>
      <a class="dropdown-item" href="/admintechdesk/">{% trans 'Admin' %}</a>
    </li>
  {% elif request.user|has_group:'New-Leads' %}
    <li>
      <a class="dropdown-item" href="/adminfrontdesk/">{% trans 'Admin' %}</a>
    </li>
  {% endif %}
  <li>
    <a class="dropdown-item" href="{% url 'logout' %}">{% trans 'Logout' %}</a>
  </li>
</ul>
```

하지만 알고보니 이렇게 `user.is_staff` API를 사용하면, 간단하게 알아서 그룹별로 조작 권한을 받은 모델에 대해서만 어드민 페이지로 연결되었다.  

```html
<ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
  <li class="dropdown-header">{{ user.first_name|upper }}</li>
  {% if user.is_staff %}
    <li>
      <a class="dropdown-item" href="/admin">{% trans 'Admin' %}</a>
    </li>
  {% endif %}
  <li>
    <a class="dropdown-item" href="{% url 'logout' %}">{% trans 'Logout' %}</a>
  </li>
</ul>
```

<br />

## Custom Decorators

---

Limiting access to logged-in users `request.user.is_authenticated` 로 확인 가능

Django에서는 Decorators를 사용하여서도 간단하게 사용자 로그인 인증을 할 수 있는데, 이 또한 앞서 말한 `django.contrib.auth` API로부터 `login_required` 라는 내장 데코레이터를 임포트하여 사용할 수 있다.  

[>> The Login Required Decorator](https://docs.djangoproject.com/en/3.0/topics/auth/default/#the-login-required-decorator)

`[views.py](http://views.py)` 에서 함수 위에  `@login_required` 와 같이 어노테이션 형태로 사용할 수도 있고, 혹은 `[urls.py](http://urls.py)` 에서 렌더링할 템플릿 뷰를 인자로 넘겨 로그인 인증된 사용자만이 해당 URL에 접속할 수 있도록 설정할 때 사용할 수도 있다.  

```py
from django.contrib.auth.decorators import login_required

@login_required
def partnership(request):
  ## ...생략

from django.contrib.auth.decorators import login_required

urlpatterns = [
  url(r'^partnership$', login_required(TemplateView.as_view(template_name='frontdesk/partnership.html')), name='partnership'),
]
```

하지만 이 또한, 그룹별로 

> #### decorators.py

```py
from django.contrib.auth.decorators import user_passes_test

def group_required(*group_names):
    """Requires user membership in at least one of the groups passed in."""
    def in_groups(u):
        if u.is_authenticated:
            if bool(u.groups.filter(name__in=group_names)) | u.is_superuser:
                return True
        return False
    return user_passes_test(in_groups, login_url='/frontdesk/rooms')
```

> #### urls.py

```py
from django.conf.urls import url
from techdesk import views
from django.views.generic import TemplateView
from techdesk.decorators import group_required

app_name='techdesk'

urlpatterns = [
  url(r'^api/domains$', views.domains, name='domains'),
  url(r'^domains$', group_required('admin', 'Development')(TemplateView.as_view(template_name='techdesk/domains.html')), name='domains'),
]
```
