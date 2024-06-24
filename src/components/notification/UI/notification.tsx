import styles from "./notification.module.scss";
import person from "@assets/icon/person.svg";
const Notification = () => {
    return (
        <div className={styles.notification}>
            <div className={styles.notification__status}></div>
            <div className={styles.notification__icon}>
                <img  src={person} alt={'icon notification category'}/>
            </div>
            <div className={styles.notification__content}>
                <div className={styles.notification__text}>
                    <h2 className={styles.notification__title}>Объявление №23</h2>
                    <p className={styles.notification__description}>User 21 откликнулся на ваше объявление</p>
                </div>
                <div className={styles.notification__date}>
                    Сегодня, в 11:34
                </div>
            </div>
        </div>
    )
}

export default Notification;