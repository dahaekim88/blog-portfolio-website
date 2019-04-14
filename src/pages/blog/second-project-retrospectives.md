---
title: "팀프로젝트를 통해 얻은 것"
date: 2019-01-26T20:41:00.000Z
tags: ["team-project", "communication", "typescript", "refactoring"]
category: blog
open: true
---

### Intro

부트캠프의 마지막 과정으로 약 한 달여 간 기업 협업 프로젝트를 진행했다. 팀프로젝트라고 하기에는 팀원이 나 포함 두 명 밖에 없었지만, 그래도 함께 협업을 하면서 많은 것을 느끼고 배울 수 있는 소중한 경험이 되었다. 그래서 팀프로젝트를 마무리 하며 느꼈던 점들을 정리해보았다.

### 1. 커뮤니케이션의 중요성

모든 협업의 핵심인 `커뮤니케이션` 은 어디를 가든 가장 중요한 키워드인 듯 하다. 예전 커리어에서도 워낙 다양한 팀들과 협업을 해야했고, 수많은 외부 파트너사들과의 소통이 일상이었던 만큼, 커뮤니케이션의 중요성은 늘 인지하고 있었다. 하지만 또 개발자로서 협업을 하는 것은 처음이었고, 어떠한 내용과 어떠한 순서로 커뮤니케이션을 하는 것이 효율적인가는 항상 어려운 고민이었다.

우선 프로젝트를 시작하면서부터 각자가 이번 프로젝트를 통해 적용해보고 싶은 기술 스택을 의논하고, 서로의 의견을 잘 절충하여 선정하였다. 그 후 가장 먼저 클라이언트와 서버 간의 소통이 어떻게 될지에 대한 REST API 설계를 함께 의논하였다. 사전에 어떻게 정보를 서로 주고 받을 것인지를 확실하게 정해놓은 다음 작업을 진행하니, 확실히 개발 속도도 향상되고 불필요한 충돌이 전혀 발생하지 않아 스무스하게 작업을 진행할 수 있었다.

그 외에도 중간중간 코드 리뷰 등을 통해서도 끊임없는 커뮤니케이션을 한 덕분에 굉장히 효율적인 팀워크를 발휘할 수 있었던 것 같다. 다시 한 번 커뮤니케이션의 중요성을 느끼게 되는 경험이었다.

### 2. 타입스크립트 적용

이번 프로젝트에서 새롭게 도전했던 것 중 하나가 바로 정적 타입의 도입, `타입스크립트 적용`이었다. 자바 공부를 조금 해봤던 적이 있었기에 정적 타입에 대한 개념은 어느 정도 익숙했었고, 타입스크립트 역시 결국은 자바스크립트를 기반으로 한 문법이기에 크게 어려움 없이 작업을 할 수 있었다.

타입스크립트 적용에 대한 보다 상세한 내용은 이전 블로그 포스트에 기록해 두었다.

[>> 타입스크립트 적용에 관한 포스트](https://www.dahae.kim/blog/why-use-typescript/)

### 3. 리팩토링, 그리고 유지보수

함께 협업했던 팀원이 처음 프로젝트를 시작할 때부터 꾸준히 리팩토링에 대해 엄청 강조를 했었다. 물론 리팩토링이 중요하다는 것은 글로는 많이 읽었지만, 아직 마음에 와닿을 정도로 경험을 한 적이 없었던 터라, 처음엔 나의 짧은 생각으로는 우선 뭔가 겉으로 보여지는 것을 만들어 내는 것이 중요하다고 생각해서 UI 하나 더, 기능 하나 더 추가하는 것에 오히려 급급해 리팩토링을 하는 시간이 뭔가 아까운 것만 같은 느낌이 들었다.

하지만 매 주 서로 프론트엔드-백엔드 역할을 바꿀 때마다 서로의 코드를 리뷰하며 끊임없이 리팩토링에 대한 고민을 함께 하다보니, 훨씬 더 좋은 코드를 작성하게 되고 그에 따라 격주마다 한 번 씩 역할을 바꿔 서로의 코드에서부터 작업을 이어나가는 데에도 큰 무리가 없이 수월하게 진행되었다.

작업을 할 때에는 무작정 코드를 작성하기 보다는, 다양한 방법으로 고민해 가면서 리팩토링 해봄으로써 더 좋은 코드가 무엇인지 체득해 나가는 것이 중요한 것 같다. 이번 프로젝트에서는 `타입스크립트 + 꾸준한 리팩토링`을 통해 유지보수에 좋은 코드를 많이 작성할 수 있는 기회가 되었다.

### 4. 모듈화의 중요성

이렇게 리팩토링과 유지보수의 중요성을 깨닫고 나니, 이를 위해서는 모듈화 또한 왜 그렇게 중요한지 새삼 다시 한 번 느끼게 되었다. 이번 프로젝트에서도 리팩토링을 통해 모듈화 작업을 해보니, 뛰어난 재사용성으로 코드가 더욱 간결해질 뿐만 아니라, 무언가 사소한 것 하나를 수정할 때에도 일일이 관련 코드가 적혀있는 컴포넌트를 모두 돌면서 코드를 찾아 변경할 필요없이, 모듈화된 파일 하나만 열어서 수정을 하면 되니 이렇게 편하고 효율적일 수가 없었다. 그렇게 글로만 보던 `유지보수가 좋다` 라는 말을 체감할 수 있었다.

<br />

이번 프로젝트에서 모듈화 작업을 했던 예제를 하나 꼽자면, 클라이언트에서 서버로 http 요청을 보내는 내용을 모듈화한 것이다. 다양한 컴포넌트에서 http request를 보내기 때문에, 이렇게 action별 http request에 대한 코드를 작성해 놓으면 다양한 곳에서 재사용할 수 있어 컴포넌트 내부의 코드도 간결해지고, axios로 사용했던 것을 혹여나 나중에 다른 것으로 바꾸고 싶을 때도 여기서 한 번에 바꿀 수 있다.  
실제로 우리의 경우에는 에러 핸들링을 할 때 한글로 입력한 내용이 자꾸만 깨지는 바람에 error response를 받아 decode를 해주어야 했는데, 이를 일일 컴포넌트마다 돌면서 하지 않고 여기서 한 번에 해결할 수 있어 매우 간편했다.

```javascript
import axios, { AxiosResponse, AxiosError } from "axios";

export interface IConfig {
  headers: { "x-access-token": string };
}

export default class RequestHandler {
  async get(uri: string, config?: IConfig) {
    return await axios
      .get(uri, config)
      .then((res: AxiosResponse) => ({
        data: res.data,
        error: ""
      }))
      .catch((error: AxiosError) => ({
        data: (error.response as AxiosResponse).data,
        error: decodeURI((error.response as AxiosResponse).statusText)
      }));
  }

  async post(uri: string, body: any, config?: IConfig) {
    return await axios
      .post(uri, body, config)
      .then((res: AxiosResponse) => ({
        data: res.headers["x-access-token"] || "",
        error: ""
      }))
      .catch((error: AxiosError) => ({
        data: "",
        error: decodeURI((error.response as AxiosResponse).statusText)
      }));
  }
}
```

<br />

이렇게 한 번 작성해 둔 RequestHandler를 필요한 컴포넌트에서마다 불러와, 서버로의 HTTP Request를 훨씬 짧고 깔끔한 코드로 구현할 수 있게 되었다.

<br />

```javascript
import RequestHandler from "../util/requestHandler"

async componentDidMount() {
    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/estimate/list`;
    const config: IConfig = {
      headers: { "x-access-token": localStorage.getItem("x-access-token") || "" }
    };
    const result = await requestHandler.get(uri, config);

    this.setState({ estimateList: result.data.estimateList, error: result.error });
  }
```

<br />

### 5. 이제는 UX 최적화를 고려해야 할 때

아무래도 React를 프로젝트에 직접 적용해 본 것은 처음이라, 우선 UI를 만들어내는 것에만 너무 급급하였던 것 같은 느낌이다. 그래서 UX를 좀 더 고려하지 못했던 것이 큰 아쉬움으로 남는다. 앞으로의 프로젝트들에서는 Lighthouse 등의 툴을 이용해 사이트의 성능 검사도 해가면서, 사용자의 환경 개선 및 UX 최적화에 좀 더 집중하며 개발하고 싶다.
