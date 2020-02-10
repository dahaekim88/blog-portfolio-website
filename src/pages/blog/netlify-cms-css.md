---
title: "Netlify CMS 프리뷰 템플릿 추가하기 (+ CSS Injection)"
date: 2019-05-23T20:26:00.000Z
tags: ["netlifycms", "jam-stack", "css"]
category: blog
open: true
---

<br />

GatsbyJS + Netlify CMS를 사용하여 이 블로그를 먼저 만들어 보았기 때문에, paid project를 동일한 스택으로 진행하게 되면서 굉장히 순조로울 것이라고만 생각했다. 하지만 이 블로그를 만들 때는 고려하지 못했던 CMS Preview로 꽤 고생을 했다.

블로그 포스트에는 딱히 디자인이랄 것이 없었기 때문에 프리뷰에 CSS가 적용되고 있지 않다는 사실조차 인지하지 못했었다. 하지만 실제 운영되는 사이트에서 대부분의 페이지를 모두 CMS로 구성하면서 프리뷰에 CSS가 적용되지 않아 깨져 보이는 문제점을 발견했다.

<br />

## 프리뷰 템플릿 작성

---

그리하여 기존 템플릿을 재사용하여 프리뷰 템플릿을 추가 작성하였다. 프리뷰 템플릿은 prop으로 entry data를 포함하고 있는 "immutable" collection을 넘겨받기 때문에, 반드시 `getIn()` 메서드를 이용하여 데이터를 불러와야 하며, array인 경우에는 `toJS()` 메서드를 사용하여 자바스크립트 array로 변환시켜 주어야 한다.

```javascript
import React from "react"
import PropTypes from "prop-types"
import { IndexPageTemplate } from "../../templates/index-page"

const IndexPagePreview = ({ entry }) => {
  const entryCarousel = entry.getIn(["data", "carousel"])
  const carousel = entryCarousel ? entryCarousel.toJS() : []

  return (
    <IndexPageTemplate
      carousel={carousel}
      partners={{
        heading: entry.getIn(["data", "partners", "heading"]),
      }}
    />
  )
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default IndexPagePreview
```

<br />

## 프리뷰 템플릿 등록

---

이렇게 작성한 프리뷰 템플릿은 Netlify CMS에서 제공하는 `window.CMS` 글로벌 객체를 이용하여 커스텀 프리뷰를 등록할 수 있다.

```javascript
CMS.registerPreviewTemplate("템플릿 이름", "리액트 컴포넌트") // 템플릿 이름은 static/admin/config.yml에서 설정한 페이지 이름을 넣어야 한다
```

커스텀 프리뷰 등록은 `cms.js` 라는 파일에 다음과 같이 작성하면 된다.

```javascript
// src/cms/cms.js
import React from "react"
import CMS from "netlify-cms"
import IndexPagePreview from "./preview-templates/IndexPagePreview"

CMS.registerPreviewTemplate("index", props => <IndexPagePreview {...props} />)
```

<br />

## 프리뷰 템플릿에 CSS 주입하기

---

여기까지는 무난하게 진행하였는데, CSS가 제대로 적용되지 않고 깨져보이는 것이 문제가 되었다. Netlify CMS 문서에 있는 것처럼 `CMS.registerPreviewStyle()` API를 사용하려고 했으나, Styled-Components와 같은 CSS-in-JS를 사용한 경우에는 적용이 되지 않았다.

그리하여 결국 styled-components에서 제공해주는 helper 컴포넌트를 사용하여 Wrapper Component를 추가로 작성해야 했다. `StyleSheetManager`는 스타일이 처리되는 방식을 커스터마이징 할 수 있게 해주는데, 프리뷰가 렌더링되는 iframe DOM node를 StyleSheetManager를 통해 제공함으로써 스타일 정보를 주입시킬 수 있도록 처리해주어야 했다.

```javascript
import React from "react"
import CMS from "netlify-cms"
import IndexPagePreview from "./preview-templates/IndexPagePreview"
import { StyleSheetManager } from "styled-components"

// Netlify CMS로 하여금 styled-component를 통해 스타일을 적용하기 위한 컴포넌트 추가 작성
class CSSInjector extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      iframeRef: "",
    }
  }

  componentDidMount() {
    const iframe = document.getElementsByTagName("iframe")[0]
    const iframeHeadElem = iframe.contentDocument.head
    this.setState({ iframeRef: iframeHeadElem })
  }

  render() {
    return (
      <div>
        {this.state.iframeRef && (
          // StyleSheetManager 컴포넌트에 프리뷰가 렌더링되는 iframe DOM node 제공
          <StyleSheetManager target={this.state.iframeRef}>
            {this.props.children}
          </StyleSheetManager>
        )}
      </div>
    )
  }
}

CMS.registerPreviewTemplate("index", props => (
  // CSSInjector 컴포넌트로 wrapping하여 스타일 주입
  <CSSInjector>
    <IndexPagePreview {...props} />
  </CSSInjector>
))
```

<br />

#### [Reference]

https://www.netlifycms.org/docs/customization/  
https://styled-components.com/docs/api#stylesheetmanager
