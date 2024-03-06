export interface Device {
    id_dispositivo: number,
    coordenadas: { lng: number,lat: number},
    estado: string,
    fecha_ultima_lectura: string,
    imagen_path: string,
    lecturas: { canal: number, potencia: number } [];
}