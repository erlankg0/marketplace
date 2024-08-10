export interface IData {
    id: number,
    imageUrl: string,
    name: string,
    description: string,
    price: number,
    authorImageUrl: string,
    authorFullName: string,
    images?: string[],
    orderStatus: string,
    orderCandidates?: ICandidates[],
}

export interface ICandidates {
    name: string,
    description: string
}