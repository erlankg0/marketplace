export interface IButton {
    text: string,
    onSubmit?: () => void,
    action?: boolean,
    onClickAction?: () => void,
    onClick?: () => void,
    waiting?: boolean,
    color?: string,
    type?: "submit" | 'button',
}