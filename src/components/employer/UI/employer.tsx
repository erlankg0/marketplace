import React from "react";
import employer from "@assets/images/employe.jpg";
import styles from "./employer.module.scss";

const Employer: React.FC = () => {
    return (
        <div className={styles.employer}>
            <div className={styles.employer__image}>
                <img src={employer} alt={'employer image'}/>
            </div>
            <div className={styles.employer__info}>
                <h2 className={styles.employer__title}>Эрлан Абдраимов</h2>
                <p className={styles.employer__description}>ЗП 80.000 сом</p>
            </div>
        </div>
    )
}

export default Employer