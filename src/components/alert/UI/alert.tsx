import ButtonSing from "@components/button/UI/button.tsx";
import styles from "./alert.module.scss";

const Alert = () => {
    return (
        <div className={styles.alert}>
            <div>
                <p className={styles.alert__emoji}>🥳</p>
            </div>
            <div>
                <h2 className={styles.alert__title}>Поздравляем!</h2>
                <h2 className={styles.alert__title}>
                    Вы приняли заказ!</h2>
            </div>
            <div>
                <p className={styles.alert__description}>Ваш заказ отображается в вашем личном кабинете</p>
            </div>
            <div>
                <ButtonSing text={'Посмотреть'}/>
            </div>
        </div>
    )
}

export default Alert