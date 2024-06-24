export interface IHistoryCard {
    onClick?: () => void,
    setModalActive: (active: boolean) => void,
    image: string,
    price: string,
    title: string,
    description: string,
    date: Date
}