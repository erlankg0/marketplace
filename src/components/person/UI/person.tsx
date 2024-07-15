import styles from "./person.module.scss";
import React from "react";
import person from "@assets/icon/person.svg";
import {IPerson} from "@components/person/interface.ts";

const Person: React.FC<IPerson> = ({setModal, module, fullName}) => {
    return (
        <div className={styles.person}>
            <div className={styles.person__image}>
                <img src={person} alt={'user image'}/>
            </div>
            <div className={styles.person__detail}>
                <p className={styles.person__name}>{fullName}</p>
                <p className={styles.person__change} onClick={() => setModal(!module)}>Изменить фото профиля</p>
            </div>
        </div>
    )
}

export default Person;