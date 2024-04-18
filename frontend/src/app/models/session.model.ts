
export interface Session{
    id_session: string, 
    dni: string,
    date: string,
    message_data: {
        "id_measurement": string,
        "id_device":string,
        "date": string,
        "results": string,
        "threshold": string,
    }
}