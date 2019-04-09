---
title: "첫 리액트 프로젝트의 기록 (1)"
date: 2019-01-08T21:55:00.000Z
tags: ["team-project", "back-end"]
category: blog
open: true
---

### Component별로 나눠서 하는 관리의 이점

- 코드를 모듈화하여 컴포넌트 재사용이 가능하여, 중복되는 코드를 줄일 수 있고 유지보수에도 좋다.
- 한 쪽 방향으로만 데이터가 흐르기 때문에, 시간이 지남에 따라 변화되는 데이터를 관리하기 쉽다.
- 가상 돔을 사용하여, 실제로 변경된 부분만 업데이트 하기 때문에 렌더링을 최소화 할 수 있다.

### Props와 State

state를 통해 상태를 관리하고 변경 가능하며, 이를 자식 컴포넌트에 props로 넘겨줌으로써 자식 컴포넌트와도 서로 interaction(상호작용)이 가능하다.

### React Lifecycle 중 `componentDidMount` 의 사용

- HTML이 로딩 되자마자 호출
- 주로, DOM에 관련된 작업 및 이벤트 리스닝 관련 작업을 여기서 하는데, app.tsx 에서 브라우저 창의 뒤로가기, 앞으로가기 버튼을 누를 때 발생하는 사이드바 토글 기능을 위한 이벤트 리스너를 여기에 넣어주었다.
- 또한 컴포넌트가 마운트 되기 전에 외부 API로부터 response가 오는 경우 제대로 렌더링되지 않을 수 있기 때문에, 컴포넌트가 마운트된 다음에 외부 데이터를 받아와서 렌더링 할 수 있도록 해야하므로, 여기서 Ajax와 같은 외부 데이터 요청을 해야한다.

### 라이브러리 없이 클라이언트 라우팅하기

이번 팀 프로젝트에서는 최대한 라이브러리에 의존하지 않고 작업을 해보기로 했는데, 그러다보니 가장 예상치 못하게 작업한 부분이 바로 클라이언트 라우팅 부분이었다. 보통 React로 작업하면 자연스레 같이 사용하게 되는 React-Router 대신, 오로지 Web API와 React API만을 사용하여 화면 전환 및 URL 변경 처리를 해주었다.

다음과 같이 브라우저가 화면을 전환하는 경우를 모두 고려하여 처리를 해주어야 했는데,

- 브라우저 주소창에 URL을 입력 시
- 웹페이지의 링크 클릭 시
- 브라우저의 Back 또는 Forward 버튼을 클릭 시

이 모두를 만족시킬 수 있는 방법을 찾아냈다.

<br />

**바로 DOM의 window와 history 객체를 사용하는 것!**

DOM window 객체는 브라우저의 history 객체를 통해 세션 히스토리에 접근할 수 있게 해주는데, 사용자의 방문 흔적(history)를 통해 back & forth로 이동할 있도록 해주는 다양한 메서드와 프러퍼티를 제공해주고 있었다.

- **URL 변경 :** `history.pushState()` + `window.onpopsatate`  
  `history.pushState()`는 history entries를 추가 또는 변경해주어 history stack에 사용자의 흔적을 state로 남기게 만들어, single page application 임에도 불구하고 URL이 변경된다.

  이는 주로 `window.onpopstate`와 밀접하게 연동되어 사용되는데, `popstate` 이벤트는 back & forward 버튼 클릭과 같은 브라우저 상의 액션에 의해 history entry가 변경될 때 발생하는 이벤트로, history entry의 state를 가지고 있기 때문에 componentDidMount 시점에 popstate를 리스닝하고 있다가 화면 전환을 할 수 있도록 처리해주었다.
  <br />

**URL은 잘 변경이 되었지만, 해당 URL에 적합한 컴포넌트는 어떻게 렌더링 해줘야 할까?**

- **화면 전환 :** `forceUpdate()`  
  변경된 URL에 적합한 화면 전환을 위해서는, React API의 `forceUpdate()` 메서드를 사용하여 그에 맞는 컴포넌트가 렌더링 되도록 해주었다. `forceUpdate()` 는 shouldComponentUpdate() 단계를 스킵하고 무조건 컴포넌트의 render() 메서드가 호출되도록 해주는 API로, 일반적으로는 잘 사용하지 않는듯 하다..

- **현재 URL 확인 :** `location.pathname`  
  `location.pathname`을 통해 현재 URL 상태를 확인한 다음, switch ~ case 문으로 현재 URL의 상태에 따라 컴포넌트 렌더링을 해주었다.

**프로젝트에 실제로 사용했던 코드 예제**

```javascript
// App.tsx

// ...생략

export default class App extends Component {
  componentDidMount() {
    onpopstate = () => {
      this.forceUpdate()
    }
  }

  handlePage = (pathname: string) => {
    history.pushState(null, "", pathname)
    this.forceUpdate()
  }

  render() {
    // ...생략
  }
}
```

```javascript
// Main.tsx

// ...생략

const Main = (props: IMainProps) => {
  const pathname = location.pathname;
  const handlePage = props.handlePage;

  switch (pathname) {
    case "/":
      return <Home />;
    case "/user/login":
      return <LoginForm handlePage={handlePage} />;
    case "/rental":
      return <Rental />;
    default:
      return <NotFound />;
  }
```

<br />

아마 어떠한 라이브러리도 쓰지 않고 오로지 Web API와 React API만을 사용해서 라우팅을 구현한 프로젝트는 정말 찾아보기 쉽지 않을 것 같다. 우리 프로젝트의 가장 특징적인 점 중 하나로 남을 듯!

### JWT 토큰 인증

User Authentication 방식으로 우리가 채택한 것은 JWT 토큰 인증 방식이었는데, 서버로부터 발급받은 토큰을 localStorage에 저장하여 Axios(XHR) 요청을 할 때마다 헤더에 실어서 서버에 보내주는 방식으로 작업하였다.

[>> Axios header에 넣는 법](https://www.dahae.kim/blog/how-to-use-axios/)

그리고 클라이언트에서 필요한 (민감하지 않은) 유저 정보는 토큰의 payload에 담아 전달받고, 필요할 때 localStorage에 저장해 놓은 토큰을 불러와서 decode하여 payload 내용을 사용하였다. 이 또한 라이브러리를 사용하지 않고 직접 작성하는 방법과 편하게 라이브러리를 사용하는 방법이 있었다.

<br />

- Web API 사용하여 직접 파싱  
  `window.atob()`은 base-64 인코딩을 사용한 데이터를 decode 해준다.

```javascript
// utils/parseJwt.ts

export default function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace("-", "+").replace("_", "/")
    const dataJWT: IDataJWT = JSON.parse(window.atob(base64))
    return dataJWT
  } catch (err) {
    return INVALID_JWT
  }
}

// components에서 불러와 사용하기

import parseJwt, { INVALID_JWT } from "../util/parseJwt"

const token = localStorage.getItem("x-access-token")
if (token) {
  const decodedToken = parseJwt(token)
}
```

<br />

- `jwt-decode` 라이브러리 사용

```javascript
import jwtDecode from "jwt-decode"

// ...생략

componentDidMount() {
  const token = localStorage.getItem("x-access-token")
  if (token) {
    const decodedToken = jwtDecode(token)
  }
}
```

<br />

우리는 역시나 라이브러리에 많이 의존하지 않기로 했기 때문에, 이번에도 라이브러리 없이 첫 번째 방식을 채택하여 사용하였다. 이렇게 직접 작성하여 사용하다보니, 나중에는 꼭 직접 라이브러리를 만들어보고 싶다는 생각이 들기도 했다.

[>> 스택오버플로우 참고](https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript)
