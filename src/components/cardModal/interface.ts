export interface ICardModal {
    setModal: (active: boolean) => void,
    id: number,
    category: 'order' | 'equipment' | 'services' | string;
    bought: boolean,
}