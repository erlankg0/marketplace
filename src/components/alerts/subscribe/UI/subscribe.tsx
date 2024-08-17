import styles from "./subscribe.module.scss";
import success from "@assets/emoji/sucess.jpeg";
import ButtonComponent from "@components/button/UI/button.tsx";
import {IAlert} from "@components/alert/interface.ts";
import React from "react";
import {useNavigate} from "react-router-dom";

const Subscribe: React.FC<IAlert> = ({setModalActive, text}) => {
    const navigate = useNavigate();
    const handleSuccess = () => {
        setModalActive(false);
        if (!text) {
            navigate(-1);
        }

    }

    return (
        <div className={styles.subscribe}>
            <div className={styles.subscribe__head}>
                <img className={styles.subscribe__image} src={success} alt={'success icon'}/>
            </div>
            {text ?
                (
                    <div className={styles.subscribe__text}>
                        <div>
                            <p className={styles.subscribe__title}>{text}</p>
                        </div>
                    </div>
                )
                :
                (
                    <div className={styles.subscribe__text}>
                        <div>
                            <p className={styles.subscribe__title}>Успешно!</p>
                        </div>
                        <div>
                            <p className={styles.subscribe__description}>Сохраненно</p>
                        </div>
                    </div>
                )
            }

            <div className={styles.subscribe__footer}>
                <ButtonComponent onClick={() => handleSuccess()} text={'Понятно!'}/>
            </div>
        </div>

    )
}

export default Subscribe