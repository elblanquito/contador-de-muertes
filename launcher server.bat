@echo off
cd %~dp0
"C:\Program Files\Mozilla Firefox\firefox.exe" -new-window http://localhost:3000/
start "" "C:\Programas de BLANCO\Deathcounter and Soundboard\DCSB.exe"
node server.js

pause