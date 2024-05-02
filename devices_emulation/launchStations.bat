@echo off

REM Definir el station_id
set constellation_id=100
set time=100
REM Latitud y longitud inventadas
set lat=40.730610
set long=-73.935242

REM Bucle para lanzar el programa para id_device del 100 al 171
for /l %%i in (100,1,171) do (
    echo Lanzando programa para id_device %%i
    start cmd /k node station.js %%i %constellation_id% %lat% %long% %time%
)
