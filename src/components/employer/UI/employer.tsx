import React from "react";
import employer from "@assets/images/employe.jpg";
import styles from "./employer.module.scss";
import {IEmployee} from "@network/interfaces/employee/employee.ts";

const Employer: React.FC<IEmployee> = ({image, fullName, salary, contactInfo}) => {
    return (
        <div className={styles.employer}>
            <div className={styles.employer__image}>
                <img src={image ? image : employer} alt={'employer image'}/>
            </div>
            <div className={styles.employer__info}>
                <h2 className={styles.employer__title}>{fullName}</h2>
                {salary && (<p className={styles.employer__description}>ЗП {salary} сом</p>)}
                {contactInfo && (<p className={styles.employer__description}>Контакт: {contactInfo}</p>)}
            </div>
        </div>
    )
}

export default Employer