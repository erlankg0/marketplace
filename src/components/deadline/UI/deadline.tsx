import styles from "./deadline.module.scss"
import React from "react"
import {IDeadline} from "@components/deadline/interface.ts";

const Deadline: React.FC<IDeadline> = ({text, date}) => {
    return (
        <div className={styles.deadline}>
            <p className={styles.deadline__text}>{text} {`${date.toLocaleDateString('ru-Ru', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })}`}</p>
        </div>
    )
}

export default Deadline