import styles from "./forgot.module.scss";
import forgot from "@assets/emoji/forgot.jpeg";
import ButtonComponent from "@components/button/UI/button.tsx";
import {IAlert} from "@components/alert/interface.ts";
import React from "react";

const Forgot: React.FC<IAlert> = ({setModalActive}) => {
    return (
        <div className={styles.forgot}>
            <div className={styles.forgot__head}>
                <img className={styles.forgot__image} src={forgot} alt={'forgot icon'}/>
            </div>
            <div className={styles.forgot__text}>
                <div>
                    <p className={styles.forgot__title}>Заполните</p>
                    <p className={styles.forgot__title}>обзязательные поля</p>
                </div>
                <div>
                    <p className={styles.forgot__description}>Они отмечены красной</p>
                    <p className={styles.forgot__description}>звездочкой</p>
                </div>
            </div>
            <div className={styles.forgot__footer}>
                <ButtonComponent onClick={()=> setModalActive(true)} text={'Заполнить'}/>
            </div>
        </div>
    )
}

export default Forgot;