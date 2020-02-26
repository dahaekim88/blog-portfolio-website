---
title: "Javascript - Scope & Closure"
date: 2019-05-03T14:46:00.000Z
tags: ["javascript", "scope", "closure"]
category: blog
open: true
---

<br />

## Scope

---

Scope는 현재 접근 가능한 변수의 유효 범위를 뜻하는 것으로, 함수는 자기만의 고유 scope를 가진다.  
함수가 선언되는(Lexical) 동시에 자신만의 scope가 생성되고, 함수를 호출할 때 선언시 생성된 Lexical Scope를 참조한다. 자바스크립트의 scope는 일반적인 `if`, `for`, `switch` 등의 블럭(`{}`) 에 의해서는 생성되지 않는다.

```js
for (var i = 0; i < 10; i++) {
  var total = (total || 0) + i
  var last = i
  if (total > 20) {
    break
  }
}
// for loop 외부에서도 블럭 내부의 변수에 접근 가능
console.log(total) // output: 21
console.log(last) // output: 6
```

> #### Lexical Scoping 이란?

렉시컬 스코프는 함수를 어디서 호출하는지가 아니라 어디에 선언하였는지에 따라 결정된다.  
함수를 처음 선언하는 순간, 함수 내부에서는 자기 scope로부터 가장 가까운 곳에 있는 변수를 계속 참조하게 된다.

```js
var x = "global"
function foo() {
  var x = "local"
  bar()
}
function bar() {
  console.log(x)
}
foo() // output: global
bar() // output: global
```

<br />

## Execution Context & Scope Chain

---

자바스크립트는 함수의 실행코드 블럭 단위로 context를 콜 스택에 쌓고(push), 함수 실행 후 context를 벗어나면 콜 스택에서 제거(pop)된다. 이때 각각의 실행 코드블럭이 수행되는 시점에서 실행 환경(Execution Context)을 저장하게 되는데 이는 실행 유효범위인 Lexical Scope에 의해 결정된다.

이 scope는 chain 구조로 연결되어 있어 현재 실행 시점 이전의 scope를 타고 올라가는 형태로 참조되기 때문에 현재 scope에 선언되지 않는 객체참조가 가능하다.

<br />

일단 처음 코드를 실행하는 순간 모든 것을 포함하는 `전역 컨텍스트(Global Execution Context)`가 생성되어 페이지가 종료될 때까지 유지되며, 함수를 호출할 때마다 함수의 `로컬 컨텍스트(Local Execution Context)`가 하나씩 더 생성되고 함수 실행이 마무리 되면 사라진다. (단, closure 제외!)

> #### 실행 컨텍스트 내부에 생성되는 것

- `함수 내부에서 사용되는 변수 객체 (arguments, variable)`
- `Scope chain`
- `this`

컨텍스트 생성 후 함수가 실행되면서, 사용되는 변수들은 해당 컨텍스트 내부의 변수객체 안에서 값을 찾고, 없다면 scope chain을 따라 올라가며 찾는다.

```js
var name = "dada"
function say() {
  var name = "nana"
  console.log(name) // 내부 스코프의 name 참조
  hello()
}
function hello() {
  console.log("hello, " + name)
  // 내부 스코프에 name 변수가 없으므로 scope chain을 타고 올라가 전역 컨텍스트에 있는 name 참조
}
say()
// output: nana
// output: hello, dada
```

<br />

## Closure

---

특정 함수가 참조하는 변수들이 선언된 렉시컬 스코프는 계속 유지되는데, 그 함수와 스코프를 묶어서 클로저라고 한다. 즉, 현재의 유효범위를 넘어 scope chain으로 연결되어 있는 객체, 변수 등의 참조를 유지시켜 준다.

클로저는 function 안에 function이 있을 때 생성되는 것으로, 외부함수의 lifecycle이 끝나도 여전히 내부함수는 외부함수의 scope에 접근 가능하다. 내부의 클로저 함수를 리턴하는 함수를 호출할 경우, 매번 새로운 함수가 생성되어 리턴되는 것이므로, 이 때마다 scope chain은 새롭게 할당되어 저장된다.

```js
var makeClosure = function() {
  var name = "dada"
  return function() {
    console.log(name)
  }
}
var closure = makeClosure() // output: function () { console.log(name); }
// makeClosure 함수는 실행 후 해당 context는 사라졌지만,
closure() // output: 'dada';
// 리턴된 클로저 함수는 scope chain이 새로 할당되어, 여전히 makeClosure의 scope에 접근 가능하다.
```

> #### closure는 함수가 정의된 scope 이외의 곳에서 사용될 때 private 저장소처럼 활용 가능하다

- 내부의 function을 리턴하여 다른 곳에서 사용 (바로 호출하던지, 인자로 넘겨주는 등)
- setTimeout(), setInterval() 등과 같이 비동기적으로 호출되는 경우
- 이벤트 핸들러의 콜백 함수로 활용되는 경우 (addEventListener 등)

⇒ 반복적으로 같은 작업을 할 때와 같이 초기화 작업이 필요할 시, 콜백 함수에 동적인 데이터를 넘겨주고 싶을 때 closure를 사용할 수 있다.

<br />

## Scope 관련 이슈 해결

---

```js
for (var i = 0; i < 5; i++) {
  // 5번 반복 후, i = 5
  $("#target" + i).on("click", function() {
    console.log(i) // i는 외부의 i를 참조
  })
}
// output: 5
// output: 5
// output: 5
// output: 5
// output: 5
```

> #### Solution 1: IIFE (Immediately Invoked Function Expression)

IIFE를 통해 함수를 선언하는 동시에 즉시 호출하게 되면, for 구문 블럭에 해당하는 렉시컬 스코프를 생성하게 되어 그 내부의 클로저 함수 내부에 local binding이 형성된다.

```js
for (var i = 0; i < 5; i++) {
  ;(function(j) {
    $("#target" + j).on("click", function() {
      console.log(j)
    })
  })(i)
}
```

> #### Solution 2 : let 키워드

기존의 var 키워드 변수는 함수 단위의 스코프를 따랐으나, let 키워드는 블록 스코프를 사용하기 때문에 for 구문의 블럭이 독립적인 스코프로 작용한다.

```js
for (let i = 0; i < 5; i++) {
  $("#target" + i).on("click", function() {
    console.log(i)
  })
}
```

<br />

#### [Reference]

ECMAScript 표준 문서를 바탕으로 펼치는 속 깊은 자바스크립트 / 양성익 지음
