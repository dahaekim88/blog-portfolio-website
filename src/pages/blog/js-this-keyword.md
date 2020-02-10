---
title: "Javascript - 'this' 키워드"
date: 2019-05-06T16:34:00.000Z
tags: ["javascript", "this", "context"]
category: blog
open: true
---

<br />

## 'this' keyword

---

모든 함수의 scope 내에서 자동으로 설정되는 특수한 식별자로, 함수가 실행되는 동안 이용할 수 있다.

자바스크립트의 경우 Java와 같이 `this`에 바인딩되는 객체는 한 가지가 아니라, 함수 호출 방식에 의해 this에 바인딩할 객체가 `동적으로 결정`된다. 다시 말해, 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, `함수를 호출할 때` 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.

<br />

_참고로, 함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프(Lexical scope)는 함수를 선언할 때 결정된다. this 바인딩과 혼동하지 않도록 주의할 것!_

<br />

## Execution Context

---

일단 처음 브라우저가 스크립트를 로딩하여 코드를 실행하는 순간, Global memory 및 Global execution context가 생성되고, 함수 호출 시마다 Local memory(`Lexical scope에 의존`) 및 Local execution context가 하나씩 더 생성되며 call stack에 push 된다.  
함수 실행이 마무리 되면 call stack에서 pop되고, Local execution context도 사라진다. (단, closure 제외) 마지막으로 페이지가 종료시, Global execution context가 사라진다.

```js
var name = "dada"
function hey(word) {
  console.log(word + " " + name)
}
function say() {
  var name = "nana"
  console.log(name)
  hey("hello")
}
say()
// output: nana
// output: hello dada
```

> #### Global Execution Context

```js
'global context' = {
    variableObject: {
        arguments: null,
        variables: ['name', 'hey', 'say']
    },
    scopeChain: ['global scope'],
    this: window
}
```

> #### Local Execution Context

```js
'say context' = {
    variableObject: {
        arguments: null,
        variables: ['name']
    },
    scopeChain: ['say local scope', 'global scope'],
    this: window
}
```

```js
'hey context' = {
    variableObject: {
        arguments: [{word: 'hello'}],
        variable: null
    },
    scopeChain: ['hey local scope', 'global scope'],
    this: window
}
```

<br />

## 5 Patterns of Binding 'this'

---

`this` 키워드는 이처럼 실행 컨텍스트의 구성요소 중 하나로, 함수가 실행되는 동안 이용할 수 있다. 실행 컨텍스트에 바인딩 되는 `this`의 패턴은 다음과 같다.

#### 1. Global Reference: `window`

#### 2. Function Invocation: `window`

기본적으로 this는 전역객체(Global object = window)에 바인딩된다. 전역함수는 물론 심지어 내부함수의 경우도 this는 외부함수가 아닌 전역객체에 바인딩된다. 메소드의 내부함수 및 콜백함수를 비롯한 모든 closure는 생성될 때마다 모두 전역객체에 바인딩된다.

```js
var name = "Global Variable"
console.log(this.name) // "Global Variable"

function foo() {
  console.log(this.name)
}
foo() // "Global Variable"

function outer() {
  function inner() {
    console.log(this.name)
  }
  inner()
}
outer() // "Global Variable"

function outer2() {
  var closure = function() {
    console.log(this.name)
  }
  return closure
}
outer2()() // "Global Variable"
```

#### 3. Method Invocation: `부모 object`

```js
var counter = {
  val: 0,
  increment: function() {
    this.val += 1
  },
}

counter.increment()
console.log(counter.val) // 1
counter["increment"]()
console.log(counter.val) // 2

var obj = {
  fn: function(a, b) {
    return this
  },
}
var obj2 = {
  method: obj.fn,
}

console.log(obj2.method() === obj2) // true
console.log(obj.fn() === obj) // true
```

참고로 모든 function은 내부적으로 `window.function()`으로 invoked 되기 때문에, function invocation도 method invocation과 마찬가지로 부모객체를 가리키는 것과 같다고 볼 수 있다.

```js
var obj = {
  foo: function() {
    console.log(this)
  },
}

var fn = obj.foo
fn() // window
// 내부적으로 window.fn()으로 실행
```

#### 4. Construction mode: `새로 생성된 인스턴스`

new 연산자로 생성된 function 영역의 this는 새로 생성된 인스턴스와 바인딩되며, this에 할당된 변수는 `인스턴스명.변수명` 형태로 접근이 가능하다.

```js
function F(v) {
  this.val = v
}

var f = new F("WooHoo!")

console.log(f.val) // WooHoo!
console.log(val) // ReferenceError: val is not defined
```

#### 5. call() or apply() Invocation: `첫번째 인자`로 명시된 객체

```js
var add = function(x, y) {
  this.val = x + y
}

var obj = {
  val: 0,
}

add.apply(obj, [2, 8])
console.log(obj.val) // 10
add.call(obj, 2, 8)
console.log(obj.val) // 10
```

<br />

## Binding Problem

---

function invocation의 this는 항상 `window`를 가리키기 때문에, callback function 적용 시 binding problem이 발생할 수 있다.

> #### `setTimeout()`은 항상 window를 바인딩한다

```js
function getSalaryFromServer(callback) {
  setTimeout(function() {
    callback(10000)
  }, 1000)
}

function member() {
  return {
    first: "Rachel",
    last: "Green",
    age: 30,
    printDetail: function() {
      getSalaryFromServer(function(salary) {
        console.log(`Name: ${this.first} ${this.last}`)
        console.log(`Salary: ${salary}`)
      })
    },
  }
}

var rachel = new member()
rachel.printDetail()
// Name: undefined undefined
// Salary: 10000
```

> #### Solution 1. Use `bind()`

- `bind(this)` : this를 바인딩 한 function을 리턴
- `call(this)` : 리턴값이 없고, this를 바인딩 후 바로 실행

```js
function member() {
  return {
    first: "Rachel",
    last: "Green",
    age: 30,
    printDetail: function() {
      getSalaryFromServer(
        function(salary) {
          console.log(`Name: ${this.first} ${this.last}`)
          console.log(`Salary: ${salary}`)
        }.bind(this)
      ) // this와 바인딩을 한 함수를 리턴
    },
  }
}

var rachel = new member()
rachel.printDetail()
// Name: Rachel Green
// Salary: 10000
```

> #### Solution 2. Use `Arrow Function`

ES6의 `arrow function`은 lexical scoping을 사용하기 때문에, 즉 자신만의 this를 생성하지 않고 자신을 포함하고 있는 상위 context의 this를 이어받기 때문에 따로 binding을 명시적으로 해주지 않아도 된다.

```js
function member() {
  return {
    first: "Rachel",
    last: "Green",
    age: 30,
    printDetail: function() {
      getSalaryFromServer(salary => {
        console.log(`Name: ${this.first} ${this.last}`)
        console.log(`Salary: ${salary}`)
      })
    },
  }
}

var rachel = new member()
rachel.printDetail()
// Name: Rachel Green
// Salary: 10000
```

<br />

실제로 프로젝트를 진행하다가, binding problem에 부딪혔을 때 `bind()`를 이용해 해결한 경험이 있다.  
Vue 컴포넌트 내부의 mounted 메서드 내부에 마우스를 스크롤했을 때 데이터를 더 로딩하도록 하는 이벤트 핸들러를 추가하고자 하였다. 컴포넌트의 data 및 method에 접근을 하려고 `this`를 사용하였으나, this binding이 컴포넌트가 아닌 이벤트 타겟인 `$(window)`에 바인딩 되어 있어 계속 ReferenceError가 발생하였다. 따라서 컴포넌트를 가리키는 `this`를 bind의 인자로 넣어줌으로써, 문제를 해결할 수 있었다.

```js
// Vue.js

export default {
  data() {
    return {
      isLoading: true,
      instaFeed: {},
      after: '',
    };
  },

  mounted: function() {
    $(window).on("scroll", function() {
      if(($(window).scrollTop() === $(document).height() - $(window).height()) && !this.isLoading) {
        this.fetchFeeds(this.after); // this binding을 해주지 않으면 this가 window를 가리키므로 에러 발생
      }
    }.bind(this));
  },

  methods: {
    fetchFeeds: function(after) {
      this.loading = true;
      // ...생략
    },
}
```
