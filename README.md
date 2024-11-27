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
├─ next-pwa/                     # Next.js PWA 폴더
│  ├─ .env.example
│  ├─ .env.local                 # 환경변수 저장 파일
│  ├─ .gitignore
│  ├─ README.md
│  ├─ app/                       # Next.js App 라우터
│  │  ├─ api/                    # Next.js api 함수 폴더
│  │  │  ├─ saveToken/           # 디바이스 토큰 API 폴더
│  │  │  │  ├─ global.d.ts
│  │  │  │  └─ route.ts          # 디바이스 토큰 전달 API 
│  │  │  └─ weather/             # 날씨 API 폴더
│  │  │     └─ route.ts          # 날씨 정보 요청 API
│  │  ├─ favicon.ico
│  │  ├─ globals.css             # 전역 스타일 시트
│  │  ├─ layout.tsx              # 루트 레이아웃 파일
│  │  ├─ manifest.ts             # PWA를 위한 mainfest.json 생성 파일
│  │  └─ page.tsx                # 메인 페이지
│  ├─ components/                # Next.js 컴포넌트 폴더
│  │  ├─ ForegroundPush.tsx      # 포그라운드 푸시 관리 컴포넌트
│  │  ├─ Notification.tsx        # 알림 권한 허용 + 토큰 전송 컴포넌트
│  │  ├─ Weather.tsx             # 위치 정보 허용 + 날씨 정보 로딩 컴포넌트
│  │  └─ common/                 # 공통 컴포넌트 저장 폴더
│  │     ├─ LinkCard.tsx         # 링크 담은 버튼 카드 컴포넌트
│  │     ├─ MainCard.tsx         # 메인 내용을 담은 카드 컴포넌트
│  │     └─ Toast.tsx            # 토스트 알람 컴포넌트
│  ├─ config/
│  │  ├─ Firebase.ts             # Firebase 초기화 + 정보 불러오는 config 파일
│  │  ├─ WeatherIcons.ts         # 날씨에 따라 아이콘 바꾸는 파일
│  │  ├─ firebase-service-account-example.json
│  │  └─ firebase-service-account.json    # 파이어베이스 계정 정보 json (gitignored)
│  ├─ libs/
│  │  ├─ GetFcmToken.ts          # Firebase 디바이스 토큰 가져오는 로직
│  │  └─ ServiceWorker.ts        # 서비스워커 등록 로직
│  ├─ next-env.d.ts
│  ├─ next.config.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.mjs
│  ├─ public/
│  │  ├─ 3d-bell-icon.avif
│  │  ├─ firebase-messaging-sw.js   # 파이어베이스 클라우드 메세지 수신을 위한 서비스워커
│  │  └─ fonts/
│  ├─ tailwind.config.ts
│  └─ tsconfig.json
└─ server/                       # nodejs 서버 겸 아두이노 미들 웨어
   ├─ .env                       # 환경 변수 저장
   ├─ .env.example               # 환경 변수 예시 저장
   ├─ .gitignore
   ├─ Dockerfile
   ├─ package-lock.json
   ├─ package.json
   └─ src/                       # 서버 소스 코드
      ├─ app.js                  # 메인 코드
      ├─ routes/                 # 라우팅 로직 저장 폴더
      │  ├─ arduino.js           # 아두이노 상태 확인, up, down 라우트
      │  └─ notifications.js     # 알림 발신 라우팅 코드
      └─ services/
         ├─ serial.js            # 아두이노와 시리얼 통신 코드 
         └─ firebase.js          # 파이어베이스 Admin SDK 초기화
```