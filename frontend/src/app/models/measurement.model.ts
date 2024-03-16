
export interface Measuerment {
    id_measurement: string, 
    id_constellation: string,
    type: string 
    decision_type: string
    freq_inicial: number
    freq_final: number
    umbral: number//limite de decisión ocupado o no 
    tiempo_captura_ventana: number//depende del type --> basic = predefinido advanced = permite modificarlo entre valores predefinidos
    ancho_de_canal: number
    numero_pts_ventana : number//potencias de 2 predefinidas  
    inicio_medición: string // se llena cuando la medición empieza
    fin_medición: string // cuando la medición termina
}