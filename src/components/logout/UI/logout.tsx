import {NavLink} from "react-router-dom";
import logout from "@assets/icon/logout.svg";
import styles from "./logut.module.scss";

const Logout = () => {
    return (
        <NavLink to={'/'} className={styles.logout}>
            <img className={styles.logout__img} src={logout} alt={'Копка выхода'}/>
            <p className={styles.logout__text}>Выйти</p>
        </NavLink>
    )
}

export default Logout;