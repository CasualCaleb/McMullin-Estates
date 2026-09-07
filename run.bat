@echo off
echo Starting Backend..
start "Backend" cmd /k "cd /d %~dp0backend && call .venv\Scripts\activate && uvicorn app.main:app --reload"

echo Starting Frontend on your local Wi-Fi network..
start "Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo Both servers started. Open the Network URL shown in the Frontend window.
