@echo off
cd /d "%~dp0"

echo === Sauvegarde en cours ===

git add .
git commit -m "update %date% %time%"

echo --- Push main ---
git push origin main

echo === Done ! ===
pause
