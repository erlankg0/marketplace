import {NavLink} from "react-router-dom";
import styles from "./logo.module.scss";

const Logo = () => {
    return (
        <NavLink className={styles.logo} to={'/'}>
            <text className={styles.logo__text}>ST</text>
        </NavLink>
    )
}

export default Logo;