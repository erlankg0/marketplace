export interface IAlert {
    setModalActive: (active: boolean) => void,
    forgot?: boolean,
    logout?: boolean,
    change?: boolean,
    success?: boolean,
    buy?: boolean,
    error?: boolean,
}