import {NavLink} from "react-router-dom";
import logout from "@assets/icon/logout.svg";
import styles from "./logut.module.scss";
import React from "react";
import {ILogout} from "@components/logout/interface.ts";

const Logout: React.FC<ILogout>= ({onClick}) => {
    return (
        <NavLink to={'/'} className={styles.logout} onClick={onClick}>
            <img className={styles.logout__img} src={logout} alt={'Копка выхода'}/>
            <p className={styles.logout__text}>Выйти</p>
        </NavLink>
    )
}

export default Logout;