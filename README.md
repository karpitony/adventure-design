# 어드벤쳐 디자인

### 목차
- [프로젝트 소개](#프로젝트-소개)
- [기술스택과 아키텍쳐](#기술스택과-아키텍쳐)
- [실행하기](#실행하기)
   - [도커로 실행](#도커로-실행)
   - [Node.js로 실행](#nodejs로-실행)
- [폴더 구조](#폴더-구조)

## 프로젝트 소개
TBD

## 기술스택과 아키텍쳐
TBD

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
├─ next-pwa/                     # Next.js 기반 Progressive Web App (PWA) 폴더
│  ├─ .env.example               # 환경변수 예제 파일
│  ├─ .env.local                 # 환경변수 파일
│  ├─ .gitignore
│  ├─ README.md
│  ├─ app/                       # Next.js App Router 폴더
│  │  ├─ api/                    # Next.js API 경로
│  │  │  ├─ arduino/             # 아두이노 API 폴더
│  │  │  │  ├─ down/             # 차수판 내리는 API
│  │  │  │  │  └─ route.ts
│  │  │  │  ├─ status/           # 차수판 상태 확인 API
│  │  │  │  │  └─ route.ts
│  │  │  │  └─ up/               # 차수판 올리는 API
│  │  │  │     └─ route.ts
│  │  │  ├─ saveToken/           # Firebase FCM 디바이스 토큰 저장 API
│  │  │  │  ├─ global.d.ts       # 전역 타입 정의 파일
│  │  │  │  └─ route.ts          # 디바이스 토큰 저장 API 라우트
│  │  │  └─ weather/             # 날씨 정보를 제공하는 API 폴더
│  │  │     └─ route.ts          # 날씨 API 라우트
│  │  ├─ favicon.ico             # 브라우저 탭 아이콘
│  │  ├─ globals.css             # 전역 CSS 파일
│  │  ├─ layout.tsx              # Next.js App 루트 레이아웃 파일
│  │  ├─ manifest.ts             # PWA manifest.json 생성 파일
│  │  └─ page.tsx                # 메인 페이지
│  ├─ components/                # Next.js 컴포넌트 폴더
│  │  ├─ ArduinoControl.tsx      # 아두이노 상태 관리 및 컨트롤 컴포넌트
│  │  ├─ ForegroundPush.tsx      # Firebase Foreground Push 알림 처리 컴포넌트
│  │  ├─ Notification.tsx        # 알림 권한 및 디바이스 토큰 관리 컴포넌트
│  │  ├─ Weather.tsx             # 날씨 정보 및 위치 정보 처리 컴포넌트
│  │  └─ common/                 # 공통 컴포넌트 폴더
│  │     ├─ ControlButton.tsx    # 상호작용 버튼 컴포넌트
│  │     ├─ LinkCard.tsx         # 링크 버튼 카드 컴포넌트
│  │     ├─ MainCard.tsx         # 메인 내용을 담은 카드 컴포넌트
│  │     └─ Toast.tsx            # Toast 알림 컴포넌트
│  ├─ config/                    # 설정 파일 폴더
│  │  ├─ Firebase.ts             # Firebase 초기화 및 설정 파일
│  │  ├─ WeatherIcons.ts         # 날씨 상태별 아이콘 매핑
│  │  ├─ firebase-service-account-example.json # Firebase 서비스 계정 예제 파일
│  │  └─ firebase-service-account.json         # Firebase 서비스 계정 정보
│  ├─ libs/                      # 라이브러리 및 유틸리티 폴더
│  │  ├─ GetFcmToken.ts          # Firebase FCM 토큰 요청 및 관리
│  │  └─ ServiceWorker.ts        # PWA용 서비스 워커 등록
│  ├─ next-env.d.ts              # Next.js 환경 변수 타입 정의
│  ├─ next.config.ts             # Next.js 설정 파일
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.mjs         # Tailwind CSS 설정 파일
│  ├─ public/                    # 정적 파일 폴더
│  │  ├─ 3d-bell-icon.avif       # 알림 아이콘 이미지
│  │  ├─ firebase-messaging-sw.js# Firebase 서비스 워커 파일
│  │  └─ fonts/                  # 폰트 파일 저장 폴더
│  │     ├─ CookieRunBold.otf
│  │     ├─ CookieRunBold.ttf
│  │     ├─ CookieRunRegular.otf
│  │     └─ CookieRunRegular.ttf
│  ├─ tailwind.config.ts         # Tailwind CSS 설정 파일
│  └─ tsconfig.json              # TypeScript 설정 파일
└─ server/                       # Node.js 기반 아두이노 미들웨어 서버
   ├─ .dockerignore              # Docker 빌드 제외 파일
   ├─ .env                       # 서버 환경 변수 저장
   ├─ .env.example               # 환경 변수 예제
   ├─ .gitignore
   ├─ Dockerfile                 # Docker 컨테이너 설정 파일
   ├─ package-lock.json
   ├─ package.json
   └─ src/                       # 서버 소스 코드
      ├─ app.js                  # 서버 메인 엔트리 파일
      ├─ routes/                 # API 라우트 폴더
      │  ├─ arduino.js           # 아두이노 제어 API (상태 확인, UP, DOWN)
      │  └─ notifications.js     # Firebase 알림 발신 API
      └─ services/               # 서비스 로직 폴더
         ├─ serial.js            # 아두이노와의 Serial 통신 관리
         └─ firebase.js          # Firebase Admin SDK 초기화
```