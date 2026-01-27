@echo off
cd /d %~dp0
cd app

REM Ejecutar server.js en segundo plano sin ventana
start /B node server.js

REM Abrir Edge en nueva ventana
start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --new-window http://localhost:3000/

REM Ejecutar teclado.py mostrando su consola
python teclado.py

REM Cuando cierres Python, esto mata el proceso de Node.js
taskkill /F /IM node.exe >nul 2>&1

exit