---
title: "React Hooks - UseEffect 안에서의 데이터 페칭"
date: 2019-07-21T19:56:00.000Z
tags: ["react", "react-hooks", "useEffect"]
category: blog
open: true
---

<br />

## React Hooks

---

기존의 리액트 컴포넌트에서는 state 및 lifecycle API를 사용하려면 클래스를 기반으로 작성을 해야했다.
Hooks는 클래스 없이 함수형 컴포넌트에서도 state를 사용할 수 있게 해 줌으로써, `Function Component`와 `Stateless Component`는 더 이상 동일한 개념으로 볼 수 없다.

<br />

## 함수형 컴포넌트에서 state 사용하기 - useState

---

Hooks로 state를 사용하는 방법은 클래스 컴포넌트에서의 사용방법보다 훨씬 간결하고 명확하다.  
번잡스러운 contructor나 `this.state` 또는 `this.setState()` 대신, 다음과 같은 형태로 사용이 가능하다.

```js
const ["state 변수명", "setState 함수명"] = useState("state 초기값")
```

```js
const [loading, setLoading] = useState(false)
const [list, setList] = useState([])
```

<br />

## 함수형 컴포넌트에서 lifecycle 사용하기 - useEffect

---

기본적인 effect hook은 컴포넌트가 렌더링 될 때마다 호출된다. 즉 처음 컴포넌트가 렌더링 될 때(componentDidMount) 그리고 컴포넌트가 업데이트 될 때(componentDidUpdate) 모두 호출된다. 여기에 추가로 이벤트리스너나 subscription 등을 설정했다가 해제해야 하는 경우, 컴포넌트가 언마운트 될 때(componentWillUnmount) effect hook이 리턴해 준 clean up function을 호출할 수 있다.  
따라서 즉 effect hook은 기존 라이프사이클의 `componentDidMount + componentDidUpdate + componentWillUnmount`를 모두 합쳐놓은 셈이다.

이렇게 컴포넌트 내에서 주로 이뤄지는 이벤트 핸들링에 따른 DOM 조작 또는 데이터 페칭 등의 작업들이 `side effect`에 해당하는데, 이러한 effect들을 컴포넌트 내에서 실행할 수 있게 해주는 역할을 한다.

> ### useEffect에서 데이터 페칭하기

프로젝트에 처음 Hooks를 도입하면서 useEffect로 데이터 페칭을 할 때, 단순하게 componentDidMount()를 사용할 때와 마찬가지로 작성을 하면 되는 줄 알고 다음과 같이 작성을 했더니 무한루프에 빠지는 문제가 발생했다.

```js
useEffect(async () => {
  setLoading(true)
  const result = await axios.get(`${SERVER_URL}/mypage/courses`, config)
  const courseData = result.data.courses.map(course => course.study_id)
  setList(courseData)
  setLoading(false)
})
```

> ### useEffect의 두 번째 파라미터의 역할?

앞서 말했듯이 effect hook은 컴포넌트가 마운트될 때 뿐만 아니라 업데이트 될 때도 호출된다. useEffect에서 데이터를 페치한 다음 그 데이터로 state를 변경하기 때문에, 컴포넌트는 업데이트가 되고 effect 또한 다시 실행된다. 그럼 또 다시 데이터를 페치하고, 또 컴포넌트 업데이트, 또 다시 데이터 페치...와 같은 무한루프에 빠지고 마는 것이다.

우리가 원하는 것은 componentDidMount처럼 오직 컴포넌트가 마운트 되었을 때에만 데이터를 페치하고 싶다. 이 때 바로 useEffect의 두 번째 인자에 빈 배열(`[]`)을 넣어줌으로써 원치 않는 컴포넌트의 업데이트를 방지할 수 있다.

useEffect의 두 번째 인자로 props나 state의 값들의 배열을 받는데, 이렇게 넘겨준 특정 값들이 변경된 경우에만 effect hook이 호출된다. 따라서 빈 배열을 넣어주면 업데이트를 감시할 값이 없기 때문에 컴포넌트가 마운트 되었을 때에만 effect hook이 호출될 수 있다.

```js{6}
useEffect(async () => {
  setLoading(true)
  const result = await axios.get(`${SERVER_URL}/mypage/courses`, config)
  const courseData = result.data.courses.map(course => course.study_id)
  setList(courseData)
  setLoading(false)
}, [])
```

> ### useEffect에 직접적으로 async를 쓰면 안 되는 이유?

이제 무한루프의 문제는 해결했으나, 개발자 도구 콘솔에 다음과 같은 경고문이 떴다.

`Warning: useEffect function must return a cleanup function or nothing. Promises and useEffect(async () => ...) are not supported, but you can call an async function inside an effect..`

useEffect는 cleanup function 외에는 아무것도 리턴하면 안 되는 것이 원칙인데, async 함수는 기본적으로 항상 promise를 리턴하기 때문이다.  
그러므로 useEffect 함수에 직접적으로 async를 쓰는 것은 허용되지 않으며, effect 내부에서 async를 사용하도록 다음과 같이 코드를 변경해주어야 한다.

```js
useEffect(() => {
  setLoading(true)

  const fetchData = async () => {
    const result = await axios.get(`${SERVER_URL}/mypage/courses`, config)
    const courseData = result.data.courses.map(course => course.study_id)
    setList(courseData)
    setLoading(false)
  }

  fetchData()
}, [])
```

<br />

#### [Reference]

https://reactjs.org/docs/hooks-effect.html  
https://www.robinwieruch.de/react-hooks-fetch-data
