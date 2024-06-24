import React from "react";
import {IButton} from "@components/button/interface.ts";
import styles from "./button.module.scss";

const ButtonComponent: React.FC<IButton> = ({text, onSubmit, onClick, waiting}) => {
    return (
        <button className={waiting ? `${styles.button} ${styles.waiting}` : styles.button} type={"submit"} onSubmit={onSubmit} onClick={onClick}>
            {text}
        </button>
    )
}

export default ButtonComponent