import React from "react";
import {IOrderMonitoring} from "@layout/Monitoring/UI/monitoring.tsx";
import time from "@assets/icon/time.svg";
import styles from "./order.module.scss";
import {formatDate} from "@utils/formDate.ts";

const Order: React.FC<IOrderMonitoring> = ({id, description, dateOfStart}) => {
    return (
        <div className={styles.order}>
            <div className={styles.order__text}>
                <p className={styles.order__title}>Заказ №{id}</p>
                <p className={styles.order__description}>{description}</p>
            </div>
            <div className={styles.order__time}>
                <img src={time} alt={'time icon'}/>
                <p className={styles.order__title}>{formatDate(dateOfStart)}</p>
            </div>
        </div>
    )
}

export default Order