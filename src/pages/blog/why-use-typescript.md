---
title: "우리는 왜 타입스크립트를 선택했을까?"
date: 2019-01-19T21:22:00.000Z
tags: ["typescript", "type-check", "interface", "tsconfig"]
category: blog
open: true
---

### Intro

이번 프로젝트에서는 React도 처음이었지만, 함께 쓰면 더욱 좋다는 Typescript도 함께 적용해보았다. 물론 처음에는 짧은 생각에 learning curve 때문에, 혹은 더 많은 코드를 작성해야 해서 개발 속도가 나지 않을까 우려를 하기도 했지만, 오히려 사용을 하면 할수록 적용하길 너무 잘했다는 생각이 들었다.

### 타입스크립트란?

Typescript는 Javascript의 superset 으로, 즉 쉽게 생각하자면, 타입스크립트는 자바스크립트의 기본 문법을 가져가면서 거기에 `타입 체크(Type checking)` 가 추가된 것이라고 생각하면 된다.

<br />

**그렇다면 왜 자바스크립트에 type이 필요할까?**

기본적으로 정적 타입 언어인 C언어, Java 등과 달리, 자바스크립트는 동적 타입의 언어이다. 동적 타입이라고 하면, 타입이 사전에 정확히 명시되어 고정된 것이 아니라, 런타임 시 동적으로 결정되는 것이다.

```javascript
// javascript : 하나의 변수에 서로 다른 타입의 자료 대입 가능, 서로 다른 타입 간 자동형변환

let a = 123; // number
a = "123"; // string
```

<br />
이러한 유연성이 자바스크립트의 매력이라고 생각하는 사람들이 많지만, 이러한 유연성은 불일치한 타입으로 인한 에러를 유발하여 개발에 방해요소로 작용하기도 한다.

반면, 정적 타입은 런타임 전에 컴파일 타임의 타입 안정성을 보장해주기 때문에, code quality가 향상되어 개발 속도 향상에도 도움이 되고, 유지보수에도 굉장히 좋다. 또한 이 타입 자체가 하나의 굉장히 좋은 documentation 역할을 하기도 한다. 이러한 여러 이점들 때문에 Microsoft, Google, Facebook과 같은 기업들도 정적 타입의 도입을 적극적으로 하고 있다.

```javascript
// typescript : 타입이 고정되어 있어, 다른 타입의 자료 대입 불가

let a: number = 123
a = "123" // error
```

### 안정성 vs. 생산성

일반적으로 정적 타이핑과 동적 타이핑의 관계에는 `안정성` 과 `생산성` 에 대한 Trade-off가 있다고 얘기한다. 때문에 TypeScript에서는 생산성보다는 안정성이 중요시되는 대규모 JavaScript 어플리케이션 개발에 적합하다고 많이들 얘기한다.

물론 정적 타이핑은 더 많은 코드 작성을 필요로 하기 때문에 생산성이 저하된다는 의견들이 있지만, 그를 충분히 상쇄시킬 만한 장점들이 많기 때문에 결코 생산성이 저하된다고 말할 수 없다.

1. **타입 안정성 보장**

    - 컴파일 타임 타입 체크 덕분에 `빠른 에러 발견 및 해결`이 가능하기 때문에 쓸데없이 소모되는 디버깅 시간이 줄어들고, 
    - 그로 인한 `안전한 리팩토링` 및 효율적인 유지보수를 할 수 있기 때문에 **최종적인 생산성 증가**

2. **Intellisense 지원**

    - Intellisense란, IDE의 자동 완성 기능으로 VS Code에서 지원이 가장 잘 되지만, 다른 IDE에서도 플러그인으로 지원  
    - 타입스크립트는 인터페이스 등을 통해 큰 틀을 미리 정의해놓고 코드를 작성하기 때문에, 타입 자체가 하나의 훌륭한 `documentation 역할`  
    - 작성한 다른 모듈을 다시 찾아보거나, 혹은 타입이 정의된 외부 라이브러리 사용시 API를 찾아볼 필요가 없이 `auto complete 또는 tooltip`의 도움을 받아 바로바로 편하게 작성 가능  
    - 그 외에 `auto import` 기능으로 번거로운 단순 작업에 대한 로드 또한 감소하므로 개발속도 향상  

3. **생태계 지원**

    - JS 라이브러리를 TS에서 Import하여 사용하기 위해서는 해당 라이브러리의 타입이 정의된 모듈(@types/~~)을 추가로 설치만 해주면 바로 적용 가능하기 때문에 `JS 와의 호환 또한 용이`

<br />
개인적으로 프로젝트에 도입을 하면서 느꼈던 가장 좋은 점 역시 "빠른 에러 발견 및 해결" 과 "Intellisense" 기능이었다.

인터페이스 등을 통해 큰 틀을 미리 정의해놓고 코드를 작성하기 때문에 내가 작성했던 props명이 뭐였더라? function의 인자와 리턴값이 뭐였더라? 를 다시 찾아볼 필요가 없이 auto complete 또는 tooltip의 도움을 받아 바로바로 편하게 작성할 수 있어 개발 속도가 확실히 향상되었다.  
또한 컴파일 단의 타입 체크 덕분에 쓸데없이 소모되는 디버깅 시간이 줄어들었고 유지보수에도 굉장히 좋아 최종적인 생산성이 매우 증가하는 것을 몸소 체험할 수 있었다.

### 타입스크립트 셋업

컴파일 시마다 옵션을 반복적으로 지정하는 것은 번거롭기 때문에, 프로젝트 root directory에 `tsconfig.json` 을 만들어 미리 컴파일 환경을 지정해둔다.
```javascript
// tsconfig.json

{
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "sourceMap": true
    },
    "include": [
        "src/**/*"
    ]
}
```

### JS → TS 전환

타입스크립트 또한 컴파일이 되고 나면 자바스크립트와 동일하기 때문에, tsconfig의 컴파일러 옵션만 몇 개 설정해주고 나면, `.js` 를 `.ts` 로 변경하여 작성 혹은 같은 프로젝트 내에서도 동시에 작성 가능하다.
```javascript
// tsconfig.json

{
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "sourceMap": true
        -----------------
        "outDir": "dist", // output 디렉토리 설정 가능
        "allowJs": true // 자바스크립트도 같이 사용 가능
        -----------------
    },
    "include": [
        "src/**/*"
    ]
}
```
[>> [Reference] Migrating from Javascript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)

### TS 컴파일

타입스크립트로 개발을 할 때는 매번 내용이 반영됐는지 확인하려면 build(`tsc`)해줘야 하는 번거로움이 있다.

따라서 `nodemon`을 사용하듯이 ts compile도 watch 기능 `tsc -w` 을 이용하여 바로바로 반영시키면서 작업할 수 있다.
```javascript
// package.json

{
"scripts": {
    "watch-node": "nodemon dist/server.js",
    "watch-ts": "tsc -w", // ctrl(cmd) + shift + B
    "build-ts": "tsc"
  },
}
```
### 타입 vs. 인터페이스

타입스크립트에서 타입을 정의하는 방법으로는 `type` 과 `interface` 두 가지가 있는데, 둘 다 비슷하게 동작하지만 type이 `extends` 나 `implements` 가 되지 않는다는 여론 때문에 대부분 interface를 더 많이 사용하는 것 같다.

그동안 봤던 YouTube tutorials 에서도 주로 인터페이스를 많이들 사용하길래, 나도 `props` 와 `states` 에 관해서는 모두 인터페이스를 사용하여 작성하였다. 하지만 사실상 프로젝트 내부에서 일관성을 유지하면서 작성하기만 하면, 둘 중 어떤 것을 사용해도 크게 상관없다고 한다.

[>> [Reference] Interface vs. Type Alias](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c)

<br />

**인터페이스는 어떻게 작성하고 사용할까?**

인터페이스란 개념은 자바스크립트 개발자들에게는 다소 생소한데, 예전에 살짝 공부해보았던 자바를 떠올려보면 인터페이스는 큰 틀을 잡아주는 일종의 `청사진`과 같은 역할을 한다.

예를 들어, 리액트에서 부모 컴포넌트로부터 넘겨받은 props는 string 일수도, number 일수도, function 일수도 있다. 따라서 넘겨받을 props에 대한 큰 그림을 interface로 미리 그리는 것이다. props의 이름이 무엇이고, 그 타입은 무엇인지에 대해 인터페이스로 미리 정의해두고, 그걸 자식 컴포넌트가 extends 함으로써 코드를 작성하면서 props를 잘못 넘겨주고 잘못 넘겨받는 에러를 사전에 방지할 수 있으며, 자동완성 기능까지 더해져 오타의 가능성 또한 감소하니 일석이조이다.

인터페이스의 syntax는 key-value 형태의 object 형태로 작성을 하지만, 내용은 마치 class를 작성하듯이 property도 있고 method가 있을 수도 있다. property의 타입으로는 primitive type을 쓸 수도 있고, 또다른 인터페이스를 타입으로 정의할 수 있다. function은 arrow function 문법을 사용하여 전달받을 파라미터의 타입과 리턴 타입을 작성한다. DOM event, HTTP 통신 등과 관련해서는 그에 맞게 미리 정의된 타입을 찾아 정확하게 작성해 주어야 한다. (잘 모른다고 `any` 를 남발하며 작성을 하는 사람들이 종종 있는데, 그런 경우에는 타입스크립트를 쓰는 의미가 없어진다.)

작성한 인터페이스는 React.Component의 type generic 형태로 넘겨준다. `<IProps, IStates>` 순서로 작성을 하면 되고, 넘겨받는 props가 없는 경우에는 `<null, IStates>` 형태로 작성하면 된다.

```javascript
interface IModalProps {
  rentalData: IRentalStates;
  detailClicked: boolean;
  handleModal: (e: MouseEvent<HTMLInputElement>) => void;
}

export default class Modal extends Component<IModalProps> {
  constructor(props: IModalProps) {
    super(props)
  }
  // ... 생략
}
```

### 인터페이스는 필요한 곳에서만 사용하자!

VS code 의 Settings 에서 `code lens` 설정해 주면, 해당 인터페이스가 어디에서 얼마나 사용되고 있는지를 확인할 수 있고, 괜히 쓸데없는 인터페이스의 남용을 막을 수 있다.

![code-lens-1](/assets/code-lens-1.png)
![code-lens-2](/assets/code-lens-2.png)

### Conclusion

첫 타입스크립트의 적용이었던 만큼, 아주 최소한의 bare minimum 기능만 사용하는데 그쳤지만, 타입스크립트의 이점을 확실히 느낄 수 있는 기회였다. 이를 계기로 앞으로도 정적 타입에 대한 관심을 더 가지고, 타입스크립트의 advanced features까지 습득하여 더욱 효과적으로 잘 적용해보고 싶다.

[>> Getting Started · TypeScript Deep Dive](https://basarat.gitbooks.io/typescript/docs/getting-started.html)

[>> Microsoft/TypeScript-React-Starter](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter)

[>> Microsoft/TypeScript-Node-Starter](https://github.com/Microsoft/TypeScript-Node-Starter)