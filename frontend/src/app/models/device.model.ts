export interface Device {
    //_id: string,
    station_id: string,
    coordinates: { lng: number,lat: number},
    state: string,
    last_lectureAt: string
}