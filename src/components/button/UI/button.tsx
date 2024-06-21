import React from "react";
import {IButton} from "@components/button/interface.ts";
import styles from "./button.module.scss";

const ButtonSing: React.FC<IButton> = ({text, onSubmit, onClick}) => {
    return (
        <button className={styles.button} type={"submit"} onSubmit={onSubmit} onClick={onClick}>
            {text}
        </button>
    )
}

export default ButtonSing