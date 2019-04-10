---
title: "첫 리액트 프로젝트의 기록 (2)"
date: 2019-01-15T20:47:00.000Z
tags: ["team-project", "back-end"]
category: blog
open: true
---

### Create-react-app 에서 환경변수 사용하기

첫 번째 팀프로젝트 할 때에는 백엔드를 담당했어서, NodeJS에서 dotenv 라이브러리를 이용하여 환경변수를 설정하여 사용하였다.
프론트엔드에서도 dev 환경이나 production 환경이냐에 따라 데이터를 요청할 서버의 URL이 달라지는 등 환경변수를 설정하고 하는 편이 훨씬 편리할 것 같아, Create-react-app에서 환경변수 설정하는 법을 찾아보니 이미 어느 정도 셋팅이 되어 있어 매우 간단하게 설정이 가능했다.

우선 Create-react-app은 내장 환경변수 `NODE_ENV`를 제공해준다. 이는 이미 내부적으로 각 스크립트별 설정이 되어 있기 때문에, 절대 임의로 override 해선 안 된다.

```json
"scripts": {
    "start": "react-scripts start", // NODE_ENV=development
    "build": "react-scripts build", // NODE_ENV=production
    "test": "react-scripts test", // NODE_ENV=test
    // ...생략
  },
```

<br />

**그렇다면 커스텀 환경변수 설정은 어떻게 해야할까?**

커스텀 환경변수의 설정은 `1) shell`을 통해서도 가능하고, 프로젝트 루트 디렉토리에 `2) .env 파일`을 만들기만 해도 된다. 하지만 이 경우에는 **오로지 `REACT_APP_` 으로 시작하는 환경변수만 import 가능**하다.

**1. shell**  
우선 shell에서 환경변수를 설정하는 방법은 말 그대로 shell command를 칠 때 그 앞에 환경변수를 별도로 선언해주기만 하면 된다. 하지만 이는 일회성이기 때문에 매번 shell command를 칠 때마다 작성을 해줘야 하는 불편함이 있다.

```shell
REACT_APP_API_URL=http://localhost:5000 npm start
```

따라서 이는 scripts에 미리 작성을 해 둠으로써 번거로움을 제거할 수 있다.

```json
"scripts": {
    "start": "REACT_APP_API_URL=http://localhost:5000 react-scripts start",
    "build": "REACT_APP_API_URL='' react-scripts build",
    "test": "react-scripts test",
    // ...생략
  },
```

**2. .env**  
다수의 환경변수를 설정해야 할 때에는 루트 디렉토리의 .env 파일을 통해 한 눈에 보기 쉽게 선언할 수 있다. 이 또한 파일명을 통해 NODE_ENV에 따라 각각 작성이 가능하다.

```text
// .env.development
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SECRET_CODE=1234

// .env.production
REACT_APP_API_URL=''
REACT_APP_SECRET_CODE=abcd
```

### setState() 비동기

`setState()`는 비동기이기 때문에, 항상 컴포넌트를 즉시 업데이트 시키진 않는다. 따라서 `this.state`를 setState() 호출 직후에 확인한다고 해서 바로 반영이 되어 있지 않을 수 있다. 따라서 해당 state를 업데이트 한 직후, 바로 해당 값을 통해 무언가를 하려고 한다면 `componentDidUpdate()` 또는 `setState()의 callback`을 사용해야 업데이트가 반영된 후가 보장이 된다.

또한 `setState()`는 shouldComponentUpdate()가 false를 리턴하지 않는 이상 무조건! 항상! re-render하게 되어있다. 따라서 setState()를 너무 많은 곳에서 호출하고 있다면 하나의 컴포넌트에서 불필요한 re-rendering이 발생할 수 있다. 이에 대한 해결 방법은 아래에서 다시 설명하겠다.

### nested states 관리

이번 프로젝트에서는 서비스의 특성 상, 장기렌트라는 주제의 하나의 페이지를 메인으로 많은 데이터를 주고 받게 되는데, 그러다보니 이 하나의 컴포넌트 자체의 state가 굉장히 무거워지게 되면서 이를 어떻게 할지에 대한 고민이 많았다.

state 관리를 위해 redux 또는 mobx와 같은 라이브러리를 쓰려고 하니, 컴포넌트의 depth가 그다지 깊지 않은데다가, 여러 컴포넌트가 동시에 공유하는 state도 딱히 많지 않았던 터라, 그런 라이브러리를 사용하는 것은 이번 프로젝트에는 heavy할 것 같았다.

그래서 1차적으로 생각을 한 것은 그냥 우리끼리 하나의 파일로 별도로 꺼내어 모듈화를 시켜보는 것이었다. 모듈화를 하면서 flat한 상태의 state들을 나름 의미있는 단위들로 나누어 객체로 묶어 주었다.

그렇게 하다보니 또 nested 된 states를 관리하는 데에 번거로움이 있었기에, 보다 효율적인 코드 작성을 위해 facebook에서 만든 또 하나의 작품인 ImmutableJS를 사용하는 단계까지 나아갔다. 이에 관련된 내용은 좀 더 구체적으로 다음 포스트에 작성할 예정이다.

### 컴포넌트 최적화

우선 화면에 당장 보여지는 것에만 집중하며 정신없이 작업을 하다보면, 어느 샌가 컴포넌트가 한 번에 두 세 번씩 re-rendering 되고 있다는 것을 깨닫게 되는 순간이 있다. 앞서 언급했듯이, 아마도 별 생각없이 이곳 저곳에서 `setState()`가 남용되고 있지는 않은지 반드시 확인을 해봐야 한다.

따라서 늘 UI가 어느 정도 완성이 된 후에는 반드시 리팩토링 과정을 통해 컴포넌트 최적화에 신경써야 한다. 우선 나 또한 가장 컴포넌트가 많고, 서버로부터 데이터를 자주 주고 받는 메인 컴포넌트에서 re-rendering이 두 번 이상 발생하고 있었기에 디버깅을 통해 리팩토링을 하여 한 번만 렌더링이 될 수 있도록 처리하였다.

<br />

우선, 정확한 re-rendering 횟수와 원인을 체크하기 위해 VS Code 에디터의 chrome debugging 툴을 이용하여 확인하였다.

그 결과 re-rendering이 발생한 이유는 다음과 같았다.

- `<li>` 태그와 그 자식태그인 `<input type="radio"/>` 태그에 각각 따로 이벤트 핸들러를 걸어놓고 있었다.
- 그 이벤트 핸들러 내의 setState()로 인해 클릭될 때마다 매 번 렌더링이 두 번 되고 있었다.
- 또한 setState()로 state가 변경될 때마다 해당 컴포넌트 뿐만 아니라, 그 밑의 자식 컴포넌트들까지 모두 re-rendering 되기 때문에 setState()는 하나의 이벤트에서 한 번만 실행이 될 수 있도록 해야 한다.

이 문제들을 모두 해결한 후, 좀 더 나은 컴포넌트 최적화를 위해 `shouldComponentUpdate()`를 사용하여 conditional rendering 조건을 추가해주었다. 더 나은 UX를 위해서 항상 성능 최적화에 신경써야 한다는 것을 다시 한 번 절감했다.

```javascript
shouldComponentUpdate(nextProps) {
  return nextProps.listClicked !== this.props.listClicked;
}
```
