# 어드벤쳐 디자인 프로젝트 "스마트 차수판"

<img src="/img/screenshot01.png"/>

### 목차
- [**프로젝트 소개**](#프로젝트-소개)
- [**기술스택과 아키텍쳐**](#기술스택과-아키텍쳐)
   - [프론트엔드](#프론트엔드)
   - [서버와 아두이노](#서버와-아두이노)
   - [배포와 기타](#배포와-기타)
- [**실행하기**](#실행하기)
   - [도커로 실행](#도커로-실행)
   - [Node.js로 실행](#nodejs로-실행)
- [**폴더 구조**](#폴더-구조)

## 프로젝트 소개
스마트 차수판 프로젝트는 동국대학교 2024년 2학기 어드벤처 디자인 수업을 위해 기획되었습니다. 이 프로젝트의 주제는 홍수나 침수 상황에서 자동으로 작동하는 차수판 시스템을 개발하여 인명 및 재산 피해를 최소화하는 것입니다.

기존의 차수판은 수동으로 조작해야 하며, 긴급 상황에서 신속한 대응이 어렵다는 한계가 있습니다. 이를 개선하기 위해 IoT 기술과 웹 애플리케이션을 결합한 스마트 차수판을 설계하였습니다. 이 시스템은 실시간으로 날씨와 수위 정보를 모니터링하고, 필요에 따라 자동으로 차수판을 제어합니다. 또한, 사용자에게 푸시 알림을 제공하여 긴급 상황에 대한 빠른 대처가 가능하도록 하였습니다.

## 기술스택과 아키텍쳐
![img](/img/architecture.png)

### Next.js 기반 PWA 프론트엔드
![stacks](https://go-skill-icons.vercel.app/api/icons?i=nextjs,tailwindcss,typescript)
프론트엔드는 Next.js, Tailwind CSS, TypeScript를 사용하여 개발되었으며, PWA(Progressive Web App)로 구현되었습니다.
- 서비스 워커 및 웹 푸시 알림: 서비스 워커를 활용하여 포그라운드와 백그라운드에서 모두 웹 푸시 알림을 받을 수 있도록 설정하였습니다.
- Firebase Cloud Messaging(FCM): 디바이스 토큰을 Firebase Store에 저장하고, FCM을 통해 실시간 알림을 제공합니다.
- 아두이노 제어 및 상태 모니터링: 서버와의 API 통신을 통해 아두이노의 상태를 확인하고 제어할 수 있습니다.

### Node.js 기반 아두이노 미들웨어 서버
![stacks](https://go-skill-icons.vercel.app/api/icons?i=javascript,nodejs,express,arduino)
서버는 Node.js와 Express를 기반으로 구축되었으며, 아두이노와의 통신을 담당하는 미들웨어 역할을 합니다.
- Serial Port 통신: `serialport` 패키지를 사용하여 아두이노와 시리얼 통신을 구현하였습니다.
- 상태 체크 및 명령 송수신: 아두이노의 상태를 실시간으로 모니터링하고, 제어 명령을 송수신합니다.
- 웹 푸시알림: 아두이노의 상태 변화나 이벤트 발생 시 Firebase Admin SDK를 통해 FCM 푸시 알림을 발송합니다.

### 배포와 기타
![stacks](https://go-skill-icons.vercel.app/api/icons?i=vercel,docker,firebase)
- 프론트엔드는 `vercel`을 통해 배포
- 백엔드는 도커 이미지로 제작했지만, 아두이노의 미들웨어 역할도 해야 하기에 로컬에서 호스팅
- `localtunnel`을 사용하여 `https://adventure-design.loca.it` 등의 주소로 외부에서 요청을 보낼 수 있게 만듬
- `Firebase`의 `Cloude Message`를 사용해 푸시 알림 구현

### 전체 아키텍처 흐름
1. 사용자 인터페이스: 사용자는 PWA로 구현된 웹 앱을 통해 차수판의 상태를 확인하고 제어 명령을 내립니다.
2. 서버와의 통신: 웹 앱은 서버의 API를 호출하여 아두이노와 통신합니다.
3. 아두이노 제어: 서버는 아두이노와 시리얼 통신을 통해 명령을 전달하고, 상태 정보를 수신합니다.
4. 실시간 알림: 아두이노에서 중요한 이벤트가 발생하면 서버는 FCM을 통해 사용자에게 푸시 알림을 전송합니다.

## 실행하기

### 도커로 실행
```sh
git clone https://github.com/karpitony/adventure-design.git
cd server

docker build -t node-server .
docker run --rm -it -p 8080:8080 node-server
```

### Node.js로 실행
```sh
git clone https://github.com/karpitony/adventure-design.git
cd server

npm install -g localtunnel
lt --port 8080 --subdomain adventure-design-a1234
npm start
```

## 폴더 구조
```
adventure-design/
├─ .gitattributes
├─ .gitignore
├─ README.md
├─ next-pwa/                      # Next.js 기반 Progressive Web App (PWA) 폴더
│  ├─ .env.example                # 환경변수 예제 파일
│  ├─ .env.local                  # 환경변수 파일
│  ├─ .gitignore
│  ├─ README.md
│  ├─ app/                        # Next.js App Router 폴더
│  │  ├─ api/                     # Next.js API 경로
│  │  │  ├─ arduino/              # 아두이노 API 폴더
│  │  │  │  ├─ down/              # 차수판 내리는 API
│  │  │  │  │  └─ route.ts
│  │  │  │  ├─ status/            # 차수판 상태 확인 API
│  │  │  │  │  └─ route.ts
│  │  │  │  └─ up/                # 차수판 올리는 API
│  │  │  │     └─ route.ts
│  │  │  ├─ saveToken/            # Firebase FCM 디바이스 토큰 저장 API
│  │  │  │  ├─ global.d.ts        # 전역 타입 정의 파일
│  │  │  │  └─ route.ts           # 디바이스 토큰 저장 API 라우트
│  │  │  └─ weather/              # 날씨 정보를 제공하는 API 폴더
│  │  │     └─ route.ts           # 날씨 API 라우트
│  │  ├─ favicon.ico              # 브라우저 탭 아이콘
│  │  ├─ globals.css              # 전역 CSS 파일
│  │  ├─ layout.tsx               # Next.js App 루트 레이아웃 파일
│  │  ├─ manifest.ts              # PWA manifest.json 생성 파일
│  │  └─ page.tsx                 # 메인 페이지
│  ├─ components/                 # Next.js 컴포넌트 폴더
│  │  ├─ ArduinoControl.tsx       # 아두이노 상태 관리 및 컨트롤 컴포넌트
│  │  ├─ ForegroundPush.tsx       # Firebase Foreground Push 알림 처리 컴포넌트
│  │  ├─ Notification.tsx         # 알림 권한 및 디바이스 토큰 관리 컴포넌트
│  │  ├─ Weather.tsx              # 날씨 정보 및 위치 정보 처리 컴포넌트
│  │  └─ common/                  # 공통 컴포넌트 폴더
│  │     ├─ ControlButton.tsx     # 상호작용 버튼 컴포넌트
│  │     ├─ LinkCard.tsx          # 링크 버튼 카드 컴포넌트
│  │     ├─ MainCard.tsx          # 메인 내용을 담은 카드 컴포넌트
│  │     └─ Toast.tsx             # Toast 알림 컴포넌트
│  ├─ config/                     # 설정 파일 폴더
│  │  ├─ Firebase.ts              # Firebase 초기화 및 설정 파일
│  │  ├─ WeatherIcons.ts          # 날씨 상태별 아이콘 매핑
│  │  ├─ firebase-service-account-example.json   # Firebase 서비스 계정 예제 파일
│  │  └─ firebase-service-account.json           # Firebase 서비스 계정 정보
│  ├─ libs/                       # 라이브러리 및 유틸리티 폴더
│  │  ├─ GetFcmToken.ts           # Firebase FCM 토큰 요청 및 관리
│  │  └─ ServiceWorker.ts         # PWA용 서비스 워커 등록
│  ├─ next-env.d.ts               # Next.js 환경 변수 타입 정의
│  ├─ next.config.ts              # Next.js 설정 파일
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.mjs          # Tailwind CSS 설정 파일
│  ├─ public/                     # 정적 파일 폴더
│  │  ├─ 3d-bell-icon.avif        # 알림 아이콘 이미지
│  │  ├─ firebase-messaging-sw.js# Firebase 서비스 워커 파일
│  │  └─ fonts/                   # 폰트 파일 저장 폴더
│  │     ├─ CookieRunBold.otf
│  │     ├─ CookieRunBold.ttf
│  │     ├─ CookieRunRegular.otf
│  │     └─ CookieRunRegular.ttf
│  ├─ tailwind.config.ts          # Tailwind CSS 설정 파일
│  └─ tsconfig.json               # TypeScript 설정 파일
└─ server/                        # Node.js 기반 아두이노 미들웨어 서버
   ├─ .dockerignore               # Docker 빌드 제외 파일
   ├─ .env                        # 서버 환경 변수 저장
   ├─ .env.example                # 환경 변수 예제
   ├─ .gitignore
   ├─ Dockerfile                  # Docker 컨테이너 설정 파일
   ├─ package-lock.json
   ├─ package.json
   └─ src/                        # 서버 소스 코드
      ├─ app.js                   # 서버 메인 엔트리 파일
      ├─ routes/                  # API 라우트 폴더
      │  ├─ arduino.js            # 아두이노 제어 API (상태 확인, UP, DOWN)
      │  └─ notifications.js      # Firebase 알림 발신 API
      └─ services/                # 서비스 로직 폴더
         ├─ serial.js             # 아두이노와의 Serial 통신 관리
         └─ firebase.js           # Firebase Admin SDK 초기화
```