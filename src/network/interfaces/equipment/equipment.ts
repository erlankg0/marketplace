export interface IEquipment {
    name: string,
    description: string,
    quantity: number,
    price: number,
    contactInfo: string,
    photos: File[]
}

export interface IEquipments {
    equipments: IEquipment[],
}

export interface IEquipmentsPost {
    equipmentDto: string,
    photos: object[];
}