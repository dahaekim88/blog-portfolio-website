---
title: "Javascript - Callback, Promises, Async & Await"
date: 2019-05-18T14:45:00.000Z
tags: ["javascript", "promises", "async"]
category: blog
open: true
---

<br />

## Asynchronous Javascript

---

자바스크립트는 싱글 쓰레드 프로그래밍 언어이기 때문에 비동기 처리가 필수적이다. 비동기 처리 방식은 대개 프로그램의 성능과 응답성을 높이는 데에 도움을 주지만, 비동기 처리로 인해 코드가 실제로 실행되는 순서가 뒤죽박죽이 되기 때문에, 코드의 가독성이 떨어지고 디버깅을 어렵게 만든다는 단점이 있을 뿐만 아니라, 비동기 처리의 결과가 언제 반환될지 알 수 없기 때문에 동기식으로 처리하는 기법들이 사용되어야 한다. 이에 가장 대표적인 기법 세 가지를 정리해보고자 한다.

<br />

## Callback

---

콜백은 다른 함수의 인자(arguments)로서 넘겨주는 함수를 의미하는데, 다음과 같은 예제를 통해 비동기 처리를 위한 콜백 함수의 작성법을 이해할 수 있다.

```js
function printString(string, callback){
  setTimeout(
    () => {
      console.log(string)
      callback()
    }, 
    Math.floor(Math.random() * 100) + 1
  )
}
```

```js
function printAll(){
  printString("A", () => {
    printString("B", () => {
      printString("C", () => {})
    })
  })
}

printAll()
```

코드를 보면 알 수 있지만, 콜백 내부에 또 다른 콜백으로 네스팅이 가능한데, 이게 더욱 깊어지다 보면 `Callback Hell`이라는 이름의 가독성 떨어지는 복잡한 코드를 보게 된다.

> #### Pros

1. 단일 비동기 오퍼레이션에 적합
2. 데이터 및 에러 컨트롤 용이

> #### Cons

1. 다중 오퍼레이션의 경우, 깊숙히 nested 되어 'Callback Hell'의 결과를 가져올 수 있다
2. 각 오퍼레이션마다 에러 핸들링이 처리되어야 한다

<br />

## Promises

---

이러한 네스팅 문제를 처리하기 위해 나온 것이 바로 Promises이다.

우선, 프로미스 객체는 다음과 같이 생성할 수 있다.

- `new Promise()` 생성자 함수 → resolve, reject 두 함수를 인자로 받는 콜백함수를 인자로 받음
- `Promise.resolve()` → 바로 resolve한 value 값을 가지는 promise 객체 생성

프로미스 객체 생성 시 내부의 함수가 모두 실행되기 때문에, 주로 생성한 객체를 리턴해 주는 함수로 한 번 감싸주는 형태로 작성한다.

<br />

Promise 객체의 상태는 다음과 같이 세 가지가 있다.

- `pending`
- `fulfilled`
- `rejected`

처음 객체를 생성 시 `pending` 상태로 생성되었다가 비동기 처리가 모두 끝나면 `fulfilled` 또는 `rejected` 상태가 된다. 제대로 처리가 된 경우(fulfilled)에는 그 값을 resolve 하고, 에러가 발생한 경우(rejected) 그 에러 자체를 reject 한다.

<br />

resolve() or reject()로 처리된 데이터는 promise API의 `.then()` 에서 받아서 사용할 수 있다. `then()` 은 두 개의 파라미터를 넘겨받는데, 첫 번째는 resolve 되었을 때 실행할 콜백함수, 두 번째로는 reject 되었을 때 실행할 콜백함수이다. 하지만 주로 promise API의 `.catch()` 를 사용하여 주로 에러 핸들링을 하기 때문에 두 번째 파라미터는 잘 사용하지 않는다.

따라서 `resolve` 되었을 때는 `.then()` 에서 resolve 된 데이터를 받아서 사용하고, `reject`가 되었을 때에는 reject한 데이터가 에러 객체이기 때문에 해당 에러 객체를 `.catch()` 에서 받아서 사용할 수 있다. (ex. 에러 객체를 콘솔로 찍어보는 등)

<br />

이러한 프로미스를 이용하여 비동기 처리를 하려면, 우선 프로미스 객체로 함수를 감싸줘야 한다.

```js
function printString(string){
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
       console.log(string)
       resolve()
      }, 
     Math.floor(Math.random() * 100) + 1
    )
  })
}
```

그런 다음, Promise Chain을 통해 다음과 같이 작성할 수 있다. 함수의 리턴값인 프로미스 객체를 `then()` 체이닝을 통해 계속 그 다음 함수로 넘겨줄 수 있다.

```js
function printAll(){
  printString("A")
  .then(() => printString("B"))
  .then(() => printString("C"))
}

printAll()
```

> #### Pros

1. chaining 가능
2. 하나의 에러 핸들러로 예외 처리 가능 → 체인된 promise 중 하나라도 에러가 나면, 가장 마지막 `catch` 블럭에서 모두 처리

> #### Cons

1. 체인된 함수의 스코프는 각 함수별로 독립적이다. 따라서 첫번째 체인 블럭에서 resolved된 데이터를 네번째 체인 블럭에서 직접적으로 사용할 수 없다. (global let variable 사용하여야 함)

<br />

## Async & Await

---

async, await은 ES8(ECMAScript2017)의 공식 스펙으로 비교적 최근에 정의된 문법으로, 이를 사용하면 비동기 코드를 마치 동기적인 것처럼 다뤄 비교적 쉽고 명확하게 코드를 작성할 수 있다. 

```js
async function printAll(){
  await printString("A")
  await printString("B")
  await printString("C")
}

printAll()
```

> #### Pros

1. 가독성 좋은 간결한 코드 작성 가능
2. resolved된 데이터들이 `try` 블럭 안에서 한 번에 모두 접근 가능
3. 블럭 전체가 마치 동기적으로 실행되는 것처럼 다룰 수 있다!!!
4. `try ~ catch` 구문을 사용하여, `catch` 블럭에서 하나의 통합된 에러 핸들링 가능

> #### Cons

1. Node 버전 8+ 부터 내장되어 있어, 오래된 버전에서는 transpiler 필요
2. `async/await`를 `promise` constructor 안에 작성하는 것은 anti-pattern이다

<br />

#### [Reference]

https://medium.com/front-end-weekly/callbacks-promises-and-async-await-ad4756e01d90 - 예제 코드 참고