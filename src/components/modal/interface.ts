import React from "react";

export interface IModal<T> {
    active: boolean,
    setModalActive: (active: boolean) => void,
    component: React.ComponentType<T>,
    componentProps: T,
}