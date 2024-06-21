import styles from "./card.module.scss";
import cardImage from "@assets/images/cardimage.png";
import React from "react";
import {ICard} from "@components/card/interface.ts";
import Seller from "@components/seller/UI/seller.tsx";

const Card: React.FC<ICard> = ({setActiveModal}) => {
    return (
        <div className={styles.card}>
            <img className={styles.card__image} src={cardImage} alt={'Card Image'}/>
            <div className={styles.card__content}>
                <div className={styles.card__text}>
                    <div className={styles.card__title}>
                        <p className={styles.title}>Нитки</p>

                        <p className={styles.price}>100 сом</p>
                    </div>
                    <Seller/>
                    <p className={styles.user__description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing eliе...
                        Lorem ipsum dolor sit amet, consectetur adipiscing eliе...
                        Lorem ipsum dolor sit amet, consectetur adipiscing eliе...
                        Lorem ipsum dolor sit amet, consectetur adipiscing eliе...
                    </p>
                </div>
                <div>
                    <button type={'submit'} onClick={() => {
                        setActiveModal(true);
                    }}
                            className={styles.card__button}>Подробнее
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;