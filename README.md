# 어드벤쳐 디자인

## 실행하기
```
cd server
node src/app.js
```

## 폴더구조
```
project-root/
├── next-app/                  # Next.js 프론트엔드 애플리케이션
│   ├── app/                   # Next.js App Router
│   │   ├── api/               # Next.js API 라우트
│   │   │   └── registerDevice/
│   │   │       └── route.ts   # 디바이스 토큰 전달 API
│   │   └── page.tsx           # 메인 페이지 (디바이스 토큰 생성 및 상태 표시)
│   ├── config/                # Firebase 클라이언트 설정
│   │   └── firebaseConfig.ts  # Firebase 클라이언트 초기화
│   ├── public/                # 정적 파일
│   │   ├── firebase-messaging-sw.js # Firebase 푸시 알림 서비스 워커
│   │   ├── icon.png           # PWA 아이콘
│   │   └── manifest.json      # PWA 매니페스트 파일
│   ├── styles/                # 전역 CSS 스타일
│   │   └── globals.css        # Tailwind CSS 기본 설정
│   ├── .env                   # 환경 변수 파일
│   ├── next.config.ts         # Next.js 설정 파일
│   ├── package.json           # Next.js 의존성 관리
│   ├── tsconfig.json          # TypeScript 설정
│   └── README.md              # 프로젝트 설명
├── server/                    # Express 서버
│   ├── src/                   # 서버 소스 코드
│   │   ├── app.ts             # Express 앱 초기화
│   │   ├── routes/            # 서버 라우트
│   │   │   └── devices.ts     # 디바이스 토큰 관리 및 푸시 알림 전송
│   │   ├── firebase/          # Firebase 서버 설정
│   │   │   └── admin.ts       # Firebase Admin SDK 초기화
│   └── package.json           # Express 의존성 관리
├── .gitignore                 # Git 제외 파일 설정
└── README.md                  # 프로젝트 설명

```