@echo off
cd %~dp0
"C:\Program Files\Mozilla Firefox\firefox.exe" -new-window http://localhost:3000/
node server.js

pause