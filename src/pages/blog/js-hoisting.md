---
title: "Javascript - Hoisting"
date: 2019-05-11T15:23:00.000Z
tags: ["javascript", "hoisting"]
category: blog
open: true
---

<br />

## 호이스팅 (Hoisting)

---

호이스팅이란, 변수를 선언하고 초기화(할당)했을 때, 함수 내에서 정의된 경우 선언 부분이 함수의 최상위로, 함수 외부에서 정의된 경우 전역 컨텍스트의 최상단으로 끌어 올려지는 현상을 의미한다.

```js
console.log(me) // undefined
sayHi() // 'hi'

var me = "dada"
function sayHi() {
  console.log("hi")
}
```

위 코드는 아래 코드와 동일하다

```js
var me
function sayHi() {
  console.log("hi")
}

console.log(me) // undefined
sayHi() // 'hi'
me = "dada"
```

호이스팅은 함수 선언식에만 해당되고 함수 표현식에는 해당하지 않는다.

```js
sayHi() // TypeError: sayHi is not a function

var sayHi = function() {
  console.log("hi")
}
```

호이스트 된 경우, 함수 선언은 변수 선언을 덮어 쓴다.

```js
var myName // undefined
function myName() {
  console.log("dada")
}

console.log(typeof myName) // function
```

하지만, 변수에 값이 할당될 경우에는 반대로 변수가 함수선언을 덮어 쓴다.

```js
var myName = "dada"
function myName() {
  console.log("dada")
}

console.log(typeof myName) // string
```

<br />

## 익명함수와 선언적함수의 차이

---

> #### 익명함수 (함수 표현식)

자바스크립트에서의 함수는 first-class object로, 즉 함수도 하나의 값처럼 취급된다. 따라서 함수도 숫자나 문자열처럼 변수에 할당하는 것이 가능하다.  
익명함수는 말 그대로 이름이 없으므로 변수에 넣어 사용해야 한다.  
또한 익명함수는 먼저 선언한 후에만 호출이 가능하기 때문에 호출하는 문장이 만드시 선언된 문장 뒤에 나와야 한다.

> #### 선언적 함수 (함수 선언식)

선언적 함수를 호출할 땐 함수가 선언된 문장 전에도 가능하다. 호출하는 문장이 선언적 함수의 앞이든 뒤이든 어디든지 써도 상관없다.  
선언적 함수인 경우, 스크립트 태그를 실행하기 전 가장 먼저 읽기 때문에, 글로벌 영역에 먼저 등록 되어 런타임 전에 이미 함수 정보가 등록되는, 즉 함수의 호이스팅이 가능해진다.

<br />

## 익명함수(anonymous function) 사용법

---

앞서 말했듯이 익명함수의 사용은 함수 선언이 아닌 함수표현식을 이용하는 방법이다. 이는 곧 `람다함수`(함수 리터럴을 변수에 할당하는 방식)와 `즉시실행구문`(IIFE, Immediately Invoked Function Expression)을 만들어 낼수 있다는 말이다.

```js
// i 라는 변수는 실행 시점에서만 사용되면 외부에서 접근 할수 없다.
;(function() {
  var i = "hello world"
})()

console.log(i) // ReferenceError: i is not defined
```

이처럼 즉시실행 구문을 사용하면 자바스크립트가 유효범위를 선언할 수 없다고 해도 강제적으로 private 변수를 만들어 내는 것이 가능하다. 즉, 익명함수는 동적으로 할당되는 유효범위를 가지기 때문에 javascript 내에서 강제적인 유효범위 설정을 하는 경우 사용된다.
