import styles from "./subscribe.module.scss";
import success from "@assets/emoji/sucess.jpeg";
import ButtonComponent from "@components/button/UI/button.tsx";
import {IAlert} from "@components/alert/interface.ts";
import React from "react";

const Subscribe: React.FC<IAlert> = ({setModalActive}) => {
    return (
        <div className={styles.subscribe}>
            <div className={styles.subscribe__head}>
                <img className={styles.subscribe__image} src={success} alt={'success icon'}/>
            </div>
            <div className={styles.subscribe__text}>
                <div>
                    <p className={styles.subscribe__title}>Заполните</p>
                    <p className={styles.subscribe__title}>обзязательные поля</p>
                </div>
                <div>
                    <p className={styles.subscribe__description}>Они отмечены красной</p>
                    <p className={styles.subscribe__description}>звездочкой</p>
                </div>
            </div>
            <div className={styles.subscribe__footer}>
                <ButtonComponent onClick={()=> setModalActive(false)} text={'Понятно!'}/>
            </div>
        </div>

    )
}

export default Subscribe