import React from "react";
import styles from "./history.module.scss";
import {IHistoryCard} from "@components/history/interface.ts";
import {NavLink} from "react-router-dom";

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

                                             }) => {

    const handleSetModalActive = () => {
        if (setModalActive) {
            setModalActive(true)
        }
    };
    const dates = new Date(date);

    // Format the date to '30 июля 2024'
    const formattedDate = dates.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });


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
                <p className={styles.history__date}>{`${formattedDate}`}</p>
                {id && type && type != 'ALL' && (
                    <NavLink className={styles.history__detail} to={`/marketplace/self-detail/${id}/${type}`}>Посмотреть
                        детали</NavLink>
                )}
                {!type && (<p className={styles.history__detail} onClick={handleSetModalActive}>Посмотреть детали</p>)}
            </div>
        </div>
    )
}

export default HistoryCard;