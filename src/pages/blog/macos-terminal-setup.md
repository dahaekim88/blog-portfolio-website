---
title: "Mac 터미널 셋업: iTerm2 + Zsh"
date: 2019-06-24T19:15:00.000Z
tags: ["terminal", "shell", "setup", "iterm", "zsh", "itermocil"]
category: blog
open: true
---

<br />

개발을 시작하고 난 이후, 내 노트북에서 가장 개발자스러움을 드러내는 소프트웨어 둘 - 바로, iTerm2와 VS Code.
개발자가 되기 전엔 나도 이렇게 시꺼먼 화면만 보면 머리가 아플 거 같았는데, 막상 지금은 이 화면이 이렇게나 익숙해질 줄이야.

처음 시작할 땐 멋모르고 주변 사람들을 따라 터미널, 코드 에디터 등 기본적인 개발 도구들을 조금씩 커스터마이징해 나갔다.
무작정 따라 하다보니 정작 내가 어떤걸 설치했고, 어떻게 설정했는지 기억이 잘 나지 않았다.
그래서 새 회사에서 새로운 기기를 받아 다시 셋팅을 하는 김에 필요한 도구들과 관련 테마들에 대해 정리를 해보았다.

<br />

## iTerm2 

가장 먼저 설치해야 할 것은 바로 iTerm2!
Mac의 터미널을 대체하여 가장 많이 사용하는 오픈 소스 터미널 에뮬레이터로, 커스터마이징을 통해 Mac 내장 터미널보다 훨씬 보기 좋게 만들어 줄 뿐만 아니라, 사용이 편리한 유용한 기능들 덕분에 많이들 사용하는 것 같다.  

### - How to install

```zsh
$ brew cask install iterm2
```

<br />

대체 무슨 기능들이 있기에 iTerm2를 다들 사용하는지 궁금하다면 이 링크에 자세히 설명되어 있다. https://www.iterm2.com/features.html  
다양한 기능 중에서도 가장 유용한 기능 중 하나는 바로 multi-pane이 가능하다는 점!  
양 옆으로 pane을 나누고 싶을 때는 `⌘D`, 위 아래로 pane을 나누고 싶을 때는 `⇧⌘D` 단축키를 사용하면 된다.  
사실 이렇게 iTerm2에서는 여러 개의 탭, 그리고 한 탭 안에서 여러 개의 터미널이 가능하기 때문에, 흔히들 많이 사용하는 tmux를 굳이 추가로 설치하지 않아도 편리하게 사용할 수 있다.

### - itermocil

그 외에 또 유용하게 함께 사용할 수 있는 기능은 바로 itermocil 이다.

우선 이 또한 homebrew로 설치가 가능하다.

```zsh
$ brew install TomAnthony/brews/itermocil
```

그리고 프로젝트별로 itermocil layout들을 저장할 디렉토리를 만든다.

```zsh
$ mkdir ~/.itermocil
```

새로 만든 폴더 내에 `~/.itermocil/test.yml` 이렇게 파일을 추가하여 원하는 레이아웃, 커맨드를 작성하면 된다.  
이 설정 파일은 https://github.com/TomAnthony/itermocil README를 참고하여 쉽게 작성할 수 있다.

마지막으로 이렇게 작성한 파일은 간단하게 아래 명령어로 실행시킬 수 있다.

```zsh
$ itermocil test
```

그러면 아래와 같이 분할된 레이아웃의 터미널 창이 동시에 켜지면서, 원하는 커맨드까지 실행이 되니 일석이조!

![itermoicl](/assets/itermocil.png)

### - Color Schemes

iTerm의 가장 매력적인 요소 중 하나인 컬러 테마 커스터마이징!  

이 링크에서 컬러 팔레트를 확인하여 맘에 드는 테마를 찾은 다음, - https://github.com/mbadolato/iTerm2-Color-Schemes  
여기서 해당 테마의 이름으로 된 `*.itermcolors` 파일을 다운로드 할 수 있다. - https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/schemes  
다운로드한 파일을 iTerm에 드래그하거나, 혹은 Preferences(`⌘,`)/Profiles/Colors/Color Presets/Import 를 하면 테마 적용이 가능하다.

![iterm-color-preset](/assets/iterm-color-preset.png)

하지만 내가 선택한 테마는 이 리스트에는 없는 외부 테마로, CSS-Tricks의 writer로도 활동하는 유명한 Sarah Drasner의 VS Code 테마인 `Night Owl`을 터미널에서도 사용 가능하다. (물론, VS Code에서도 동일하게 사용 중이다.) - https://github.com/jsit/night-owl-iterm2-theme

### - Fonts

폰트 또한 다양하게 변경 가능한데, 그 중 직접 사용해 보고 괜찮았던 폰트는 Adobe사에서 만든 Soure Code Pro (https://github.com/adobe-fonts/source-code-pro)와 ligatures를 예쁘게 보여주는 Fira Code (https://github.com/tonsky/FiraCode)  
.ttf 파일을 다운 받아 설치해도 되고, brew cask로도 설치가 가능하다.
iTerm2에서 설치한 폰트로 변경하고 싶다면, Preferences(`⌘,`)/Profiles/Text 에서 적용 가능하다. 현재 나는 그냥 default 폰트 중 하나인 Menlo를 사용하고 있다. 

![iterm-font](/assets/iterm-font.png)

<br />

## Zsh

Z shell(Zsh)은 MacOS의 디폴트 셸인 bash에 추가적인 기능이 더 부가된 Unix shell이다.  
플러그인, 테마 등 configuration을 통해 커스터마이징이 가능하다.

### - How to install

```zsh
$ brew install zsh
```

### - Oh My Zsh

zsh의 configuration을 관리하기 위한 framework인 `Oh My Zsh`도 함께 설치해 주어야 한다.

```zsh
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

### - Configuration 

zsh의 configuration 파일 `~/.zshrc`에서 모든 설정이 가능하다.

#### Themes

다양한 테마가 있지만 그 중에서 가장 인기가 많은 테마 중 하나인 spaceship을 나는 현재 사용하고 있다. - https://github.com/denysdovhan/spaceship-prompt   
현재 git branch와 repo status 뿐만 아니라 프로젝트에 환경의 버전, 그리고 커맨드 실행시간까지 표시된다.

이렇게 npm install로 설치를 한 다음,

```zsh
$ npm install -g spaceship-prompt
```

`~/.zshrc` 파일에서 ZSH_THEME의 이름만 변경해주면 설정 완료.

```
ZSH_THEME=spaceship
```

#### Plugins

zsh의 강력한 장점 중 하나는 바로 플러그인이다. 그 중에서도 zsh을 사용한다면 아마 모두가 사용하고 있을 플러그인 - `zsh-syntax-highlighting`과 `zsh-autosuggestions`  

syntax-hightlighting은 syntax error를 잡아 하이라이트해주는 플러그인으로 맞으면 녹색, 틀리면 빨간색으로 표시가 된다. 특히, 내 컴퓨터에 해당 모듈이 설치되어 있는지도 이 하이라이트를 통해 손쉽게 파악할 수 있다. - https://github.com/zsh-users/zsh-syntax-highlighting  
autosuggestions은 과거 사용했던 command를 바탕으로 전체 command를 제안해준다. 따라서 긴 command를 다 타이핑하지 않고도, 손쉽게 command를 완성할 수 있다. - https://github.com/zsh-users/zsh-autosuggestions  

이제는 이 두 플러그인이 없다면 어떻게 터미널을 사용할까 싶다.  

플러그인 추가 또한 `~/.zshrc`에서 아래와 같이 설정해주면 완료.  

```
plugins+=(
  zsh-syntax-highlighting
  zsh-autosuggestions
)
```

#### Alias

zsh에는 기본적으로 내장되어 있는 alias가 있어서 가장 많이 사용하는 git 명령어의 경우에는 따로 설정없이 built-in alias를 사용하고 있다.  
alias는 터미널에서 직접 `alias` 라고 치면 리스트를 볼 수 있으며, 혹은 다음 링크에서도 확인이 가능하다. - https://github.com/ohmyzsh/ohmyzsh/wiki/Cheatsheet  

여기에 내장되어 있지 않은 alias의 설정 또한 `~/.zshrc` 파일에서 모두 가능한데, 개인적으로는 alias 사용을 즐기진 않는다.  
간혹 내 컴퓨터가 아닌 다른 환경에서 작업을 해야하는 경우, alias에 너무 익숙해져 있어서 full command line이 생각나지 않는 경우가 종종 있기 때문이다.  

거의 유일하게 쓰는 alias는 바로 앞서 말한 itermocil인데, 설정은 다음과 같이 하면 된다.

```
alias io='itermocil'
```

<br />

## Git - Language Issue

이렇게 전반적으로 터미널 셋팅을 다시 다 하고 나니, 갑자기 터미널에서 git 언어가 한글로 변경되는 이슈가 발생했다.  
어쩌다가 변경된건지는 모르겠으나, 아마도 git 버전이 변경되면서 시스템의 언어를 감지해서 변역하는 기능이 추가된 듯 했다.  

이 문제를 해결하기 위해서는 시스템 언어를 감지하는 명령어인 gettext 기능없이 설치하거나, 혹은 직접 brew git 설치 명령어를 변경해야 한다.

나는 결국 기존의 git을 삭제한 후, 다음과 같이 설치 옵션을 변경한 다음 다시 git을 설치하였다.

```zsh
$ brew uninstall --ignore-dependencies git
$ brew edit git

<<<
- depends_on "gettext"
+ depends_on "gettext" => :optional
<<<
- args = %W[
+ ENV["NO_GETTEXT"] = "1" if build.without? "gettext"
+
+ args = %W[
<<<

$ brew install -s git
```

혹은 임시방편으로 이렇게 수정하는 경우도 있다고 하는데, 혹시나 하는 마음에 기록용으로 남겨놓기.

```
alias git="LANG=\"en_US.UTF-8\" git"
```

<br />

[Reference]
https://sourabhbajaj.com/mac-setup/iTerm/zsh.html  
https://www.freecodecamp.org/news/jazz-up-your-zsh-terminal-in-seven-steps-a-visual-guide-e81a8fd59a38/