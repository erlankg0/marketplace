import React from "react";
import {IButton} from "@components/button/interface.ts";
import styles from "./buttonAds.module.scss";

const ButtonAds: React.FC<IButton> = ({text, onClick}) => {
    return (<button className={styles.button} onClick={onClick}>{text}</button>)
}
export default ButtonAds