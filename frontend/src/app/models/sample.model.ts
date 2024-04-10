export interface Sample{
    _id: string, 
    id_measurement: string,
    id_device: string,
    startedAt: string,
    finishedAt: string,
    num_channels: number,
    treshold: number,
    results: {"channel": string, samples: number[]}[]
}