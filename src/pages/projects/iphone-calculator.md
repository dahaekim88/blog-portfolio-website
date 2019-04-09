---
title: "iPhone Calculator"
date: 2018-10-16T15:00:00.000Z
description: "iPhone Calculator that can be operated by both keyboard and mouse."
tags: ["vanilla javascript", "individual-project"]
image: /assets/calculator.jpg
gif: /assets/calculator.gif
demo: https://dahaekim88.github.io/Calculator/
source: https://github.com/dahaekim88/Calculator
category: projects
---

### 프로젝트

- 이름: iPhone Calculator
- 소개:
  - 연습용 개인 프로젝트
  - 키보드 및 마우스로 작동되는 아이폰 테마 계산기

### 기술 스택

- Vanilla Javascript
- HTML5
- CSS

### 작업 내용

- HTML의 `data-*` 속성을 사용하여,
  - 각 숫자 및 연산자에 적합한 값 표시
  - 연속 연산에 따른 상태 저장 (직전에 클릭한 버튼값, 연산의 첫번째 값 등)
- DOM API를 사용하여,
  - keyup 이벤트에 의해 눌러진 키보드값에 해당하는 버튼의 element 가져와 계산
  - `element.classList` 를 통해 class값을 add & remove 함으로써 눌러진 버튼에 대한 스타일 적용

<br />

---

<br />

iPhone themed calculator that can be operated by both keyboard and mouse.

Still working on calculation & display of large numbers and thousands seperators.

- Devised Vanilla Javascript to achieve comprehensive operation logic
