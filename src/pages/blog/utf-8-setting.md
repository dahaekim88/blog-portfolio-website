---
title: "비영어권의 서러움 (feat. UTF-8)"
date: 2019-01-12T23:11:00.000Z
tags: ["utf-8", "encoding"]
category: blog
open: true
---

<br />

### ASCII vs. UNICODE

기본적으로 문자나 기호를 컴퓨터에 저장하거나, 통신 목적으로 사용할 경우에는 컴퓨터가 알아들을 수 있게 부호로 바꾸어 주어야 하는데, 이를 `인코딩(encoding)` 이라고 한다.

- **ASCII 코드**  
  7비트로 표현되는 미국에서 정의한 표준화 부호체계로, 숫자/영문 알파벳/특수기호 등이 할당되어 있는 총 128개의 고유값을 담고 있다. 즉, 이는 '영문' 키보드로 입력할 수 있는 모든 가능성을 담고 있을 뿐, 이를 이용해 다른 언어를 표현하기에는 7비트로는 부족하다.

- **유니코드**  
  앞서 말했듯이, 알파벳을 사용하지 않고 고유의 문자를 사용하는 국가들, 특히 한국, 중국, 일본 등과 같은 국가에서는 ASCII 코드가 매우 제한적이기 때문에, 그래서 등장하게 된 것이 바로 유니코드(Unicode)이다. 이는 전 세계 언어의 문자를 정의하기 위한 국제 표준 코드이다.

- **UTF-8**  
  이러한 코드(부호)로 문자 인코딩을 하기 위한 형태 중 하나로 사용되는 것이 UTF-8로, 유니코드 코드 포인트를 8비트 숫자의 집합으로 변환하는 방법이다.

### API URL에 한글 사용 시

URL에는 최대한 한글을 사용하지 않는 것이 좋겠지만, 어쩔 수 없는 경우 params로 한글을 넘기게 된다면 어떻게 해야할까?
자바스크립트 내장 메서드인 `encodeURI()` 와 `decodeURI()` 를 사용하여 클라이언트와 서버가 서로 주고 받을 수 있다.

하지만 막상 개발하는 도중 postman에서 테스트를 하려고 보니, 거기서는 또 한글이 깨지는 문제가 발생하였다.
그 때 사용 가능한 방법이 바로, postman에서 제공해주는 `Pre-request Script`를 사용하여 decode가 가능했다.

<br />

Pre-request Script는 다음과 같은 형식으로 작성이 가능하며,

```javascript
pm.environment.set("variable-key", "variable-value")
// pm.environment.set("origin", encodeURI("korea"));
```

<br />

이를 URL 또는 header 에서 `{{variable-value}}` 형태로 사용 가능했다.

![postman-pre-request-script](/assets/pre-request-script.png)

### MySQL charset 설정

MySQL은 로컬에서 설치할 때에는 기본적으로 charset이 UTF-8로 설정되어 있는 듯 한데, AWS RDS 서버를 띄울 때에는 반드시 파라미터 그룹을 통해 UTF-8 인코딩 설정을 해줘야 한다.

<br />

AWS Management Console 에 우선 접속한다.

- **RDS 파라미터 그룹 메뉴에서**

  1. 그룹 생성 후 편집(Edit) 클릭
  2. `character` 필터 후 모두 `utf8` 로 값 변경
  3. `collation` 필터 후 `utf8_general_ci` 로 값 편집 후 저장

- **RDS 인스턴스의 고급설정에서**

  DB 파라미터 그룹을 새로 설정한 파라미터 그룹으로 변경한 후 RDS 인스턴스를 리부팅 해주면 적용 완료!

**하지만! character 설정을 했는데도 한글이 깨지는 경우**  
`character-set-client-handshake` 파라미터 값을 `0(false)` 로 설정해 주어야 한다.

<br />

또한 테이블 생성시에도 반드시 `DEFAULT CHARSET=utf8mb4` 옵션을 추가해주어야 한글이 깨지지 않는다.

```sql
CREATE TABLE car_brand (
	car_brand_id INT PRIMARY KEY AUTO_INCREMENT,
    car_brand VARCHAR(45) NOT NULL,
    car_origin VARCHAR(45) NOT NULL
) DEFAULT CHARSET=utf8mb4;
```

<br />

#### [Reference]

https://whatisthenext.tistory.com/103
