@echo off
cd /d D:\test
echo ====================================
echo  심리테스트 연구소 - 실행 스크립트
echo ====================================
echo.
echo [1/2] 패키지 설치 중...
npm install
echo.
echo [2/2] 개발 서버 시작...
echo 브라우저에서 http://localhost:3000 접속
echo.
npm run dev
pause
