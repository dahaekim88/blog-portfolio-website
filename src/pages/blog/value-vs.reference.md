---
title: Value vs Reference
date: 2019-03-07T15:00:00.000Z
---
## Javascript data types

* 자바스크립트에는 두 가자의 data type, 즉 primitive type과 reference type이 존재한다.
* 모든 변수는 생성될 때 메모리 상의 특정 공간을 차지하게 되고, 변수가 복사될 때에는 메모리 상의 값이 복사된다.

## Primitive Types (Pass by Value)

![pass-by-value](/assets/pass-by-value.png "pass-by-value")

String, Number, Boolean과 같은 primitive type은 변수에 할당될 때 메모리 상에 고정된 크기로 저장되고 해당 변수가 데이터의 실제 값을 보관한다. 따라서 한 번 값을 생성하고 나면 메모리 영역에서 그 자체의 값 조작이 불가하고, 새로운 값을 카피하여 메모리의 또다른 주소값에 재할당 해야 한다.

* null
* undefined
* Boolean
* Number
* String

```javascript
var x = 2
var y = x
y = 3

console.log(x) // 2
```

## Reference Types (Pass by Reference)

![pass-by-reference](/assets/pass-by-reference.png "pass-by-reference")

Object나 Array 같은 reference type은 크기가 정해져 있지 않고 변수에 할당될 때 값이 직접 저장되는게 아니라, 데이터에 대한 참조만 저장된다. 참조는 데이터의 메모리 주소값이지, 해당 데이터의 실제 값은 아니다.

따라서 object가 담긴 변수를 다른 변수에 재할당 하는 경우에는 참조, 즉 메모리 상의 주소를 복사하여 저장하기 때문에, 동일한 object를 참조하는 두 변수 모두 object 내에서 관리하는 속성의 값이나 상태 조작이 가능하다.

* Array
* Object
* Function

```javascript
var x = { foo: 3 }
var y = x
y.foo = 2

console.log(x.foo) // 2
```

## 추가 예제

ex1)

```javascript
var myArray = [2, 3, 4, 5]
function doStuff(arr) {
  arr[2] = 25 // arr[2]는 myArray[2]를 참조
}
doStuff(myArray)

console.log(myArray) // [2, 3, 25, 5]
```

ex2)

```javascript
var myArray = [2, 3, 4, 5]
function doStuff(arr) {
  arr = [] // arr는 myArray를 가리키지 않고 새 배열 [ ]을 참조
}
doStuff(myArray)

console.log(myArray) // [2, 3, 4, 5]
```

ex3)

```javascript
var player = { score: 3 }
function doStuff(obj) {
  obj = {}
}

player = doStuff(player) // doStuff는 아무것도 리턴하지 않기 때문에 'undefined'
```

<br />
image source: Anthony Alicea — Udemy.com

<br />
<br />
<br />
<br />
