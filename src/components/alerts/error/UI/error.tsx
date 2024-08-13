import React from "react";
import {useNavigate} from "react-router-dom";

import ButtonComponent from "@components/button/UI/button.tsx";
import {IAlert} from "@components/alert/interface.ts";

import styles from "@components/alerts/subscribe/UI/subscribe.module.scss";
import error from "@assets/emoji/out.jpeg"

const Error: React.FC<IAlert> = ({setModalActive}) => {
    const navigate = useNavigate();
    const handleSuccess = () => {
        setModalActive(false);
        navigate(-1);

    }

    return (
        <div className={styles.subscribe}>
            <div className={styles.subscribe__head}>
                <img className={styles.subscribe__image} src={error} alt={'success icon'}/>
            </div>
            <div className={styles.subscribe__text}>
                <div>
                    <p className={styles.subscribe__title}>Ошибка!</p>
                </div>
            </div>
            <div className={styles.subscribe__footer}>
                <ButtonComponent onClick={() => handleSuccess()} text={'Понятно!'}/>
            </div>
        </div>

    )
}

export default Error;