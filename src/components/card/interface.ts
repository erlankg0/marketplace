export interface ICard<T> {
    modal?: boolean,
    setModal?: () => void,
    data: T,
    category: 'order' | 'equipment' | 'services' | string,
    bought: boolean,
}
