export interface IEquipment {
    equipmentId: number,
    equipmentPhotoUrl: string,
    name: string,
    price: number,
    authorImageUrl: string,
    authorFullName: string,
    description: string
}

export interface IEquipments {
    equipments: IEquipment[],
}