import React, {useEffect, useState} from "react"
import Notification from "@components/notification/UI/notification.tsx";
import {INotifications} from "@components/notifications/interface.ts";

import eyes from "@assets/icon/eyes.svg";
import styles from "./notification.module.scss";

const Notifications: React.FC<INotifications> = ({active}) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const websocket = new WebSocket('https://smarttailor.xyz/websocket');

        websocket.onopen = () => {
            console.log('Connected');
        }

        websocket.onmessage = (event: MessageEvent) => {
            console.log('Get new message', event.data);
            setMessages(prevState => [...prevState, event.data])
        }

        websocket.onerror = (error) => {
            console.error(error);
        }
        websocket.onclose = () => {
            console.log('WebSocket соединение закрыто');
        };

        setWs(websocket);

        // Очистка соединения при размонтировании компонента

        return () => {
            websocket.close();
            ws
        }
    }, [])
    return (
        <div className={active ? `${styles.notification} ${styles.active}` : styles.notification}>
            <div className={styles.notification__header}>
                <p>Уведомления</p>
            </div>
            <div className={'line'}></div>
            <div className={styles.notification__content}>
                {messages.map((mes) => (<p>{mes}</p>))}
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