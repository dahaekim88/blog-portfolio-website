---
title: "Django 사용자 인증 - Custom template filters & decorators"
date: 2019-10-11T19:58:00.000Z
tags: ["django", "authentication", "custom-tags", "decorators"]
category: blog
open: true
---

<br />

Django의 인증 시스템은 사용자가 누구인지를 확인하는 Authentication과 사용자에게 권한을 부여하는 Authorization이 결합되어 있는 형태로 사용자(Users), 권한(Permissions), 그룹(Groups) 등으로 구성되어 있다.  

일반적으로 Django 템플릿에서 사용자의 인증 로직을 구현하려면, `django.contrib.auth` API의 Users 모델을 사용하여 유저의 권한을 간단하게 확인할 수 있다. 

아래 코드는 Navbar의 드랍다운 메뉴를 보여주는 부분인데, User 모델의 필드를 사용하여 사용자의 이름(`user.first_name`)을 보여주거나 super admin인 유저(`user.is_superuser`)에게만 어드민 버튼이 보이도록 설정할 수 있다.  

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

<br />

이처럼 Django는 built-in permissions 시스템을 통해 인증이 가능하고, 이러한 권한은 Django admin 사이트를 통해 혹은 프로그래밍 방식으로 각 Group별 혹은 User별로 세분화된 권한을 부여할 수 있다.  

Django의 어드민 페이지를 통해 확인해보면, 각 Group에 맞게 요구되는 권한을 부여해준 다음 (여기서는 "Developement"), 

![i2-django-admin-group](/assets/i2-django-admin-group.png)

각 그룹에 속하는 사용자에게 해당 Group을 부여하거나 혹은 개별적인 권한을 일일이 부여해줄 수도 있다.  
(하지만 Group별로 권한을 묶어두는 것이 향후 관리하기가 용이하다) 

![i2-django-admin-user](/assets/i2-django-admin-user.png)

<br />

## Custom Template Filters

---

필요에 따라서 특정 그룹에 속하는 유저들을 별도로 확인해야 하는 경우가 발생할 수 있는데, 그럴 때에는 내장 API 만으로는 구현할 수가 없기 때문에 Custom Filter를 만들어서 사용할 수 있다.  

[>> Custom template filters](https://docs.djangoproject.com/en/3.0/howto/custom-template-tags/)

Django를 사용하고 있는 회사 내부용 인트라넷 사이트에 회사에서 진행 중인 각 프로젝트마다 해당 웹사이트의 SSL 종료일을 확인할 수 있도록 `Techdesk` 라는 이름의 페이지를 신규로 추가하였는데, 이 페이지는 개발팀 직원들만 볼 수 있도록 설정을 하고 싶었다.  

그리하여 이를 확인하기 위한 커스텀 필터를 다음과 같이 작성하였다.

> #### templatetags/custom_tags.py

```py
from django import template

register = template.Library()

@register.filter(name='has_group') ## 데코레이터를 사용하여 Library 인스턴스에 해당 필터 등록
def has_group(user, group_name):
    return user.groups.filter(name=group_name).exists() ## 해당 유저가 그룹에 속하는지 boolean 값으로 리턴
```

이렇게 작성한 커스텀 필터는 템플릿에서 다음과 같이 작성할 수 있다. `request.user` 값을 커스텀 필터 `has_group`의 첫 번째 인자로 넘겨받고, 두 번째 인자로 그룹명을 넘겨주면 해당 유저가 그룹에 속하는지에 대한 boolean 값을 얻음으로써, 해당 그룹에 속하는 유저만이 볼 수 있는 메뉴를 조건부 렌더링해 줄 수 있다.

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

<br />

뿐만 아니라, 개발팀 직원들이 직접 자신이 담당하고 있는 프로젝트의 도메인을 등록하여 관리할 수 있도록 어드민 페이지에 접근할 수 있도록 하려고 하는데, 이 또한 커스텀 필터를 이용하여 어드민 버튼이 렌더링 될 수 있도록 코드를 작성하였다.  

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
  {% endif %}
  <li>
    <a class="dropdown-item" href="{% url 'logout' %}">{% trans 'Logout' %}</a>
  </li>
</ul>
```

하지만 이렇게 작성을 하고 나니, 다른 그룹에서 어드민 권한이 필요한 경우 코드가 괜히 길어져 유지보수가 좋지 않아 보여 공식문서를 다시 확인해보니, 이렇게 `user.is_staff` API를 사용하면 간단하게 알아서 그룹별로 조작 권한을 받은 모델에 대해서만 어드민 페이지로 연결되었다. (슈퍼 어드민 또한 스태프 권한이 있으므로 동일하게 적용된다)  

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

여기까지 작업을 하면 앞서 Django 어드민 페이지에서 `Development` 그룹으로 선택되어진 유저는 해당 메뉴(TECHDESK)와 Admin 버튼을 다음과 같이 볼 수 있게 된다.

![i2-navbar](/assets/i2-navbar.png)

이렇게 커스텀 필터를 통해서 특정 그룹에게 본인들이 접근할 수 있는 메뉴를 조건부로 렌더링하게 하는 것을 적용해보았는데, 여전히 사용자들이 URL을 통해서는 접근이 가능하기 때문에 이를 제한하기 위한 코드를 추가로 작성해 주어야 하는데, 이를 위해서는 커스텀 데코레이터를 사용해보았다.

<br />

## Custom Decorators

---

Django에서는 내장 API(`request.user.is_authenticated`)를 사용하면 사용자 로그인 인증 확인 또한 간편하게 할 수 있는데, 이는 Decorators를 통해서도 가능하다. 이 또한 `django.contrib.auth` API로부터 `login_required` 라는 내장 데코레이터를 임포트하여 사용할 수 있다.  

[>> The Login Required Decorator](https://docs.djangoproject.com/en/3.0/topics/auth/default/#the-login-required-decorator)

이 데코레이터는 `views.py`에서 함수 위에  `@login_required` 와 같이 어노테이션 형태로 사용할 수도 있고, 혹은 `urls.py` 에서 렌더링할 템플릿 뷰를 인자로 넘겨 로그인 인증된 사용자만이 해당 페이지에 접속할 수 있도록 설정할 때 사용할 수도 있다.  

> #### views.py

```py
from django.contrib.auth.decorators import login_required

@login_required
def partnership(request):
  ## ...생략
```

> #### urls.py

```py
from django.contrib.auth.decorators import login_required

urlpatterns = [
  url(r'^partnership$', login_required(TemplateView.as_view(template_name='frontdesk/partnership.html')), name='partnership'),
]
```

로그인한 사용자 중에서도 또 특정 그룹에 속한 사람들만을 확인하여 해당 페이지로의 접근 제한을 하려면 `@login_required`와 유사하게 동작을 하는 커스텀 데코레이터 `@group_required`를 작성하여 이용할 수 있다.  

이 데코레이터를 작성할 때에도 또 `user_passes_test`라는 내장 데코레이터의 도움을 받아 작성할 수 있는데, 유저가 통과할 테스트 함수를 첫 번째 인자로 받고, 두 번째 인자로는 유저가 테스트를 통과하지 못했을 경우 redirect할 URL을 넘겨준다.

[>> Limiting access to logged-in users that pass a test](https://docs.djangoproject.com/en/3.0/topics/auth/default/#limiting-access-to-logged-in-users-that-pass-a-test)

> #### decorators.py

```py
from django.contrib.auth.decorators import user_passes_test

def group_required(*group_names): ## 복수의 그룹명을 인자로 받는다
    """Requires user membership in at least one of the groups passed in."""
    def in_groups(user):
        if user.is_authenticated: ## 유저가 로그인 되었는지부터 먼저 체크
            if bool(user.groups.filter(name__in=group_names)) | user.is_superuser: 
            ## 유저가 해당 그룹 중 하나라도 소속되어 있던지 혹은 슈퍼 어드민인 경우
                return True
        return False
    return user_passes_test(in_groups, login_url='/frontdesk/rooms') ## 테스트 통과 못할 경우 메인 페이지로 이동
```

이렇게 작성한 커스텀 데코레이터는 `urls.py`에서 임포트하여 사용할 수 있다. 이렇게 작성하면 이제 TECHDESK 페이지는 오로지 어드민과 개발팀 직원들만 접근할 수 있게 된다.

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
