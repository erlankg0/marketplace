export interface IProfile {
    email: string,
    name: string,
    id: number,
    imagePath: string | null,
    surname: string,
    patronymic: string,
    phoneNumber: string,
    hasSubscription: boolean,
    isOrganization: boolean,
}

export interface IEditProfile {
    name: string,
    surname: string,
    patronymic: string,
    phoneNumber: string
}

export interface IMyAds {
    createdAt: Date,
    description: string,
    id: number,
    imagePath: string,
    name: string,
    type: 'SERVICE' | 'EQUIPMENT' | 'ORDER',
}

export interface IDetailAds {
    name: string,
    description: string,
    price: number,
    contactInfo: string
}