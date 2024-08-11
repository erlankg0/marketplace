import React from "react";
import Deadline from "@components/deadline/UI/deadline.tsx";
import Employer from "@components/employer/UI/employer.tsx";
import ButtonComponent from "@components/button/UI/button.tsx";
import styles from "./order.module.scss"
import {IOrder} from "@network/interfaces/employee/employee.ts";

const OrderEmployer: React.FC<IOrder> = ({
                                             id,
                                             description,
                                             name,
                                             price,
                                             date,
                                             employees,
                                             authorFullName,
                                             authorContactInfo,
                                             authorImage
                                         }) => {
    return (
        <div className={styles.order}>
            <div className={styles.order__header}>
                <div>
                    <div>
                        <h2 className={styles.order__number}>Заказ №{`${id}`}</h2>
                        <p className={styles.order__title}>{name}</p>
                        <p className={styles.order__description}>{description}</p>
                    </div>
                    <p className={styles.order__price}>{price} сом</p>
                </div>
                <div>
                    <Deadline date={date} text={'Дата'}/>
                </div>
            </div>
            <div className={'line'}></div>
            <div>
                <h2>Сотрудники</h2>
                <div className={'row'}>
                    {employees.map((employee) => (<Employer {...employee}/>))}
                </div>
            </div>
            <div className={'line'}></div>
            <div>
                <h2>Заказчик</h2>
                <div className={'row'}>
                    <Employer fullName={authorFullName} image={authorImage} contactInfo={authorContactInfo}/>
                </div>
            </div>
            <div className={'line'}></div>
            <div className={styles.order__button}>
                <ButtonComponent text={'Снять с сотрудника заказ'}/>
            </div>
        </div>
    )
}

export default OrderEmployer