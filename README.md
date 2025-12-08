# 우석대학교 챗봇 (Woosuk University Chatbot)

우석대학교 학생들을 위한 간단한 정보 제공 챗봇입니다. 학사일정, 학식메뉴, 셔틀버스, 졸업요건, 장학금 등 학교 생활에 필요한 다양한 정보를 제공합니다.

## 주요 기능

- 📖 **학사일정**: 2024년도 2학기 주요 학사일정 조회
- 🍱 **학식메뉴**: 학생식당 메뉴 안내
- 🚌 **셔틀버스**: 셔틀버스 시간표 및 노선 정보
- 🎓 **졸업**: 졸업요건 및 절차 안내
- 🪙 **장학금**: 교내외 장학금 정보 제공
- 🅿️ **포털접속**: 우석대학교 포털 사이트 링크
- 🏠 **기숙사**: 진천캠퍼스 기숙사 정보
- 📚 **도서관**: 도서관 이용 안내
- 💬 **상담센터**: 학생 상담 서비스 안내
- 💻 **IT지원**: 컴퓨터 및 네트워크 지원 서비스

## 기술 스택

- **Backend**: Node.js, Express.js
- **Database**: Supabase
- **Frontend**: HTML, CSS, JavaScript
- **Deployment**: PM2 (프로세스 관리)

## 설치 및 실행 방법

### 1. 사전 요구사항

- Node.js (v14 이상)
- npm 또는 yarn
- Supabase 계정 및 프로젝트

### 2. 저장소 클론

```bash
git clone https://github.com/cjmsteve/Woosuk_chatbot.git
cd Woosuk_chatbot
```

### 3. 의존성 설치

```bash
npm install
```

### 4. 환경 변수 설정

`.env.example` 파일을 참고하여 `.env` 파일을 생성하고 Supabase 정보를 입력합니다:

```bash
cp .env.example .env
```

`.env` 파일 내용:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=5000
```

### 5. Supabase 데이터베이스 설정

Supabase에서 `chatbot_responses` 테이블을 생성하고 다음 컬럼을 추가합니다:

- `id` (int8, primary key)
- `keyword` (text)
- `aliases` (text or json)
- `response` (text)

`data/academics.json` 파일의 데이터를 참고하여 테이블에 데이터를 입력합니다.

### 6. 서버 실행

개발 모드:
```bash
npm start
```

프로덕션 모드 (PM2 사용):
```bash
pm2 start server.js --name woosuk-chatbot
```

### 7. 브라우저에서 접속

```
http://localhost:5000
```

## 프로젝트 구조

```
Woosuk_chatbot/
├── data/
│   ├── academics.json      # 학사 정보 데이터
│   └── academics.txt        # 학사 정보 텍스트
├── public/
│   ├── index.html          # 메인 HTML 파일
│   ├── script.js           # 프론트엔드 JavaScript
│   └── style.css           # 스타일시트
├── utils/
│   └── supabaseGenerator.js # Supabase 연동 및 응답 생성
├── server.js               # Express 서버
├── package.json            # 프로젝트 의존성
├── .env.example            # 환경 변수 예시
├── .gitignore              # Git 제외 파일
└── README.md               # 프로젝트 문서
```

## 사용 방법

1. **웹 인터페이스 접속**: 브라우저에서 `http://localhost:5000` 접속
2. **질문 입력**: 채팅창에 질문을 입력하거나 제공된 버튼을 클릭
3. **응답 확인**: 챗봇이 관련 정보를 제공합니다

### 예시 질문

- "학사일정 알려줘"
- "학식메뉴는?"
- "셔틀버스 시간표"
- "졸업 요건이 뭐야?"
- "장학금 신청 방법"
- "포털 접속 링크"

## API 엔드포인트

### POST /api/chat

채팅 메시지를 처리하고 응답을 반환합니다.

**요청:**
```json
{
  "message": "학사일정"
}
```

**응답:**
```json
{
  "response": "--- 주요 2024년도 2학기 학사일정 ---\n..."
}
```

## 데이터 구조

`chatbot_responses` 테이블 구조:

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| id | int8 | 고유 ID |
| keyword | text | 주요 키워드 |
| aliases | text/json | 별칭 목록 (JSON 배열) |
| response | text | 응답 메시지 |

## 기여 방법

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스

ISC

## 문의

프로젝트에 관한 문의사항이나 버그 리포트는 GitHub Issues를 통해 제출해주세요.

## 향후 계획

- [ ] AI 기반 자연어 처리 추가
- [ ] 실시간 학식 메뉴 API 연동
- [ ] 다국어 지원 (영어, 중국어)
- [ ] 모바일 앱 개발
- [ ] 음성 인식 기능 추가
