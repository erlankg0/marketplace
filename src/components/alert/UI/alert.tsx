import React from "react";
import styles from "./alert.module.scss";
import {IAlert} from "@components/alert/interface.ts";
import Forgot from "@components/alerts/forgot/UI/forgot.tsx";
import Out from "@components/alerts/out/UI/out.tsx";
import Change from "@components/alerts/change/UI/change.tsx";
import Subscribe from "@components/alerts/subscribe/UI/subscribe.tsx";
import Buy from "@components/alerts/buy/buy.tsx";
import Error from "@components/alerts/error/UI/error.tsx";
import ErrorIsAuth from "@components/alerts/auth/UI/auth.tsx";

const Alert: React.FC<IAlert> = ({
                                     forgot,
                                     success,
                                     change,
                                     logout,
                                     buy,
                                     error,
                                     isAuth,
                                     text,
                                     setModalActive
                                 }) => {
    return (
        <div className={styles.alert}>
            {forgot && (
                <Forgot setModalActive={setModalActive}/>
            )}
            {logout == true && (
                <Out setModalActive={setModalActive}/>
            )}
            {change == true && (
                <Change setModalActive={setModalActive}/>
            )}
            {success == true && (
                <Subscribe text={text} setModalActive={setModalActive}/>
            )}
            {buy === true && (
                <Buy setModalActive={setModalActive}/>
            )}
            {error === true && (
                <Error text={text} setModalActive={setModalActive}/>
            )}
            {isAuth === true && (
                <ErrorIsAuth setModalActive={setModalActive}/>
            )}
        </div>
    )
}

export default Alert