import styles from "@components/alerts/forgot/UI/forgot.module.scss";
import ButtonComponent from "@components/button/UI/button.tsx";
import {IAlert} from "@components/alert/interface.ts";
import React from "react";
import success from "@assets/emoji/sucess.jpeg"
const Buy: React.FC<IAlert> = ({setModalActive}) => {
    return (
        <div className={styles.forgot}>
            <div className={styles.forgot__head}>
                <img className={styles.forgot__image} src={success} alt={'forgot icon'}/>
            </div>
            <div className={styles.forgot__text}>
                <div>
                    <p className={styles.forgot__title}>Поздравляем</p>
                    <p className={styles.forgot__title}>Вы купили оборудования</p>
                </div>
                <div>
                    <p className={styles.forgot__description}>Подробная информация отправлена вам на почту</p>
                </div>
            </div>
            <div className={styles.forgot__footer}>
                <ButtonComponent onClick={() => setModalActive(true)} text={'Посмтреть'}/>
            </div>
        </div>
    )
}

export default Buy;