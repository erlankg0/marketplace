import React from "react";
import styles from "./alert.module.scss";
import {IAlert} from "@components/alert/interface.ts";
import Forgot from "@components/alerts/forgot/UI/forgot.tsx";
import Out from "@components/alerts/out/UI/out.tsx";
import Change from "@components/alerts/change/UI/change.tsx";
import Subscribe from "@components/alerts/subscribe/UI/subscribe.tsx";

const Alert: React.FC<IAlert> = ({forgot, success, change, logout, setModalActive}) => {
    return (
        <div className={styles.alert}>
            {forgot && (
                <Forgot setModalActive={setModalActive}/>
            )}
            {logout == true && (
                <Out setModalActive={setModalActive}/>
            )}
            {change == true && (
                <Change/>
            )}
            {success == true && (
                <Subscribe setModalActive={setModalActive}/>
            )}

        </div>
    )
}

export default Alert