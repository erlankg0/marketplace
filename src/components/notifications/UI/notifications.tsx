import React, {useEffect, useState} from "react";
import Notification from "@components/notification/UI/notification.tsx";
import {INotifications} from "@components/notifications/interface.ts";

// import eyes from "@assets/icon/eyes.svg";
import styles from "./notification.module.scss";
import {INotification} from "@interfaces/notification.ts";

const Notifications: React.FC<INotifications> = ({active}) => {
    const [messages, setMessages] = useState<INotification[]>([]);
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const websocket = new WebSocket('ws://smarttailor.xyz:8090/websocket');

        websocket.onopen = () => {
            console.log('Connected', ws);
        }

        websocket.onmessage = (event: MessageEvent) => {
            try {
                const parsedData = JSON.parse(event.data);
                console.log('Get new message', parsedData);
                setMessages(prevState => [...prevState, parsedData]);
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        }

        websocket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        }

        websocket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };

        setWs(websocket);

        // Очистка соединения при размонтировании компонента
        return () => {
            websocket.close();
        }
    }, [messages]);

    return (
        <div className={active ? `${styles.notification} ${styles.active}` : styles.notification}>
            <div className={styles.notification__header}>
                <p>Уведомления</p>
            </div>
            <div className={'line'}></div>
            <div className={styles.notification__content}>
                {messages.length > 1 ? messages.map((msg) => (
                    <Notification {...msg}/>
                )) : <div>Нету сообщений</div>}

            </div>
            <div className={'line'}></div>
            {/*<div className={styles.notification__footer}>*/}
            {/*    <img className={styles.notification__eyes} src={eyes} alt={'eyes icon'}/>*/}
            {/*    <p>Отметить все прочитанными</p>*/}
            {/*</div>*/}
        </div>
    );
}

export default Notifications;