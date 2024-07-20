import styles from "@components/create/UI/create.module.scss";
import Button from "@components/button/UI/button.tsx";
import React from "react";
import {ICreate} from "@components/create/interface.ts";

const Create : React.FC<ICreate>= ({count, increment}) => {

    const handleIncrement = () => {
      increment(count);
    }
    return (
        <div className={styles.content}>
            <p>🙂</p>
            <div className={styles.content__body}>
                <div className={styles.content__text}>
                    <p className={styles.content__title}>Хмм...</p>
                    <p className={styles.content__title}>У вас еще нет объявлений </p>
                </div>
                <p className={styles.content__description}>
                    Давайте создадим объявление
                    и разместим на маркетплейсе
                </p>
                <div className={styles.content__button}>
                    <Button onClick={handleIncrement} text={'Создать'}/>
                </div>
            </div>
        </div>
    )
}

export default Create;