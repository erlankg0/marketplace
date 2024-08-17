import React from "react";

import ButtonComponent from "@components/button/UI/button.tsx";
import {IAlert} from "@components/alert/interface.ts";

import styles from "@components/alerts/subscribe/UI/subscribe.module.scss";
import error from "@assets/emoji/out.jpeg"

const ErrorIsAuth: React.FC<IAlert> = ({setModalActive}) => {
    const handleSuccess = () => {
        setModalActive(false);
    }

    return (
        <div className={styles.subscribe}>
            <div className={styles.subscribe__head}>
                <img className={styles.subscribe__image} src={error} alt={'success icon'}/>
            </div>
            <div className={styles.subscribe__text}>
                <div>
                    <p className={styles.subscribe__title}>Ошибка! При авторизации </p>
                </div>
            </div>
            <div className={styles.subscribe__footer}>
                <ButtonComponent onClick={() => handleSuccess()} text={'Понятно!'}/>
            </div>
        </div>

    )
}

export default ErrorIsAuth;