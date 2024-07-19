import React from "react";
import {NavLink} from "react-router-dom";
import {ILogout} from "@components/logout/interface.ts";

import logout from "@assets/icon/logout.svg";
import styles from "./logut.module.scss";
import {useAddDispatch} from "@redux/hooks.ts";
import {logout as logoutRedux} from "@redux/slices/auth.ts";
import {logout as logoutRequest} from "@network/auth/auth.ts"

const Logout: React.FC<ILogout> = ({onClick, active}) => {
    const dispatch = useAddDispatch();

    const handleLogout = () => {
        if (onClick) {
            onClick();
        }
        dispatch(logoutRedux());
        logoutRequest();
    }
    return (
        <div>
            {active ? (<div className={styles.logout} onClick={onClick}>
                <img className={styles.logout__img} src={logout} alt={'Копка выхода'}/>
                <p className={styles.logout__text}>Выйти</p>
            </div>) : (<NavLink to={'/'} className={styles.logout} onClick={handleLogout}>
                <img className={styles.logout__img} src={logout} alt={'Копка выхода'}/>
                <p className={styles.logout__text}>Выйти</p>
            </NavLink>)}

        </div>

    )
}

export default Logout;