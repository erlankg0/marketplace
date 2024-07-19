import {NavLink} from "react-router-dom";
import styles from "./logo.module.scss";

const Logo = () => {
    return (
        <NavLink className={styles.logo} to={'/'}>
            <p className={styles.logo__text}>ST</p>
        </NavLink>
    )
}

export default Logo;