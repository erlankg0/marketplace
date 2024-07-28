export interface ICard<T> {
    setActiveModal: (active: boolean) => void,
    data: T,
    category?: string;
}
