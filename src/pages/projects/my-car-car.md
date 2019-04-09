---
title: "Mycarcar"
date: 2019-01-20T15:00:00.000Z
tags: ["team-project", "react", "nodejs", "full-stack"]
description: "A car rental web application, collaborating with a startup company 'Lift29'"
image: /assets/mycarcar.jpg
gif: /assets/mycarcar-rental.gif
demo: http://13.125.130.78
source: https://github.com/codestates/client-lift29-mycarcar-web
category: projects
---

### 프로젝트

- 이름: MyCarCar
- 기간: 3주
- 인원: 2명
- 소개:
  - Lift29 기업 협업 프로젝트, 장기렌탈 웹어플리케이션
  - 기존 PHP 코드의 프로젝트를 React와 Node.js 기반으로 리뉴얼 제안

### 담당 역할

Full-stack (팀원과 client-server 격주로 진행)

### 기술 스택

- Common: TypeScript
- Client: React, React-BootStrap, ImmutableJS
- Server: NodJS(+Express), REST API, JWT
- DB: MySQL, AWS RDS
- Deploy: AWS EC2
- Version Control: Github
- Business Tool: Notion, Slack

### 작업 내용

**_"기존 PHP 코드의 프로젝트를 React + NodeJS 기반으로 전환 작업"_**

- 클라이언트 전체 프로젝트 구조 설계 및 UI 구현
  - 전체 레이아웃
  - 회원가입/로그인/회원정보수정
  - 캐피탈사 예상견적 리스트 및 모달창 담당
- Axios 및 localStorage를 이용한 클라이언트 사이드 User Authentication 구현 담당
- Node.js를 기반으로 한 API 서버 구현 (차량 데이터 관련 장기렌탈 API 담당)
- 차량 데이터 관련 MySQL 데이터베이스 설계 및 마이그레이션 작업
  - NodeJS를 기반으로 서브쿼리 및 조인을 이용하여 기존 데이터를 불러온 다음,
  - 유효한 데이터를 필터링 한 후
  - bulk insert를 통해 데이터 마이그레이션 진행
- ImmutableJS를 이용한 nested data 관리

### 회고

1. 커뮤니케이션의 중요성
2. 타입스크립트 적용
3. 모듈화의 중요성
4. 리팩토링, 그리고 유지보수

<br />

---

<br />

A car rental web application that allows consumers to get an estimate for long-term car rentals without brokerage, collaborating with a startup company 'Lift29'

- Worked as full-stack, Devised React for client-side, CSS & Bootstrap for design, Node JS & Express for sever-side, MySQL for database, AWS for deployment and Typescript for overall
