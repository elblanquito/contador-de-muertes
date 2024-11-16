@echo off
cd %~dp0
"C:\Program Files\Google\Chrome\Application\chrome.exe" --new-window http://localhost:3000/
node server.js
pause