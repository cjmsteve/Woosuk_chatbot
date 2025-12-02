const express = require('express');
const path = require('path');
const { getBotResponse } = require('./utils/responseGenerator');

// 서버 및 포트
const app = express();
const PORT = process.env.PORT || 5000; // 환경 변수가 없으면 5000번 포트 사용

// 미들웨어 설정
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));


app.post('/api/chat', (req, res) => {
    // 프런트엔드에서 보낸 메시지를 추출
    const { message } = req.body;
    //버튼 눌렀을때 반환 값 
    if(message==get_academicCalendar) {
        return res.static(200).json({
            message:'우석대학교 학사 일정입니다. 자세한 내용은 아래 링크를 통해 확인해 주세요',
            link:'https://www.woosuk.ac.kr/main/?menu=84'
        });
    }
    if(message==get_academicDiet) {
        return res.static(200).json({
            message:'학식 메뉴 링크입니다. 맛있는 식사 하십시오.',
            link:'https://www.woosuk.ac.kr/main/?menu=140'
        });
    }
    if(message==get_wooseokPortal) {
        return res.static(200).json({
            message:'우석 포털 링크 입니다.',
            link:'https://portal.woosuk.ac.kr/'
        });
    }
    if(message==get_graduate) {
        return res.static(200).json({
            message:'',
            link:'https://www.woosuk.ac.kr/main/?menu=136'
        });
    }
    if(message==get_shuttlBeus) {
        return res.static(200).json({
            message:'셔틀버스 노선과 시간입니다. 자세히 확인해 불이익 없도록 확인 바랍니다.',
            link:''
        });
    }
    if(message==get_graduate) {
        return res.static(200).json({
            message:'졸업에 관한 자세한 사항은 아래 링클를 통해 확인 해 주세요.',
            link:'https://www.woosuk.ac.kr/main/?menu=104'
        });
    }
    if(message==get_tuitionFee) {
        return res.static(200).json({
            message:'자세한 사항은 아래 링크를 통해 확인 해 주세요.',
            link:'https://www.woosuk.ac.kr/main/?menu=110'
        });
    }

    if (!message) {
        return res.status(400).json({ error: '메시지가 누락되었습니다.' });
    }

    try {
        // 규칙 기반 함수를 호출하여 응답 생성
        const botResponse = getBotResponse(message);
        
        // 응답 전송
        res.json({ response: botResponse });

    } catch (error) {
        console.error('챗봇 응답 처리 중 오류 발생:', error);
        res.status(500).json({ error: '서버 내부에서 오류가 발생했습니다.' });
    }
});


// 서버 시작
app.listen(PORT, () => {
    console.log(`✅ 규칙 기반 Node.js 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});