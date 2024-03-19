
export interface Measurement {
    _id: string, 
    id_constellation: string,
    type: string 
    decision_type: string
    freq_inicial: number
    freq_final: number
    umbral: number//limite de decisión ocupado o no 
    window_capture_type: number//depende del type --> basic = predefinido advanced = permite modificarlo entre valores predefinidos
    bandwidth: number
    pts_per_window : number//potencias de 2 predefinidas  
    startedAt: string // se llena cuando la medición empieza
    finishedAt: string // cuando la medición termina
}