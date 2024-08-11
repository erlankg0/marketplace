export interface IHistoryCard {
    onClick?: () => void,
    setModalActive?: (active: boolean) => void,
    image: string,
    price?: string,
    title: string,
    description: string,
    date: Date,
    myAds?: boolean,
    type?: 'SERVICE' | 'EQUIPMENT' | 'ORDER' | "ALL",
    id?: number,
    category?: 'ORDER' | 'SERVICE' | 'EQUIPMENT'| undefined,
}