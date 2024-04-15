# SmartRF 📡

SmartRF es un proyecto que busca el aprovechamiento del espectro radioeléctrico para diversas aplicaciones.

## ¿Qué es SmartRF?

SmartRF es una plataforma diseñada para explorar y utilizar de manera eficiente el espectro radioeléctrico. Utiliza técnicas avanzadas de procesamiento de señales para identificar y aprovechar las bandas de frecuencia disponibles de manera inteligente.

## Características principales

- 🚀 Aprovechamiento inteligente del espectro radioeléctrico.
- 📶 Exploración y detección de bandas de frecuencia disponibles.
- 💻 Interfaz intuitiva para control y visualización.
- 🔒 Seguridad y privacidad de las comunicaciones.

## Instalación

1. Clona este repositorio: `git clone https://github.com/tu_usuario/SmartRF.git`
2. cd Backend && npm install.
3. npm run start 
4. cd Frontend && npm install.
5. ng serve -o 

## Ejemplo de medición 

La medición que se envía desde cada estación al servidor es la siguiente:
```json
{
    station_id: "Identificador_estación", /* Corresponde a el valor en db de la señal medida */
    measurement_id: "identificador del proceso de medición", /* Corresponde a el valor en db de la señal medida */
    threshold: "potencia normalizada", /* Corresponde a el valor en db de la señal medida */
    results: [102, -5, 3, 2], /* Corresponde a el valor en db de la señal medida */
    firma: "hash de firmado", /* Corresponde a el valor en db de la señal medida */
    timestamp: "fecha de la medición" /* Corresponde a el valor en db de la señal medida */
}
```

