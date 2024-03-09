@echo off
cd "backend"
start cmd /k nodemon server.js

cd ".."

cd "frontend"
start cmd /k npm start
