import React from "react";
import {IButton} from "@components/button/interface.ts";
import styles from "./selectButton.module.scss";

const SelectButton: React.FC<IButton> = ({action, onClickAction, text}) => {
    return (
        <div className={action ? `${styles.button} ${styles.action}` : styles.button} onClick={onClickAction}>{text}</div>
    )
}

export default SelectButton