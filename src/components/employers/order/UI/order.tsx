import React, {useState} from "react";
import Deadline from "@components/deadline/UI/deadline.tsx";
import Employer from "@components/employer/UI/employer.tsx";
import ButtonComponent from "@components/button/UI/button.tsx";
import styles from "./order.module.scss"
import {IOrder} from "@network/interfaces/employee/employee.ts";
import {getCompleteOrder} from "@network/organization/admin.ts";
import {Modal} from "antd";
import Alert from "@components/alert/UI/alert.tsx";

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
    const [success, setSuccess] = useState<boolean>(false); // Состояние нового модального окна для подтверждения выхода
    const [erros, setErros] = useState<boolean>(false); // Состояние нового модального окна для подтверждения выхода

    const handleToggleModal = () => {
        setSuccess(!success);
    }
    const handleToggleError = () => {
        setErros(!erros);
    }

    const handleCompletedOrder = async () => {
        try {
            await getCompleteOrder(id);
            handleToggleModal();
        } catch (error) {
            new Error(`${error}`)
            handleToggleError();
        }
    }

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
                    <Employer
                        fullName={authorFullName}
                        image={authorImage}
                        contactInfo={authorContactInfo}
                    />
                </div>
            </div>
            <div className={'line'}></div>
            <div className={styles.order__button}>
                <ButtonComponent onClick={handleCompletedOrder} text={'Снять с сотрудника заказ'}/>
            </div>
            <Modal open={success} footer={null} centered={true}
                   bodyStyle={{
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                       maxWidth: '30rem',
                       margin: '0 auto'
                   }}>
                <Alert setModalActive={handleToggleModal} success={success}/>
            </Modal>
            <Modal open={erros} footer={null} centered={true}
                   bodyStyle={{
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                       maxWidth: '30rem',
                       margin: '0 auto'
                   }}>
                <Alert setModalActive={handleToggleError} error={erros}/>
            </Modal>
        </div>
    )
}

export default OrderEmployer