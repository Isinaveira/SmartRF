//this type of data forms groups of measurement devices. 
export interface Constellation {
    id_constellation: string,
    name: string,
    createdAt: string,
    isActive: boolean
    devices_list : string []
}
