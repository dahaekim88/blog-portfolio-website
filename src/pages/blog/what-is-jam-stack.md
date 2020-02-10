---
title: "JAMstack 프로젝트 (GatsbyJS + NetlifyCMS)"
date: 2019-05-20T19:43:00.000Z
tags: ["jam-stack", "gatsbyjs", "netlifycms"]
category: blog
open: true
---

<br />

## JAM Stack 이란?

---

JAMstack이란 `Javascript API & Markup` 의 약자로, Netlify의 CEO Mathias Biilmann에 의해 대중화되었으며, "client-side JavaScript, reusable APIs, prebuilt Markup을 기반으로 한 모던 웹 개발 아키텍쳐" 라고 설명한다.

이번 프로젝트를 진행하면서 요즘 핫한 JAMstack을 기본 구조로 진행해보았다. 이 블로그를 만들면서 적용한 것과 마찬가지로, React를 기반으로 한 Static site generator `GatsbyJS`와, 역시나 React를 기반으로 한 확장성 좋은 CMS `NetlifyCMS`를 연동하여 작업해보기로 하였다.

<br />

## Project Structure

---

Gatsby와 Netlify CMS 연동시 기본 폴더 구조는 다음과 같다. (참고: [기본 개츠비 프로젝트 폴더 구조](https://www.gatsbyjs.org/docs/gatsby-project-structure/))

```
/
|-- /.cache              자동 생성되는 캐쉬 디렉토리 (.gitignore 추가)
|-- /public              자동 생성되는 빌드 디렉토리 (.gitignore 추가)
|-- /src                 UI 소스코드
    |-- /pages           파일명과 동일한 path로 페이지를 자동 생성해 주는 컴포넌트
    |-- /templates       다이내믹하게 페이지를 만들어낼 수 있는 템플릿
    |-- /components      일반 React 컴포넌트
    |-- /cms             CMS에 preview template 연동
|-- /static              내부의 파일은 웹팩을 거치지 않고, 그대로 /public 폴더에 복사됨
                         (CMS를 통해 업로드된 images or files + config.yml 포함)
|-- gatsby-browser.js    브라우저와 관련된 개츠비의 기본 설정 커스터마이징 (css import 등)
|-- gatsby-config.js      가장 기본적인 설정 파일 (site metadata 및 Gatsby plugins 설정)
|-- gatsby-node.js       다이내믹하게 페이지 생성하도록 설정 (그 외 Gatsby Node APIs 사용)
```

<br />

## Configurations

---

### 1) Gatsby 기본 설정

> #### `gatsby-config.js` : site metadata 및 plugins 설정

- 메타데이터 설정 → Graphql을 이용하여 페이지에서 불러와 사용 가능
- 기본적으로 필요한 플러그인

  - `gatsby-source-filesystem` : 파일시스템으로부터 Gatsby에게로 파일을 읽어들임
  - `gatsby-transformer-remark` : 마크다운 파일을 frontmatter와 HTML로 변환해줌
  - `gatsby-plugin-netlify-cms` : Netlify CMS customization 설정
  - `gatsby-plugin-react-helmet` : server rendering data 지원
  - `gatsby-plugin-sharp` : 이미지 처리 (size, quality 세팅 등)

- `gatsby-node.js` : `createPages` API 사용하여 다이내믹하게 페이지 만들기 ([Adding Markdown Pages](https://www.gatsbyjs.org/docs/adding-markdown-pages/))

### 2) Netlify CMS 설정

> #### `gatsby-config.js` : 플러그인 추가 및 옵션 설정

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`, // path 제대로 설정해주기
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    // ...중간 생략
    {
      resolve: "gatsby-plugin-netlify-cms", // array의 가장 마지막에 위치
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
  ],
}
```

설치한 plugin이 자동으로 Netlify CMS app 을 생성하여 admin/index.html 을 출력해준다.

> #### `static/admin/config.yml` 파일 생성

root 디렉토리에서 static 폴더 추가하고 그 안에 admin config 파일을 만든다. build 시, Gatsby가 이 폴더 안에 있는 모든 것을 copy하여 public 폴더로 내보내준다.

```yml
# example

# CMS를 통해 변경된 컨텐츠를 repository에 저장하기 위한 설정
backend:
  name: git-gateway # github으로 사용하는 경우, github 인증으로 로그인 해야함
  repo: your-username/your-repo-name # github으로 작성한 경우에만
  branch: dev # default 값은 master

media_folder: static/assets
public_folder: assets

collections:
  - name: blog
    label: Blog
    folder: blog
    create: true
    fields:
      - { name: path, label: Path }
      - { name: date, label: Date, widget: date }
      - { name: title, label: Title }
      - { name: body, label: Body, widget: markdown }
```

[Github 인증 및 backend 설정](https://www.netlifycms.org/docs/authentication-backends/#github-backend)을 완료한 다음, 설정한 도메인 끝에 `/admin`을 붙이면 CMS 어드민 패널에 접속 가능하다.
(참고: [Sourcing from Netlify CMS](https://www.gatsbyjs.org/docs/sourcing-from-netlify-cms/))

### 3) Netlify 인증

> #### 방법 - 1. Github Oauth 사용

- Access Control : authentication provider 셋업

  - admin 패널에서 변경된 컨텐츠를 repository에 저장할 수 있도록 인증
  - CMS admin 패널 접근 시 Github 계정으로 로그인 가능

  [>> OAuth Providers 참고](https://www.netlify.com/docs/authentication-providers/#using-an-authentication-provider)

  ⇒ 이 상태에서는 누구든지 admin 패널에 접근하여 publish 하면 repository에 push 가능

> #### 방법 - 2. Netlify Identity (유료 플랜 사용 시 Team별, Identity별 권한 관리 가능)

- Identity : authentication 처리 및 유저 관리

  - `Enable Identity` → 자기 자신을 유저로 초대 (이메일 주소) → `Invite users` → 이메일 확인 `Accept invite`

  [>> Identity 설정 참고](https://www.netlify.com/docs/identity/)

- Git Gateway : code repository에 대한 직접적인 권한을 부여하지 않고 CMS에만 접근할 수 있도록 contributors를 추가할 수 있게 해준다

  - Identity settings의 Services 항목에서 `Enable Git Gateway`

  [>> Git Gateway 설정 참고](https://www.netlify.com/docs/git-gateway/)

현재 github이 private이기 때문에 netlify identity 및 git-gateway 사용하여 팀원들이 admin 패널에 로그인 할 수 있도록 설정해 주어야 한다.

그 외에도 Netlify는 Continuous Deploy, SSL 설정 등 다양한 기능을 자동으로 제공해주어 매우 편리하게 작업할 수 있었다.

<br />

## GraphQL

---

앞서 설명한 것처럼 `gatsby-config.js` 파일에 설정한 메타데이터는 Graphql을 이용하여 페이지에서 불러와 사용 가능하다.

```js
// gatsby-config.js

module.exports = {
  siteMetadata: {
    title: `Title from siteMetadata`,
  },
  plugins: [],
}
```

> #### Page Query

페이지 쿼리는 컴포넌트 바깥에 작성하며, 이렇게 불러온 쿼리의 결과는 개츠비에 의해 Page 컴포넌트에 `data`로 주입된다.

```js
import React from "react"
import { graphql } from "gatsby"

export default ({ data }) => (
  <div>
    <h1>About {data.site.siteMetadata.title}</h1>
    <p>
      We're the only site running on your computer dedicated to showing the best
      photos and videos of pandas eating lots of food.
    </p>
  </div>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
```

마크다운 파일 또한 동일한 방법으로 쿼리를 이용하여 불러올 수 있으며, Template 컴포넌트에 `data`로 주입된다.

```js
// ./src/templates/index-page.js

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      <IndexPageTemplate studyData={edges} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexPageTemplate {
    allMarkdownRemark(
      filter: { frontmatter: { main: { eq: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MM.DD.YYYY")
            title
            description
            main
          }
        }
      }
    }
  }
`
```

> #### StaticQuery

StaticQuery는 페이지가 아닌 컴포넌트에서 GraphQL 쿼리를 통해 데이터를 불러올 수 있는 API로, 다음과 같은 두 가지 방법이 있다.

```js
import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div>
        <Link to={`/`}>
          <h3>{data.site.siteMetadata.title}</h3>
        </Link>
        <Link to={`/about/`}>About</Link>
        {children}
      </div>
    )}
  />
)
```

```js
import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

export default ({ children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <div>
      <Link to={`/`}>
        <h3>{site.siteMetadata.title}</h3>
      </Link>
      <Link to={`/about/`}>About</Link>
      {children}
    </div>
  )
}
```

<br />

## Dynamically create pages

---

마크다운 페이지를 생성하기 위해서 [onCreateNode](https://www.gatsbyjs.org/docs/node-apis/#onCreateNode)와 [createPages](https://www.gatsbyjs.org/docs/node-apis/#createPages) 두 개의 Gatsby API를 사용한다.  
API 구현을 위해, root directory에 생성한 `gatsby-node.js`. 파일로부터 위 API 이름의 함수를 export 해 준다.

```js
exports.onCreateNode = ({ node }) => {
  if (node.internal.type === `MarkdownRemark`) {
    console.log(node.internal.type)
  }
}
// This will be called by Gatsby whenever a new node is created (or updated).
```

[>> Adding Markdown Pages](https://www.gatsbyjs.org/docs/adding-markdown-pages/)

<br />

## Styling

---

> #### 1. 순수 CSS 사용 - 주로 전역 스타일 적용

- `src/styles/global.css` 파일 생성
- root directory에 `gatsby-browser.js` 파일 생성 → `import "./src/styles/global.css"`

> #### 2. CSS Modules 사용 - 컴포넌트 스코프 단위 적용

- `src/components/컴포넌트명.module.css` 파일 생성 → 일반 CSS 처럼 작성
- 적용할 컴포넌트 내부에서 `import` → import한 css module(object)은 각 클래스명을 key값으로 가지며, CSS Mudules이 만들어준 고유한 클래스명을 value값으로 가리키고 있다.
- 따라서, 자동으로 고유한 class name과 animation name을 생성해 주기 때문에, selector name 간 충돌을 예방할 수 있다

> #### 3. CSS-in-JS 사용 - 컴포넌트 지향 스타일링 (플러그인 제공)

- Glamor or [Styled Components](https://www.gatsbyjs.org/docs/styled-components/)
