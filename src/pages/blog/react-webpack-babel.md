---
title: "리액트 프로젝트 셋업: React + Webpack + Babel"
date: 2019-07-16T20:26:00.000Z
tags: ["react", "webpack", "babel", "setup"]
category: blog
open: true
---

<br />

리액트 프로젝트를 진행할 때마다 주로 Create-React-App과 같은 보일러 플레이트에 의지를 해오거나, 혹은 Next.js나 Gatsby.js와 같은 프레임워크를 사용한 덕분에 Webpack, Babel, ESLint 등과 같은 복잡한 프로젝트 configuration을 고민할 일이 없었다.

이러한 One Build Dependency는 프로젝트를 초기 셋업을 매우 손쉽고 간편하게 할 수 있는 장점이 있으나, 각종 configuration들이 모두 숨겨져 있어 내가 원하는 대로 custom을 하기도 힘들 뿐더러, 정작 내가 사용하지도 않을 패키지들 때문에 굉장히 무겁다는 단점이 있다. 그렇다고 또 이 Create-React-App을 eject 해서 사용하자 하니, 각종 dependency를 어떻게 건드리게 될 지 몰라 안정성이 걱정되었다.

그래서 결국은 "Back to the basic" - 기본에 충실하게 webpack, babel을 처음부터 설정해보기로 했다. 사실 custom을 하려고 해도 기본 원리를 모르면 custom도 불가하기 때문에 역시나 기본을 아는게 우선되어야 할 것 같았다.

<br />

> 먼저 리액트 프로젝트를 하는데 웹팩과 바벨이 왜 필요한가부터 다시 한 번 짚고 넘어가자면,

리액트 컴포넌트는 주로 ES6 문법으로 작성되는데(class, import, export...), 오래된 브라우저에서는 이러한 최신 문법을 지원하지 않기 때문에 ES6를 ES5로 바꿔주는 작업이 필요하다. 또한 리액트에서 사용하는 JSX 문법을 브라우저에서 이해할 수 있도록 바닐라 자바스크립트로 전환해주어야 하는데, 바로 이러한 transpiling 작업을 해주는 것이 바로 Babel이다.

이와 더불어 Webpack은 여러 개의 자바스크립트 소스코드 파일을 하나의 번들된 파일로 만들어주는 모듈 번들러로, Browerify, Parcel 등 다양한 모듈 번들러가 있지만 웹팩이 아마도 가장 인기많은 모듈 번들러인 듯 하다. 웹팩이 여러 파일을 하나로 병합해 주는 것은 알겠는데, `대체 왜 파일을 하나로 합쳐야 할까?`

그 이유는 웹페이지 로딩 시 http 요청 수를 줄이기 위해, 즉 최적화를 위해서 이다. 여러 소스코드 파일들을 압축한 하나의 번들 파일을 웹페이지에 포함하여 한 번의 요청을 통해 전체 앱을 로드함으로써, http 요청 수를 줄이고 로딩 속도를 향상시킬 수 있다.

<br />

그럼 이러한 역할들을 하는 웹팩과 바벨을 리액트에서 사용하기 위해서는 어떻게 해야할까?

<br />

## Webpack

---

우선 웹팩과 관련된 기본 패키지들을 npm으로 설치한다.

- `webpack`
- `webpack-cli` : 웹팩을 커맨드 라인으로 사용할 수 있게 해준다
- `webpack-dev-server` : live reloading을 제공하는 데브 서버를 사용할 수 있게 해준다

기본적으로 이렇게 설치만 하면 설정파일 없이도 `webpack` 커맨드 하나로 빌드가 가능하다.  
entry와 output의 디폴트가 정해져 있어서, 별다른 커스텀 설정이 없다면 항상 `./src/index.js` 파일을 찾아 `./dist/main.js`로 빌드 결과물이 산출된다. 굳이 설정파일로 작성해보자면, 다양한 옵션들은 차치하고 간단하게 다음과 같이 된다.

> ### webpack.config.js

```js
const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/", // 브라우저가 참고할 번들링 결과 파일의 URL 주소
    filename: "main.js",
  },
}
```

다만 webpack4 부터는 mode를 설정할 수 있는데, 이 설정 값에 따라 built-in 최적화 여부가 결정된다.  
이는 설정 파일에 작성할 수도 있지만, `webpack` 커맨드 실행시 `--mode` 옵션을 줄 수도 있다.  
다음과 같은 두 가지 옵션이 있는데, 각각 빌드를 한 다음 `./dist/main.js` 파일을 확인해보면 production 모드가 minified 된 것을 확인할 수 있다. 디폴트 값은 production으로 설정되어 있다.

```
$ webpack --mode development
$ webpack --mode production
```

<br />

## Babel

---

바벨과 관련된 기본 패키지는 다음과 같다.

- `@babel/core` : 바벨을 실행할 수 있게 해주는 기본 패키지
- `@babel/preset-env` : 바벨이 ES6 이상 문법을 ES5로 변환할 수 있게 도와준다
- `@babel/preset-react` : 리액트를 사용하는 경우 필요한 패키지로 JSX 문법을 Vanilla JS로 변환해준다
- `babel-loader` : 웹팩에서 사용할 모듈로, 웹팩에게 바벨을 어떻게 실행시킬지를 알려준다

이렇게 기본적으로 설치한 바벨을 가지고 먼저 바벨 설정파일 `.babelrc`를 작성한다.

> ### .babelrc

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

그리고 앞서 설명한 웹팩 모듈인 `babel-loader`는 웹팩 설정파일에 다음과 같이 작성해준다.

> ### webpack.config.js

```js
module.exports = {
  module: {
    // 번들링 과정에 개입하여 특정 동작 처리해주는 Loader
    rules: [
      // Loader 규칙 작성
      {
        test: /\.(js|jsx)$/, // 플러그인을 적용할 대상 파일 설정
        exclude: /node_modules/, // node_modules 제외
        use: "babel-loader", // 사용할 플러그인
      },
    ],
  },
}
```

이렇게까지 하면 기본적인 리액트 파일들은 바벨을 이용하여 웹팩 번들링이 가능해진다.  
이제 웹팩을 통하여 이 리액트 컴포넌트들이 렌더링 될 수 있는 html 파일을 생성하는 것과 스타일을 적용하는 것을 추가할 차례이다.

<br />

## Webpack Plugins & Loaders

---

- `html-webpack-plugin` : html 파일의 script 태그 안에 컴파일된 bundle 파일 심어준다

- `style-loader` : CSS를 style 태그로 DOM에 inject 해준다
- `css-loader` : 웹팩으로 하여금 CSS assets을 로드하게 한다
- `sass-loader` : 웹팩이 sass 파일을 css로 컴파일 하도록 도와준다
- `node-sass` : sass-loader에 의존성이 있는 패키지

> ### webpack.config.js

```js
const HTMLWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [ // 여기서 순서가 style-loader가 css-loader보다 먼저 나와야 에러가 발생하지 않는다
          'style-loader',
          'css-loader',
          'sass-loader']
        ]
      },
    ]
  },
  plugins: [
    new HTMLWebPackPlugin({
      hash: true, // 번들된 파일명에 hash를 사용함으로써, 캐시 문제를 예방한다
      template: "./public/index.html", // 번들된 파일을 script 태그로 넣어줄 html 템플릿 경로
    })
  ],
  devtool: 'cheap-module-eval-source-map' // 소스맵을 생성하여 디버깅 프로세스를 도와주는 옵션
}
```

소스맵은 디버깅을 하는 동안 minified된 코드 대신 원본 자바스크립트 코드를 보여줌으로써, 디버깅을 훨씬 용이하게 만들어준다.  
devtool은 이를 위한 옵션인데, 알고보니 소스맵 데브툴도 유형이 굉장히 다양하다. 자세한 내용은 [여기](https://perfectacle.github.io/2016/11/14/Webpack-devtool-option-Performance/)를 참고하면 좋을 듯 하다.

<br />

## Webpack Script

---

마지막으로 `package.json` 파일에 스크립트를 추가하는데, 앞서 말한 mode 옵션을 사용하여 작성한다.  
개발 모드에서는 제일 처음에 설치했던 `webpack-dev-server`를 이용하면 되는데, 이 또한 기본적으로 실행시킬 path가 디폴트값으로 `./dist` 폴더가 설정되어 있으며, 굳이 설정파일에서 `hot: true` 혹은 `webpack.HotModuleReplacementPlugin` 등을 별도로 설정할 필요가 없다.

`--open` 옵션으로 데브 서버 시작 후 자동으로 브라우저를 열도록 설정하고, `--hot` 옵션으로는 HMR(Hot Module Replacement)을 활성화 해준다.

> ### package.json

```json
{
  "scripts": {
    "start": "webpack-dev-server --open --hot --mode development",
    "build": "webpack --mode production"
  }
}
```

<br />

첫 단계이니 만큼 굉장히 기초적인 설정을 해보았는데, [웹팩 공식문서](https://webpack.js.org/concepts/)를 보니 앞으로도 공부를 해야할 게 산더미 같다. (<del>이래서 다들 Zero Config를 찾나보다...</del>)

또한 이렇게 번들러를 사용했을 때 고려를 해야하는 점이 있는데, 여러 자바스크립트 파일들이 이 웹팩과 같은 모듈 번들러를 통해 하나의 파일로 묶여있기 때문에, 앱이 커질수록 초기 로딩 속도가 굉장히 길어질 수 있다. 따라서 이 문제를 해결하기 위한 방법으로는 바로 코드를 나누는 (Code Splitting) 것인데, 이는 런타임에 여러 번들을 동적으로 만들고 불러와 Lazy Loading을 함으로써 초기 로딩 속도를 개선시킬 수 있다. 공부해야 할 거 하나 더 추가!

<br />

#### [Reference]

https://www.robinwieruch.de/minimal-react-webpack-babel-setup
https://cresumerjang.github.io/2019/02/09/webpack-config/
