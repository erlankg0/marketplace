import styles from "./deadline.module.scss"
import React from "react"
import {IDeadline} from "@components/deadline/interface.ts";
import {formatDate} from "@utils/formDate.ts";

const Deadline: React.FC<IDeadline> = ({text, date}) => {
    return (
        <div className={styles.deadline}>
            <p className={styles.deadline__text}>{text} {formatDate(date)}</p>
        </div>
    )
}

export default Deadline