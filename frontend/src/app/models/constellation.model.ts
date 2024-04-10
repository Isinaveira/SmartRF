//this type of data forms groups of measurement devices. 
export interface Constellation {
    name: string,
    createdAt: Date,
    isActive: boolean
    devices_list : string[]
}

