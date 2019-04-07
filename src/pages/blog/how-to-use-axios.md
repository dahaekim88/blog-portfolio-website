---
title: "초보자의 Axios 사용법"
date: 2019-01-03T22:23:00.000Z
tags: ["react", "axios", "header", "fetch"]
category: blog
open: true
---

### Axios의 장점 (axios vs. fetch)

**1. JSON Data로 자동 변환**  
Axios는 response를 자동으로 JSON data로 변환해줌으로써, 작성해야 할 단계가 하나 더 줄어들고, 그로 인해 에러가 날 요소 또한 하나 더 감소하게 된다.

```javascript
fetch("${process.env.REACT_APP_API_URL}/api/rental")
  .then(response => response.json())
  .then(data => data)
```

```javascript
axios
  .get("${process.env.REACT_APP_API_URL}/api/rental")
  .then(response => response)
```

<br />

**2. Better Error Handling**  
Axios의 가장 큰 장점 중 하나가 바로 에러 핸들링이 더 좋다는 점이라고들 한다. 백엔드가 응답 코드를 “500 Internal Server Error” 로 보낸 경우, fetch는 이를 “200 OK” 와 동일하게 취급한다고 한다. 만약 fetch 사용 시 데이터를 JSON으로 변환해야 하는 과정을 깜빡하고 서버에 요청을 보낸 경우, request가 서버로 넘어갔다는 “200 OK” 응답은 큰 의미가 없다.

<br />

**3. Base Instance 사용 가능**  
 Axios는 base URL과 다른 기본 configuration을 미리 정의한 base instance를 생성하여 재사용함으로써, 매번 반복적인 URL 코드 작성없이 endpoint만 간결하게 작성함으로써 코드 효율성을 높일 수 있다.

```javascript
import axios from "axios"

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
})

export default class Login extends React.Component {
  handleSubmit = event => {
    event.preventDefault()

    API.post(`login`).then(res => {
      console.log(res.data)
    })
  }
}
```

<br />

그 외에도 Axios는 XSRF 예방 등 더 안전하다고도 하고, interceptors 기능이 있다고 하는데 아직 그 수준까진 아니라 잘은 모르지만, 수많은 사람들이 좋다고 하는 데에는 다 이유가 있을 것이라고 생각된다.

[>> axios를 더 잘 활용하는 방법](https://medium.com/@jeffrey.allen.lewis/http-requests-compared-why-axios-is-better-than-node-fetch-more-secure-can-handle-errors-better-39fde869a4a6)

### Axios 사용법

**1. default header가 아닌 경우 접근하기**

JWT를 이용한 User Authentication을 구현하고 있었기에, 클라이언트-서버 사이에 headers를 통해 토큰 정보를 주고 받기로 했다. 하지만 정작 서버에서 받은 데이터를 까보면 headers가 확인되지 않는 문제가 발생했다.

알고봤더니 CORS requests의 경우, 브라우저는 다음과 같이 default로 정의된 response header에만 접근이 가능하다고 한다.

- Cache-Control
- Content-Language
- Content-Type
- Expires
- Last-Modified
- Pragma

따라서 클라이언트에서 default가 아닌 다른 헤더에 접근하고 싶은 경우에는, 서버에서 "Access-Control-Expose-Headers"를 미리 설정해줘야 한다. 우리는 CORS option에 다음과 같이 추가하여 사용하였다.

```javascript
export const corsOption = {
  origin: "*",
  methods: "GET, PUT, PATCH, POST, DELETE",
  exposedHeaders: "*",
}
```

[>> stackoverflow 참고](https://stackoverflow.com/questions/37897523/axios-get-access-to-response-header-fields)

<br />

**2. custom header 적용하기**

드디어 서버로부터 JWT 정보가 담긴 headers를 확인할 수 있게 되었는데, 정작 서버에 다시 요청을 할 때 JWT 정보를 실어 보내줘야할 headers를 어디다 작성해야 하는지 헷갈렸다.

<br />

기존에 Browser API인 fetch를 사용했을 때에는 두 번째 인자에 method, body, headers 등 모든 내용을 key-value 형태로 넣어주었다.

```javascript
fetch(url, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
  },
})
```

<br />

Axios에서는 body와는 별개의 config를 key-value 형태로 작성하여, Get 요청의 경우에는 두 번째 인자로, Post 요청의 경우에는 body 다음 세 번째 인자로 넘겨준다.

```javascript
const config = {
  headers: { "x-access-token": "token-value" },
}
```

```javascript
// axios.get(url, config)
axios.get("https://api.github.com/rental/", config)

// axios.post(url, body, config)
axios.post("/rental", { car_brand: "hyundai" }, config)
```

<br />

아직까지는 이 수준에 그쳤지만, Axios에 대한 긍정적인 평이 많은 만큼, 다음에는 좀 더 수준 높게 사용해 보고 싶다!
