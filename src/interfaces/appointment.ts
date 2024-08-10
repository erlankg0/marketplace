export interface ICheckbox {
    value: string,
    label: string,
    checked: boolean
}

export interface IAppointment {
    name: string,
}

export interface IAppointmentAddChange {
    appointments: IAppointment,
    checkboxes: ICheckbox[],
}