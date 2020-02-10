---
title: Milleporte E-Commerce Site
date: 2020-01-17T20:32:00.000Z
tags: ["e-commerce", "jquery", "api"]
description: Improve the cart to checkout experience on both mobile and desktop
image: /assets/milleporte.png
gif: /assets/milleporte.gif
demo: https://www.milleporte.com/
source: private
category: projects
---

### 프로젝트

- 이름: Milleporte E-Commerce Site
- 기간: 19.12월 - 20.01월 (8주)
- 인원: 2명
- 소개: Cart and checkout improvements

### 담당 역할

Front-end

### 기술 스택

- Client: jQuery, Stylus
- Business Tool: Jira, Adobe XD

### 작업 내용

- jQuery & Ajax 이용, API 통신을 통한 카트 및 체크아웃 동적 페이지 구현
- 쇼핑 시간 카운트다운 타이머 커스터마이징
- 양식 유효성 검사(form validation) 처리 및 자동 완성 기능 구현
- 크레딧카드 BlueGate 인증 및 PayPal 콜백 처리를 통한 결제 플로우 구현
- 인터랙티브한 one-page checkout을 통한 UX 개선

**\*\* 현재 해당 작업 내용은 staging server에 반영된 상태이며, 백엔드 추가 작업으로 인해 production 반영은 추후 진행될 예정입니다. 참고로 현재 데모 링크는 해당 작업 내용이 반영되지 않은 production site 입니다.**

<br />

---

<br />

Rebuilt statically rendered cart & checkout to be dynamic and interactive utilizing jQuery & Ajax, Worked as Front-end

- Improved the cart to checkout experience on both mobile & desktop
- Populated and manipulated the cart & the checkout dynamically via API
- On the cart
  - Implemented cart items and expired items CRUD functions
  - Customized countdown timer for shopping time limit
- Replace the current two page checkout process with a single page checkout
  - Implemented address and payment CRUD functions
  - Handled form validation & auto complete with browser autofill function for credit card and customized autocomplete function for postal code - Handled the payment process with credit card BlueGate authentication & PayPal callback
