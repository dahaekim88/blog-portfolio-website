---
title: "코드 에디터 셋업: VS Code"
date: 2019-06-29T21:43:00.000Z
tags: ["editor", "setup", "vscode"]
category: blog
open: true
---

<br />

개발을 시작하면서 터미널과 함께 가장 많이 사용하는 도구는 다름 아닌 바로 VS Code.  
아무래도 코드를 직접 작성하면서 계속 오랜 시간 머무는 곳인 만큼, 나에게 최대한 편한 환경을 셋팅하는 것이 중요하다.

## Install 'code' command

---

가장 먼저 `code` 커맨드를 이용해 터미널 어디서든 VS Code로 소스코드 파일을 열어볼 수 있도록 설정한다.  
VS Code를 열고 `⇧⌘p` 단축키를 통해 command palette를 열어 아래와 같이'shell command'를 타이핑하여 'Shell Command: Install 'code' command in PATH'를 선택하면 완료.

![shell-command](/assets/shell-command.png)

## Extension List

---

VS Code를 더욱 유용하게 사용할 수 있도록 도와주는 확장 프로그램들, 그 중에서도 가장 필수적이라고 생각되는 것들만 모아 리스트업 해보았다.

> ### Code theme & highlight

'보기 좋은 떡이 먹기도 좋다' 라는 표현은 어디서든 통하나 보다. 코드 역시 예쁜 컬러와 폰트가 더해지면 훨씬 더 잘 읽힌다.

#### Night Owl

우선 이전 [터미널 셋업 포스팅](/blog/macos-terminal-setup)에서도 언급했듯이, Sarah Drasner의 VS Code 테마 `Night Owl`을 사용하고 있다.  
컬러가 쨍하면서도 한편으로는 또 눈을 편안하게 해주는 color scheme으로, 지금껏 사용했던 테마 중 가장 만족스럽다.

![package-night-owl](/assets/package-night-owl.png)

#### Better Comments

눈에 잘 띄지 않는 주석을 타입별로 다양하게 하이라이팅 해주는 익스텐션으로, 아래 이미지에서 보다시피 Alerts, Queries, TODOs 등 꼭 확인해야 하는 내용의 주석들을 눈에 띄게 만들어 쉽게 다시 확인이 가능하다.

![package-better-comments](/assets/package-better-comments.png)

#### Bracket Pair Colorizer

복잡한 코드를 작성하다보면 어느 샌가 어디서 시작된 괄호가 어디서 끝나는지 쉽게 파악하기 힘든 경우가 많다. 이 익스텐션은 아래 이미지처럼 각 bracket을 pair 별로 컬러를 달리 하여 헷갈리지 않도록 도와준다.

![package-bracket-pair-colorizer](/assets/package-bracket-pair-colorizer.png)

> ### Code formatter & Linter

팀 프로젝트 진행시 반드시 필수적인 요소인 Code formatter와 Linter는 npm으로 설치할 수도 있지만, 이렇게 에디터에서 지원되는 플러그인으로도 설치가 가능하다.  
깔끔하고 통일감 있는 코드를 굉장히 선호하는 1인으로서, 개인 프로젝트건 팀 프로젝트건 항상 일관된 규칙이 적용되었으면 하는 마음에 에디터에도 설치를 해두었다.

이렇게 일관된 코드 스타일을 유지시켜주는 Code formatter 중 가장 대표적인 `Prettier`와 코딩 스타일 가이드 뿐만 아니라 런타임 전에 기본적인 syntax error 등을 체크해주는 Linter인 `ESLint`를 함께 사용하면 깔끔하고 통일감 있는 코드 덕분에 코드 품질도 좋아지고 유지보수에도 좋다.

레거시 프로젝트 중에서 이런 설정이 되어 있지 않은 것들을 작업하다 보면, 항상 서로 다른 스타일 때문에 쓸데없는 git diff가 많이 발생하는데, 이런 부분을 모두 제거할 수 있다. 하지만 이러한 레거시 프로젝트에서를 작업하다 보면 VS Code에 설치된 formatter 때문에 쓸데없는 git diff가 많이 발생하기도 하는데, 전체적으로 룰을 적용하기 힘든 경우에는 이를 피하기 위해 workspace만 disable 하여 사용하기도 한다.

#### Prettier

![package-prettier](/assets/package-prettier.png)

#### ESLint

![package-eslint](/assets/package-eslint.png)

#### EditorConfig

이 뿐만 아니라, 기본적으로 VS Code에 내장된 설정 파일의 룰이 각자 다른 경우에도 이런 문제를 예방하기 위해 workspace 세팅을 오버라이드 해주는 EditorConfig 플러그인이 있다.  
따라서 , 코드 포맷이 적용되는 우선 순위는 다음과 같다. `settings.json < .editorconfig < .prettierrc`

![package-editorconfig](/assets/package-editorconfig.png)

#### Prettify JSON

JSON 파일을 보기 좋게 formatting 해주는 플러그인도 때때로 유용하다.

![package-prettify-json](/assets/package-prettify-json.png)

> ### Git

프로젝트를 하면서 뗄레야 뗄 수 없는 또 하나는 바로 Git.

#### GitLens

파일 내에서 line별로 history 확인이 가능한 플러그인으로, `git blame` 의 역할을 파일 전체에서 해준다.
커서가 있는 줄에 작성자/날짜/커밋메시지 순으로 내역을 바로 보여주기 때문에, 누가 언제 어떤 의도에서 해당 코드를 작성했는지를 확인함으로써 전반적으로 코드를 더 잘 파악할 수 있게 된다.

![package-gitlens](/assets/package-gitlens.png)

#### Git History

GitLens로도 사이드바에서 전반적인 history가 확인이 가능하지만, 이를 좀 더 그랙픽적으로 보고 싶은 경우 사용하면 좋은 플로그인으로, Git GUI 대용으로 에디터 내에서 간단하게 git log를 확인하고 커밋 단위로 파일별 비교를 위해 자주 사용하고 있다.

![package-git-history](/assets/package-git-history.png)

### # Intellisense

코드 작성 시 자동완성 기능으로 오타 가능성도 줄이고 작성 속도도 빨라져 작업의 효율성을 굉장히 증대시켜주는 intellisense 관련 익스텐션 또한 굉장히 다양하게 나와있다.

#### Visual Studio IntelliCode

먼저 VS Code를 만든 Microsoft에서 직접 개발한 AI 기반의 intellisense 익스텐션으로, 현재 Python, JS/TS, Java 언어를 지원하고 있으며, 머신러닝을 통해 작성 중인 코드의 문맥에 맞게 자동 완성 내용을 제안해준다. 이런 자동완성 기능이 나날이 발전하다 보면, 언젠간 개발자들이 코드를 작성하지 않고 AI가 코드를 모두 작성하는 날도 오지 않을까 싶다.

![package-intellicode](/assets/package-intellicode.png)

#### Path Intellisense

파일이나 이미지 등의 경로를 지정할 때 자동으로 경로를 선택하여 지정할 수 있게 해줌으로써, 복잡한 경로를 찾느라 시간을 쓸 필요도 없고 쓸데없는 오타를 방지해 주는 유용한 익스텐션이다.

![package-path-intellisense](/assets/package-path-intellisense.png)

#### Node Modules Intellisense

import문 안에서 JS, TS 모듈을 자동완성 시켜주는 기능. 이 또한 복잡한 프로젝트 작업 시 매우 유용하다.

![package-node-modules-intellisense](/assets/package-node-modules-intellisense.png)

> ### Setting sync

마지막으로 최근에 새로운 장비에서 VS Code를 셋업하면서 사용해 본 매우 유용한 익스텐션!  
다른 장비에서 VS Code를 새로 설치하여 작업하게 되는 경우, 처음부터 하나하나 다시 셋팅을 할 필요없이 기존의 설정 환경을 그대로 재구현할 수 있도록 해주는 플러그인이다.

GitHub에서 Personal access tokens을 발급받은 후, 기존의 VS Code 셋팅을 업로드 한 다음, 새로운 기기에서 그 셋팅을 다운로드 받으면 끝! 이렇게 간단하게 셋팅을 끝낼 수 있다. (자세한 내용은 [여기](https://itnext.io/settings-sync-with-vs-code-c3d4f126989) 참고)

![package-settings-sync](/assets/package-settings-sync.png)
