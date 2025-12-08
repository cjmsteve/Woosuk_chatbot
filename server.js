require('dotenv').config(); // .env 파일 추가
const express = require('express');
const path = require('path');
// const { getBotResponse } = require('./utils/responseGenerator');
const { getBotResponse } = require('./utils/supabaseGenerator'); 

// 서버 및 포트
const app = express();
const PORT = process.env.PORT || 5000; // 환경 변수가 없으면 5000번 포트 사용

// 미들웨어 설정
app.use(express.json({ limit: '10kb' })); // JSON 페이로드 크기 제한 (챗봇 메시지용)
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // URL 인코딩 지원
app.use(express.static(path.join(__dirname, 'public')));

// 헬스 체크 엔드포인트
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        service: 'Woosuk Chatbot API'
    });
});


app.post('/api/chat', async (req, res) => {
    // 프런트엔드에서 보낸 메시지를 추출
    const { message } = req.body;

    // 입력 유효성 검사
    if (!message) {
        return res.status(400).json({ error: '메시지가 누락되었습니다.' });
    }

    if (typeof message !== 'string') {
        return res.status(400).json({ error: '메시지는 문자열이어야 합니다.' });
    }

    if (message.trim().length === 0) {
        return res.status(400).json({ error: '빈 메시지는 전송할 수 없습니다.' });
    }

    if (message.length > 500) {
        return res.status(400).json({ error: '메시지는 500자를 초과할 수 없습니다.' });
    }

    try {
        // 규칙 기반 함수를 호출하여 응답 생성
        const botResponse = await getBotResponse(message.trim());
        
        // 응답 전송
        res.json({ response: botResponse });

    } catch (error) {
        console.error('챗봇 응답 처리 중 오류 발생:', error);
        res.status(500).json({ error: '서버 내부에서 오류가 발생했습니다.' });
    }
});

// 404 핸들러 - 정의되지 않은 라우트 처리
app.use((req, res) => {
    res.status(404).json({ 
        error: '요청하신 엔드포인트를 찾을 수 없습니다.',
        path: req.path
    });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`✅ 규칙 기반 Node.js 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});