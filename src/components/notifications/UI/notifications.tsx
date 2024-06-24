import React from "react"
import Notification from "@components/notification/UI/notification.tsx";
import {INotifications} from "@components/notifications/interface.ts";

import eyes from "@assets/icon/eyes.svg";
import styles from "./notification.module.scss";

const Notifications: React.FC<INotifications> = ({active}) => {
    return (
        <div className={active ? `${styles.notification} ${styles.active}` : styles.notification}>
            <div className={styles.notification__header}>
                <p>Уведомления</p>
            </div>
            <div className={'line'}></div>
            <div className={styles.notification__content}>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
            </div>
            <div className={'line'}></div>
            <div className={styles.notification__footer}>
                <img className={styles.notification__eyes} src={eyes} alt={'eyes icon'}/>
                <p>Отметить все прочитанными</p>
            </div>
        </div>
    )
}

export default Notifications;