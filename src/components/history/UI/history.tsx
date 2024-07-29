import React from "react";
import styles from "./history.module.scss";
import {IHistoryCard} from "@components/history/interface.ts";

const HistoryCard: React.FC<IHistoryCard> = ({
                                                 setModalActive,
                                                 price,
                                                 title,
                                                 description,
                                                 date,
                                                 image,
                                             }) => {

    const handleSetModalActive = () => {
        if (setModalActive) {
            setModalActive(true)
        }
    };

    return (
        <div className={styles.history}>
            <div className={styles.history__icon}>
                <img className={styles.history__image} src={image} alt={'card image'}/>
            </div>
            <div className={styles.history__text}>
                <div className={styles.history__price}>
                    <p>{price}</p>
                    <p>сом</p>
                </div>
                <p className={styles.history__title}>{title}</p>
                <p className={styles.history__description}>{description}</p>
            </div>
            <div className={styles.history__time}>
                <p className={styles.history__date}>{`${date.toLocaleDateString('ru-Ru', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}`}</p>
                <p className={styles.history__detail} onClick={handleSetModalActive}>Посмотреть детали</p>
            </div>
        </div>
    )
}

export default HistoryCard;