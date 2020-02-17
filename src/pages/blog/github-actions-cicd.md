---
title: "Github Actions로 CI/CD 구축하기 - 리액트 앱 S3 베포"
date: 2020-02-10T20:46:00.000Z
tags: ["github", "actions", "cicd", "deploy", "s3", "react"]
category: blog
open: true
---

<br />

기존의 프로젝트들을 진행할 때면, 빠른 대응성 및 편의성 추구를 위해 주로 Circle CI 또는 Travis CI, Jenkins 등을 통해 항상 CI/CD가 구축되어 있었다. 현재 작성 중인 이 블로그 또한 처음 프로젝트 셋업 때부터 Netlify를 통해 구축하였기에, Netlify에서 제공되는 CI/CD를 통해 자연스럽게 통합 및 배포 자동화를 하게 되었다. 그렇다 보니 한 번도 직접 CI/CD 셋업을 해본 적이 없어서, 이번에 개인적으로 공부 겸 사이드 프로젝트를 시작하는 김에 셋업을 시도해보기로 했다.  

그런데 마침 최근 Github에서도 CI/CD를 지원한다는 반가운 소식에, Github Actions를 통하여 리액트 앱 빌드부터 AWS S3 배포까지의 과정을 CI/CD로 구축해 보았다.

(기본적으로 리액트 프로젝트 셋업 및 AWS S3 버킷 & IAM 설정은 모두 완료되었다는 가정 하에 Github Actions에만 집중하여 정리하였다)

<br />

## Github Actions

--- 

깃헙 액션은 작년 말부터 본격적으로 워크플로우 자동화를 지원하기 시작했는데, 기존에 코드를 관리하고 있는 깃헙의 레포지토리에서 빌드-테스트-배포까지의 모든 과정(=workflow)을 한 번에 실행하고 그 결과에 대한 로깅 또한 깃헙에서 실시간으로 확인 가능하다는 점이 단연코 매력적일 수 밖에 없다.  

우선 깃헙 액션을 통한 CI/CD는 깃헙 레포지토리에서 아주 간단하게 기본 셋업을 할 수 있다. (물론 바로 코드 상으로도 적용이 가능하다.)

이렇게 깃헙 레포지토리에 들어가면 상단 메뉴의 한 가운데 `Actions`라는 메뉴가 있다.

![github-menu](/assets/github-menu.png)

<br />

이를 클릭하고 들어가면 다음과 같은 화면이 나오는데, 기존에 이미 작성되어 있는 워크플로우를 재사용하여 바로 셋업하거나 혹은 우측 상단에 `Set up a workflow yourself`라는 버튼을 클릭하여 직접 워크플로우를 작성할 수도 있다.  

![github-actions](/assets/github-actions.png)

<br />

직접 워크플로우를 작성하기 위해 버튼을 클릭하면, 레포지토리의 루트 디렉토리에 `.github/workflows`라는 폴더를 만들고 그 안에 YAML 형식의 워크플로우 설정 파일이 샘플 코드와 함께 생성된다. 

![github-actions-workflow](/assets/github-actions-workflow.jpeg)

<br />

이 기본 샘플 코드를 보면, `Workflow`에 정의된 액션들은 특정 이벤트(`on`)에 의해 실행 되며, 여러 개의 `Job`이 각 `Step` 별로 구성되어 있음을 확인할 수 있다.

> #### Event

액션을 실행시키는 조건을 설정하는 것으로, 예를 들어 해당 레포지토리에 push 된 경우, 또는 PR을 날렸을 때, 혹은 특정 브랜치에 변경사항이 발생하였을 때 등과 같이 조건을 줄 수 있다. 

> #### Job

Job은 가상환경 인스턴스(리눅스, 맥, 윈도우 등)에서 각 Step별 명령어를 순차적으로 실행하는 역할을 한다.

> #### Step

Step은 `Uses`와 `Run`으로 작업 단위가 나뉘는데, Uses는 이미 정의된 명령어를 가져와 실행하는 것이고, Run은 가상환경 내에서 실행시킬 스크립트를 직접 작성할 수 있다.

<br />

## Github Actions - 리액트 빌드하기

---

이러한 컨셉들을 기반으로 다음과 같이 코드를 변경해 보았다.

```yaml
name: React build
on: 
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-18.04
    steps:
      - name: Checkout master
        uses: actions/checkout@master

      - name: Install dependencies
        run: npm install

      - name: Build 
        run: npm run build
```

우선 전체 워크플로우에 대한 이름은 `React build`로 지정하였으며, `master` 브랜치에 코드가 `push`된 경우에만 워크플로우가 실행되도록 설정하였다.  

`build`라는 ID 값을 지니는 Job을 추가하였으며, 실행시킬 가상환경 인스턴스로는 `ubuntu-18.04`를 선택하였다. 그 다음 '이름 + 스크립트'를 세트로 가지는 스텝을 총 세 단계로 나열하였는데, 첫 번째 스텝은 master 브랜치로 이동하는 단계로 깃헙 액션에서 제공해주는 [checkout 액션](https://github.com/actions/checkout)을 불러와서 사용해주었다. 그 다음으로는 `npm install` 스크립트로 의존성 파일을 설치해 주고, `package.json` 파일에 정의되어 있는 빌드 스크립트 `npm run build`를 실행해 주면, 깃헙에 코드가 push되고 리액트 앱이 build되기 까지의 과정이 자동화된 것이다.

<br />

## Github Actions - node modules 캐싱하기

---

하지만 여기서 매번 Workflow를 실행할 때마다 의존성 파일을 새로 설치하는 것은 매우 비효율적이다. 그래서 `node_modules`를 캐싱하는 기능을 추가함으로써 워크플로우 실행 속도를 개선시킬 수 있다.  

`Install dependencies` 스텝 앞 단계에 다음과 같은 코드를 추가한다.  

```yaml
- name: Cache node modules
  uses: actions/cache@v1
  with:
    path: node_modules # 캐시를 저장하거나 복원할 디렉토리
    key: ${{ runner.OS }}-build-${{ hashFiles('**/package-lock.json') }} # 캐시를 저장하거나 복원할 때 사용되는 유니크한 키 값
    restore-keys: | # 키 값이 기존의 캐시와 일치하지 않는 경우 사용되는 대체 키 값 리스트(optional)
      ${{ runner.OS }}-build-
      ${{ runner.OS }}-
```

이 또한 [cache 액션](https://github.com/actions/cache)을 불러와서 사용할 수 있는데, 캐시 액션은 `key` 값을 가지고 캐시를 검색하고, 1) 이미 해당 키 값을 가진 캐시가 있는 경우 설정한 `path`에 캐시된 파일들을 restore 시켜준다. 2) 만약 동일한 키 값을 가진 캐시를 찾지 못하는 경우에는, 먼저 `restore-keys`가 존재하면 순서대로 일치되는 키 값을 검색하여, 이전에 저장된 캐시 중 가장 최근의 키 값을 가져와 불러오거나, 여기서도 없는 경우에는 종료하고 다음 스텝(의존성 파일 설치)으로 넘어간다. 3) 해당 스텝을 성공적으로 완료하면, 액션이 새로운 캐시를 생성하여 저장시켜준다.

여기서 `hashFiles('**/package-lock.json')`은 package-lock.json 파일을 해시화하는 부분으로, 즉 키 값이 `linux-build-해시값` 형태로 저장되게 된다. 이는 동일한 의존성 파일이면 해시값도 동일하게 나오기 때문에 새로운 key를 만들지 않고 기존의 캐시를 불러올 수 있게 되는 것이다. 하지만 새로운 모듈이 추가되면 `package-lock.json` 파일에도 변경사항이 발생하기 때문에 해시값이 바뀌므로 키 값도 변경이 되어 새롭게 캐싱을 하게 되는 것이다.

<br />

이 워크플로우를 실행시켜보면, 첫 실행에서는 아직 `npm install`이 실행되기 전이므로 당연히 해당 키 값으로 저장된 cache를 찾을 수 없다는 로그를 다음과 같이 확인할 수 있다.  

![github-actions-cache-not-found](/assets/github-actions-cache-not-found.png)

<br />

하지만 다시 실행을 하는 경우에는, 이전에 이미 실행하여 저장된 `node_modules` 캐시가 존재하기 때문에 해당 키 값에 저장된 캐시를 restore 한다. 이렇게 하면 이 전에 총 `26s` 걸렸던 시간이 캐시 검색하여 가져오고(`2s`) 다시 의존성 파일 설치 스텝(`12s`)을 거친다고 해서 총 `14s`로 시간이 단축되었음을 확인할 수 있다. 아마 프로젝트가 커지면 커질 수록 시간 단축의 효율성을 절감할 수 있을 것 같다.  

![github-actions-cache-restored](/assets/github-actions-cache-restored.png)

<br />

## Github Actions - AWS 시크릿 저장 및 S3 배포하기

---

마지막으로 이렇게 빌드한 리액트 앱을 AWS S3에 배포하는 작업을 추가해야 하는데, 그 전에 AWS IAM을 통해 CLI로 버킷에 접근하기 위한 권한(`AmazonS3FullAccess`)을 부여받아 액세스 키 ID와 비밀 액세스 키를 반드시 저장해두어야 한다.  

이와 같은 민감한 정보들은 다음과 같이 깃헙의 `Settings` 메뉴 내 `Secrets` 탭에다가 저장할 수 있다.

![github-settings-secrets](/assets/github-settings-secrets.png)

<br />

이렇게 기본 셋업이 완료되었으면, 다시 워크플로우 파일에 다음과 같이 코드를 추가한다.

```yaml
- name: Deploy to S3
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  run: |
    aws s3 cp \
      --recursive \
      --region ap-northeast-2 \
      dist s3://recipe-box-react
```

앞서 깃헙 셋팅을 통해 저장해 둔 AWS 시크릿은 `secrets` 컨텍스트를 통해 불러와 environment variables로 사용할 수 있다. 또한 깃헙 액션 내부적으로 aws-cli가 이용 가능하기 때문에, 별도의 설치 필요없이 바로 `aws` 커맨드를 사용할 수 있다. 커맨드는 자신이 설정한 버킷의 region 및 버킷 이름에 맞게 수정하고, S3 버킷으로 복사할 빌드 파일의 경로(여기선 `dist`) 또한 수정해 주면 완료!

<br />

## 최종 파일

---

```yaml
name: React build
on: 
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-18.04
    steps:
      - name: Checkout master
        uses: actions/checkout@master

      - name: Cache node modules
        uses: actions/cache@v1
        with:
          path: node_modules
          key: ${{ runner.OS }}-build-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.OS }}-build-
            ${{ runner.OS }}-

      - name: Install dependencies
        run: npm install

      - name: Build 
        run: npm run build

      - name: Deploy to S3
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws s3 cp \
            --recursive \
            --region ap-northeast-2 \
            dist s3://recipe-box-react
```

#### [Reference]

https://github.blog/2019-08-08-github-actions-now-supports-ci-cd/
https://help.github.com/en/actions/configuring-and-managing-workflows/caching-dependencies-to-speed-up-workflows