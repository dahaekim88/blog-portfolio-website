---
title: SNS Crawler
date: 2019-08-24T22:05:00.000Z
tags: ["crawler", "puppeteer", "headless", "electron", "react", "automation"]
description: Internal crawling tool to automate the task of retrieving the data from social media into Excel spreadsheets
image: /assets/crawler.png
gif: /assets/crawler.gif
demo: private
source: private
category: projects
---

### 프로젝트

- 이름: SNS Crawler
- 기간: 19.08월, 20.2월 (2주)
- 인원: 1명
- 소개: 업무 자동화를 위한 회사 내부용 SNS 크롤링 툴

### 기술 스택

- Client: React, RxJS
- Server: NodeJS
- Framework & Library: Electron, Puppeteer

### 작업 내용

- Headless chrome API를 사용하여, 페이스북 페이지 포스트 데이터 및 카카오 플러스친구 센터의 마케팅 결과 데이터 수집 자동화
- 수집한 데이터를 기반으로 Excel spreadsheet 작성 & 파일 다운로드 제공
- SNS 로그인 정보 수집 입력 양식 및 엑셀 파일 다운로드를 위한 Electron App 내 React 기반의 사용자 화면 구성

<br />

---

<br />

A desktop app for task automation that crawls the data from social media and create Excel spreadsheets

- Automated data crawling with Puppeteer and manipulated Excel spreadsheets based on the data crawled by headless Chrome
- Handled to pass reCaptcha with manual login option
- Implemented React based UI for input fields & exporting excel files on Electron
