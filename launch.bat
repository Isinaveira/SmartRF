@echo off
cd "backend"
start cmd /k npm run start

cd ".."

cd "frontend"
start cmd /k ng serve -o 
