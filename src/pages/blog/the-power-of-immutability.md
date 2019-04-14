---
title: "The Power of Immutable Data (feat. ImmutableJS)"
date: 2019-02-01T22:34:00.000Z
tags: ["facebook", "React", "ImmutableJS", "nested_data", "bug_free"]
category: blog
open: true
---

### Intro

이번 프로젝트에서는 서비스의 특성 상, 장기렌트라는 주제의 하나의 페이지를 메인으로 많은 데이터를 주고 받게 되는데, 그러다보니 이 하나의 컴포넌트 자체의 state가 굉장히 무거워지게 되면서 이를 어떻게 할지에 대한 고민이 많았다.  
state 관리를 위해 redux 또는 mobx와 같은 라이브러리를 쓰려고 하니, 컴포넌트의 depth가 그다지 깊지 않은데다가, 여러 컴포넌트가 한꺼번에 공유하는 state도 딱히 많지 않았던 터라, 그런 라이브러리를 사용하는 것은 이번 프로젝트에는 헤비할 것 같았다.

그래서 1차적으로 생각을 한 것은 그냥 우리끼리 하나의 파일로 별도로 꺼내어 모듈화를 시켜보는 것이었다. 모듈화를 하면서 flat한 상태의 state들을 나름 의미있는 단위들로 나누어 객체로 묶어 주었다.  
그렇게 하다보니 또 nested 된 states를 관리하는 데에 번거로움이 있었기에, 보다 효율적인 코드 작성을 위해 facebook에서 만든 `ImmutableJS`를 사용해보기로 했다.

### The concept of Immutability

**Immutability란 무엇일까?**

우리말로는 불변성, 즉 단순하게 한 번 생성한 후에는 그 값이나 상태를 변경할 수 없는 속성을 의미한다.

이 개념 자체는 일반 자바스크립트에서도 늘 접하고 있던 것인데, 간단하게 다시 한 번 짚고 넘어가자면,  
우선 모든 변수는 생성될 때 메모리 상의 특정 공간을 차지하게 되고, 변수가 복사될 때에는 메모리 상의 값이 복사된다.

- **Immutable Primitive Value**  
  String, Number, Boolean과 같은 `primitive type`은 변수에 할당될 때 메모리 상에 고정된 크기로 저장되고 해당 변수가 데이터의 실제 값을 보관한다. 따라서 한 번 값을 생성하고 나면 메모리 영역에서 그 자체의 값 조작이 불가하고, 새로운 값을 카피하여 메모리의 또다른 주소값에 재할당 해야 하기에 `immutable object`에 속한다.

  <!-- ![pass-by-value](/assets/pass-by-value.png) -->

- **Mutable Object Reference**  
   반면 Object나 Array 같은 `reference type`은 크기가 정해져 있지 않고 변수에 할당될 때 값이 직접 저장되는게 아니라, 데이터에 대한 참조만 저장된다. 참조는 데이터의 메모리 주소값이지, 해당 데이터의 실제 값은 아니다.

  따라서 object가 담긴 변수를 다른 변수에 재할당 하는 경우에는 참조, 즉 메모리 상의 주소를 복사하여 저장하기 때문에, 동일한 object를 참조하는 두 변수 모두 object 내에서 관리하는 속성의 값이나 상태 조작이 가능하기 때문에 `mutable object`로 분류된다.

  즉, 하나의 object를 생성한 후, 그 object를 참조하고 있는 객체에서 특정 프로퍼티에 새로운 값을 할당하면, 참조되어지고 있던 객체의 속성값까지 동일하게 변경되는데, 이유는 두 변수 모두 메모리 상의 동일한 주소값을 참조, 즉 reference가 같기 때문이다.

    <!-- ![pass-by-reference](/assets/pass-by-reference.png) -->

  ![pass-by-value-reference](/assets/pass-by-value-reference.png)
  <br />

**이렇게 mutate가 가능한 object를 사용했을 때 어떤 문제가 발생할 수 있을까?**

![immutability](/assets/immutability.gif)

만약 메모리 상의 어느 주소값에 하나의 객체가 할당되어 있고, 이 객체를 여러 컴포넌트에서 참조하고 있는 경우, 어느 한 컴포넌트에서 이 객체를 직접적으로 mutate 시키면,

기존 객체의 참조를 공유하고 있는 모든 컴포넌트에서 그 영향을 받기 때문에, 다른 컴포넌트에서 변경사실을 모르고 있다면 무언가 예상과는 다른 결과를 내는 side effect를 유발할 수 있다.

<br />

**이러한 이유 때문에 immutability라는 개념은 functional programming의 주요한 핵심 디자인 패턴 중 하나이다.**  
immutability를 유지함으로 인해 의도치 않은 값의 변경이 예방되어 side-effect를 최소화하게 됨으로써 버그가 줄어들고, 값 변경에 대한 추적이 쉬워지기 때문에 결과적으로는 `simpler programming`을 가능하게 해준다.

<br />

### Immutability in React

**immutability라는 개념은 React에서도 매우 중요하게 작용하는데 그 이유는 무엇일까?**

그 이유는 React가 뷰를 렌더링 하는 과정과 연관이 있다. React가 뷰를 렌더링하는 과정을 간략히 그려 본 것이다.

![react-lifecycle](/assets/react-lifecycle.png)

React의 대표적인 특징이자 장점 중 하나가 바로 변화가 발생한 부분만 감지하여 업데이트하고 컴포넌트를 리렌더링 해준다는 것인데, 여기서 바로 immutability가 중요하게 작용한다.

기본적으로 state를 변경하기 위한 setState 메서드를 호출하면 state나 props의 변경 이력을 감지하여 컴포넌트를 업데이트할지 말지를 결정하는 shouldComponentUpdate()가 호출되게 되고, 이 메서드가 true를 리턴하는 경우에만 virtual DOM을 그려준 후 real DOM과 비교를 하여 render 메서드의 호출 여부를 결정하게 된다.

기본적으로 업데이트 여부를 판단해줄 shouldComponentUpdate()가 직접 오버라이드 하지 않는 이상 항상 default 값으로 true를 리턴하기 때문에 값 변경을 위한 setState()가 호출되면 항상 render() 가 호출되는데,

setState에서 mutable object에 대해 직접적으로 값을 변경하게 된다면, 레퍼런스를 참조하고 있는 객체의 프로퍼티나 엘리먼트 값이 달라졌다고 할지라도, 참조하고 있는 레퍼런스는 여전히 동일하기 때문에 의도한 것과는 전혀 다른 결과가 렌더링 되는 부작용이 발생하게 된다.

![state-comparison](/assets/state-comparison.png)

만약 mutable object를 사용하여 직접적인 수정을 하는 경우에는,  
변경 전과 후의 값을 비교하기 위해서는 일일이 object 내부의 값들을 모두 돌면서 deep value comparison을 해야하는데 이는 `O(n)`의 time complexity가 소요된다.
현재 예시의 데이터는 이 정도에 불과하지만, 실제 어플리케이션에서 방대한 양의 데이터를 다루게 되면 충분히 비효율적인 방법이 될 것이다.

하지만 immutable object를 사용한다고 하면,  
값 변화는 항상 동일한 구조의 새로운 오브젝트를 리턴하기 때문에, 이전 state와 변경된 state에 대해 reference가 변경되었는지만 단순히 비교하면 되기 때문에 값 변경에 대한 추적비용이 `O(1)`으로 감소한다.

따라서 React에서는 당연히 자원 낭비를 막기 위해 `reference comparison` 만 이루어지고, 이 때문에 우리는 우리가 변경한 내용이 제대로 반영되어 컴포넌트를 업데이트 시키고 싶다면 immutability를 유지하는 것이 중요하다.

<!-- 최상위 property는 shallow merge가 된다. 최상위 property 까지만 shallow comparison을 한다. -->

<br />

### Immutable Data Patterns

**그렇다면 어떠한 방법으로 immutability를 유지할 수 있을까?**

![deep-copy](/assets/deep-copy.png)

기본적으로는 React 공식문서에서도 나오는 것처럼, 변경이 필요한 경우에는 기존 객체를 직접 변경하지 않고 객체의 참조(shallow copy)가 아닌 객체의 복사(deep copy)를 통해 새로운 객체를 생성 후 변경해야 한다. 이는 자바스크립트의 built-in 메서드를 사용할 수 있다.

<br />

**하지만 이보다 좀더 크고 복잡한 nested object의 경우에는 어떨까?**

앞서 말한 방법들은 최상위 프로퍼티만 copy가 되고, 내부에 있는 object에 대해서는 매번 또다시 `defensive copy`를 해주어야 한다.

따라서 nested되어 있는 특정 프로퍼티의 값 하나를 변경하기 위해서는, nested되는 곳마다 일일이 copy를 해 tedious한 코드들이 반복되어 코드가 복잡하고 지저분해지는 단점이 있다.

```javascript
data = {
  ...data,
  item1: {
    ...item1,
    item2: {
      ...item2,
      key: value,
    },
  },
  list: [...list.slice(0, index)],
}
```

또한 data 전체의 값을 일일이 복사하는 것 자체가 앞서 말한 것처럼 O(n)의 complexity를 가지기 때문에 느리고, 변경된 data structure들을 매번 저장해 두기 위해서는 더 많은 메모리 공간이 필요하므로 time & space 측면 모두에서 `비효율적`이다.

<br />

**그렇다면 immutability를 유지하면서도, 저러한 단점을 극복할 수 있는 방법이 있을까?**

바로 여기서 structural sharing이라는 개념이 도입된다.

![structural-sharing](/assets/structural-sharing.png)

`Structural Sharing` 이란, immutable data 구조를 최적화하기 위해 functional programming language에서 사용되는 테크닉으로, 여기에서는 trie라는 특수한 불변의 자료 구조를 사용한다.

Trie는 하나의 불변 객체를 생성해 놓은 후, 이 오리지널 객체를 지속적으로 재사용함으로써, 특정 값을 업데이트하는 경우 새로 생성된 객체가 오리지널 객체의 구조를 공유하면서(structural sharing), 업데이트에 필요한 속성들만 복사하고, 변경되지 않은 객체의 다른 모든 부분에 대해서는 메모리 위치를 공유하게 된다.

따라서 기존의 모든 값에 대해 일일이 카피하는 것에 비하여, 카피나 비교를 위한 조작이 최소화되기 때문에 time(O(log n)) & space 측면 모두에서 더 효율적이라고 할 수 있다.

<br />

### Immutable JS to the rescue!

바로 이러한 structural sharing을 기반으로 한 immutable data structures를 자바스크립트에서도 사용할 수 있는데, facebook에서 오픈 소스로 개발한 `immutable.js` 가 가장 대표적이다.

이번 프로젝트였던 장기렌탈 웹을 React로 개발하면서, 차량 정보에 대한 수많은 컬렉션 데이터를 받아 state로 가지고 있다보니 state 관리가 쉽지 않았기 때문에, 자체적으로도 이미 functional하게 구성된 react를 좀 더 fully functional 하게 쓰기 위해 immutable.js 를 적용해 보았다.

immutable.js 공식문서를 보면 persistent immutable data structure를 제공한다고 되어 있는데, `immutable`은 지속적으로 설명하고 있듯이 일단 한 번 생성되면 컬렉션은 변경될 수 없다는 것을 의미하고, `persistent`란 원본 컬렉션은 새로운 컬렉션이 생성된 이후에도 여전히 유효하며, 지속적으로 재사용이 가능하다는 것을 의미한다.

따라서 Immutable JS가 제공하는 컬렉션을 사용함으로써, 이 객체는 어디서도 mutate가 되지 않는, 아니 될 수 없다는 전제 조건이 붙기 때문에, 이를 통해 “Think less and write more descriptive code” 가 실제로 가능해진다.

![immutable-js](/assets/immutable-js.png)

우선 immutable JS에서 제공해주는 data structures에는 List , Stack, Map , OrderedMap , Set , OrderedSet and Record가 있는데, 이들은 모두 값에 대한 직접적인 조작이 아닌, 오로지 `getter`와 `setter` 메서드를 통해서만 조작이 가능하다. 이러한 점은 자바의 encapsulation과 유사하다고 느꼈다.

이 중에서도 가장 대표적으로 많이 사용되는 Data Structure가 바로 `List`와 `Map`이다.

List는 자바스크립트의 array가 List로 변환되며, Map은 key-value 형태의 hash map 구조로 자바스크립트의 object가 Map으로 변환된다.

하지만 나는 흔히들 사용하는 Map 대신 `Record`를 사용하였는데, 공식문서에도 Record가 가장 JS object와 유사하다고 적혀있고, 특히 이번 프로젝트에 적용하였던 타입스크립트와 함께 사용하는데 더욱 유용하였다.

Record는 생성시 정의된 프로퍼티가 고정되어 새로운 key값을 추가할 수 없으며, 속성 타입이 고정되어 있기 때문에 값을 저장하거나 불러올때 해당 record의 키 값에 대한 auto complete도 가능하다.

항상 모든 key에 대한 default value를 갖기 때문에 간단한 api 메서드를 이용하여 간편하게 default 값으로 초기화 할 수 있다는 장점 또한 있었다.

<br />

**그럼 ImmutableJS를 실제로 코드에 어떻게 적용할까?**

- **No defensive copying**

  **[기존]** object type의 state들을 spread properties를 사용하여 일일이 defensive copy를 해주어야 하기 때문에, tidious한 코드가 반복적으로 들어가며, 값 초기화를 위한 코드가 많이 들어가 매우 번거롭고 비효율적이다. 특히, 다양한 렌탈 조건을 클릭할 때마다 기존에 선택했던 조건을 초기화시키는 기능이 있는데, 그를 구현하기 위해 state를 default 값으로 바꿔줄 굉장히 긴 코드를 작성해야만 했다.
  ![no-defensive-copy-before](/assets/no-defensive-copy-before.png)

  **[변경]** 직접적으로 바로 해당 property에 접근하여 변경 가능하기 때문에, 쓸데없는 defensive copying 필요 없어져 훨씬 간결하고 직관적인 코드를 작성할 수 있다.  
  defensive copy 대신 `set()` 메서드를 이용하여 바로 값을 변경하고, `chaining`까지 할 수 있다.
  또한 가장 마음에 들었던 점은 Record의 `remove()` api를 통해 굉장히 간결하게 default 값으로 초기화할 수 있었다.
  ![no-defensive-copy-after](/assets/no-defensive-copy-after.png)

- **Nested collections**

  **[기존]** array of object 내의 특정 element를 변경하려는 경우에는 일일이 element를 하나씩 돌면서 찾고, 그 이후에 또 `Object.assign()`을 사용한 deep copy로 변경을 해주었다.

  **[변경]** `setIn()`을 이용하여 한번에 바로 원하는 index와 property에 직접 접근하여 변경 가능하다.
  ![nested-collections](/assets/nested-collections.png)

- **Dynamic properties**

  dynamic하게 property 값을 정해주고 싶을 때 사용한 computed property의 경우, 파라미터로 string만 받을 수 있는 set() 메서드를 사용할 수 없기 때문에, plain object를 파리미터로 받을 수 있는 `merge({ key: value })` api를 사용하여 computed property의 값을 변경해 줄 수 있다.
  ![dynamic-properties](/assets/dynamic-properties.png)

### Conclusion

엄청나게 많은 양의 데이터를 다룬 것은 아니었기 때문에, 이번 프로젝트에서 직접적인 성능 향상을 체감한 것은 아니지만, 향후 데이터의 양이 점점 증가할 것을 고려하면 immutable data structure를 적용하는 것이 좋을 것 같다.

이번 프로젝트에서는 컴포넌트의 depth가 깊지도 않고, 많은 컴포넌트에서 동일한 state를 공유하는 경우가 거의 없었기 때문에 redux를 쓰지 않았지만, 만약 redux를 함께 사용하는 경우라면, 하나의 store를 통해 여러 state가 곳곳의 component에서 공유되고 있다면, immutable js가 더욱 큰 역할을 할 것 같다.

<br />

### Reference

- [>> [Docs] Facebook ImmutableJS Documentation](https://facebook.github.io/immutable-js/)
- [>> [Docs] React Optimizing performance - Using immutable data structures](https://reactjs.org/docs/optimizing-performance.html#using-immutable-data-structures)
- [>> [Blog] Immutability in programming](https://medium.com/@yej.arin.choi/this-is-a-post-that-summarizes-my-dive-into-immutability-in-programming-what-it-is-why-its-34cbba44f889)
- [>> [Blog] Why concept of immutability is so damn important for a beginner front end developer](https://itnext.io/why-concept-of-immutability-is-so-damn-important-for-a-beginner-front-end-developer-8da85b565c8e)
- [>> [Blog] Objects should be immutable](https://www.yegor256.com/2014/06/09/objects-should-be-immutable.html)
