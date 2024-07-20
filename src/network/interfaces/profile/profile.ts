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

export interface IUploadPhoto {
    file: string
}