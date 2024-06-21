interface ILink {
    title: string,
    url: string,
}

export interface IDropdown {
    title: string,
    tabs: ILink[],
    icon: string
}