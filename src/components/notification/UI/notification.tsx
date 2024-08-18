import React from "react";
import styles from "./notification.module.scss";
import person from "@assets/icon/person.svg";
import {INotification} from "@interfaces/notification.ts";
import {formatDate} from "@utils/formDate.ts";

const Notification: React.FC<INotification> = ({title, description, date}) => {
    return (
        <div className={styles.notification}>
            <div className={styles.notification__status}></div>
            <div className={styles.notification__icon}>
                <img src={person} alt={'icon notification category'}/>
            </div>
            <div className={styles.notification__content}>
                <div className={styles.notification__text}>
                    <h2 className={styles.notification__title}>{title}</h2>
                    <p className={styles.notification__description}>{description}</p>
                </div>
                <div className={styles.notification__date}>
                    {formatDate(date)};
                </div>
            </div>
        </div>
    )
}

export default Notification;