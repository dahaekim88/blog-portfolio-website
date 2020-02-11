---
title: "GatsbyJS - Private Route 구현하기"
date: 2019-07-18T22:15:00.000Z
tags: ["react", "gatsby", "route"]
category: blog
open: true
---

<br />

첫번째 리액트 프로젝트를 진행했을 때에는 React Router 라이브러리를 사용하지 않고, [Web API와 React API만을 사용하여 라우팅을 구현](/blog/first-react-project-1)하였기 때문에 Private Router에 대한 개념이 딱히 없었다.  

해당 페이지의 `componentDidMount()`단계에서 사용자 인증을 확인한 경우, 인증되지 않은 유저는 로그인 페이지로 이동하게끔 작성을 했었다.  

```js
componentDidMount() {
  if (!localStorage.getItem("x-access-token")){5
    this.props.handlePage("/user/login");
  }
  // ...생략
}
```

하지만 Wrapper Component로 Private Router를 작성하면 컴포넌트가 마운트 되기도 전에 인증을 확인하여 redirect 시켜줄 수 있다. GatsbyJS에서는 내부적으로 Reach Router를 사용하고 있으니, 이와 함께 프라이빗 라우터를 구현해보았다.  

<br />

## JWT를 통한 인증 확인

우선 사용자 인증 처리는 JWT를 통한 토근 기반 인증 방식을 사용하였다. 따라서 로그인에 필요한 이메일과 패스워드 정보를 받아 서버에 넘긴 후, 전달받은 응답의 헤더에 담겨있는 토큰을 로컬스토리지에 저장해 두었다.  

```js
// services/auth.js

export const handleLogin = async ({ email, password }) => {
  const urlLogin = `${config.SERVER_URL}/login`
  const response = await http.post(urlLogin, {
    email,
    password,
  })

  const token = response.headers["x-auth-token"] // 로그인 인증 후 전달받은 토큰을
  saveToken(token) // 로컬스토리지에 저장 후

  navigate("/") // 홈 화면으로 redirect
}

export const isLoggedIn = () => {
  const token = getToken() // 로컬스토리지의 토큰 저장 여부로 인증 확인
  return !!token
}

export const saveToken = jwt => {
  if (jwt) {
    isBrowser() && window.localStorage.setItem(KEY_TOKEN, jwt)
  }
}

export const getToken = () => {
  return isBrowser() && window.localStorage.getItem(KEY_TOKEN)
}
```

<br />

## Private Route를 통한 마이페이지 접근 제한

로그인하여 사용자 인증이 완료된 경우에만 접근이 가능한 페이지를 구현하기 위해 프라이빗 라우터를 별도의 컴포넌트로 작성하여, 로그인이 필요한 페이지마다 재사용이 가능하도록 만들었다. 일반 라우터 라이브러리처럼, `PrivateRoute` 컴포넌트 또한 렌더링할 컴포넌트를 prop으로 넘겨받은 후, 로컬스토리지에 저장된 토큰으로 인증이 확인된 유저들만 해당 컴포넌트를 리턴해 주도록 하는 매우 간단한 컴포넌트이다.  

Router 컴포넌트로부터 내부적으로 넘겨받은 컨텍스트의 `location` 객체를 통해 현재 페이지를 확인하여, 현재 로그인 페이지에 위치해 있는 경우 다시 redirect 되지 않도록 처리해주었다.  

```js
// components/privateRoute.js

import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (typeof window !== `undefined`) {
    if (!isLoggedIn() && location.pathname !== `/login`) {
      // 유저가 로그인 되지 않았다면, 로그인 페이지로 redirect
      navigate(`/login`)
      return null
    }
  }

  return <Component {...rest} />
}

export default PrivateRoute
```

```js
import React from "react"
import { Router } from "@reach/router"
import Layout from "../../components/Layout"
import PrivateRoute from "../../components/route/privateRoute"
import MyPage from "../../components/my-page/MyPage"

const MyPage = () => (
  <>
    <Layout>
      <Router>
        <PrivateRoute path="/mypage" component={MyPage} />
      </Router>
    </Layout>
  </>
)

export default MyPage
```
