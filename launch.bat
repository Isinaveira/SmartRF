@echo off
cd "backend"
start cmd /k node server.js

cd ".."

cd "frontend"
start cmd /k npm start
