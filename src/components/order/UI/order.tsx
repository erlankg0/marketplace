import React from "react";
import time from "@assets/icon/time.svg";
import styles from "./order.module.scss";

const Order: React.FC = () => {
    return (
        <div className={styles.order}>
            <div className={styles.order__text}>
                <p className={styles.order__title}>Заказ №2456</p>
                <p className={styles.order__description}>Сшить 10 штук футболок</p>
            </div>
            <div className={styles.order__time}>
                <img src={time} alt={'time icon'}/>
                <p className={styles.order__title}>15 апреля</p>
            </div>
        </div>
    )
}

export default Order