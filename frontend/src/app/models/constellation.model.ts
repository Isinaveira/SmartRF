//this type of data forms groups of measurement devices. 
export interface Constellation {
    constellation_id: string,
    name: string,
    createdAt: string,
    isActive: boolean
    devices_list : number[]
}

