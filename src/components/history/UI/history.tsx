import React, {useState} from "react";
import {NavLink} from "react-router-dom";

import {IHistoryCard} from "@components/history/interface.ts";

import {getProfile} from "@network/profile/profile.ts";
import {postAssignEmployeeToOrder} from "@network/employee/employee.ts";

import {formatDate} from "@utils/formDate.ts";
import styles from "./history.module.scss";
import {Modal} from "antd";
import Alert from "@components/alert/UI/alert.tsx";

const HistoryCard: React.FC<IHistoryCard> = ({
                                                 setModalActive,
                                                 price,
                                                 title,
                                                 description,
                                                 date,
                                                 image,
                                                 myAds,
                                                 type,
                                                 id,
                                                 accept
                                             }) => {

    const handleSetModalActive = () => {
        if (setModalActive) {
            setModalActive(true)
        }
    };

    const [success, setSuccess] = useState<boolean>(false); // Состояние нового модального окна для подтверждения выхода
    const [errors, setErros] = useState<boolean>(false)
    const handleToggleModal = () => {
        setSuccess(!success);
    }
    const handleToggleError = () => {
        setErros(!errors);
    }


    const handleAccessOrder = async (orderId: string | number) => {
        const {id} = await getProfile();
        console.log(id, orderId)
        try {
            await postAssignEmployeeToOrder(orderId, id);
            handleToggleModal();
        } catch (error) {
            handleToggleError();
            new Error(`${error}`)
        }
    }

    return (
        <div className={styles.history}>
            <div className={styles.history__icon}>
                <img className={styles.history__image} src={image} alt={'card image'}/>
            </div>
            <div className={styles.history__text}>
                {myAds ? (
                    <div className={styles.history__price}>
                        {type == 'EQUIPMENT' && (
                            <p className={styles.history__equipment}>Оборудования</p>
                        )}
                        {type == 'SERVICE' && (
                            <p className={styles.history__service}>Услуги</p>
                        )}
                        {type == 'ORDER' && (
                            <p className={styles.history__service}>Заказы</p>
                        )}
                    </div>
                ) : (
                    <div className={styles.history__price}>
                        <p>{price}</p>
                        <p>сом</p>
                    </div>
                )}

                <p className={styles.history__title}>{title}</p>
                <p className={styles.history__description}>{description}</p>
            </div>
            <div className={styles.history__time}>
                {date && (<p className={styles.history__date}>{`${formatDate(date)}`}</p>)}
                {id && type && type != 'ALL' && (
                    <NavLink className={styles.history__detail} to={`/marketplace/self-detail/${id}/${type}`}>Посмотреть
                        детали</NavLink>
                )}
                {type && (<p className={styles.history__detail} onClick={handleSetModalActive}>Посмотреть детали</p>)}

                {setModalActive && (
                    <p className={styles.history__detail} onClick={handleSetModalActive}>Принять заказ</p>)}
                {accept && (
                    <p className={styles.history__detail} onClick={() => handleAccessOrder(id)}>Принять заказ</p>)}

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
            <Modal open={errors} footer={null} centered={true}
                   bodyStyle={{
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                       maxWidth: '30rem',
                       margin: '0 auto'
                   }}>
                <Alert setModalActive={handleToggleError} error={errors}/>
            </Modal>
        </div>
    )
}

export default HistoryCard;