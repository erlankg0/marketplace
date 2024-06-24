import {useLocation} from "react-router";
import styles from "./header.module.scss";
import Search from "@components/search/UI/search.tsx";
import Push from "@components/push/UI/push.tsx";
import Notifications from "@components/notifications/UI/notifications.tsx";
import {useState} from "react";

const Header = () => {
    const location = useLocation();
    const pathNames = location.pathname.split('/').filter(path => path);
    const [push, setPush] = useState<boolean>(false)
    const handleTogglePush = () => {
        setPush(!push);
    }
    return (
        <header className={styles.header}>
            <div className={styles.header__text}>
                <p className={styles.breads}>{pathNames}</p>
                <text className={'title'}>Оборудования</text>
            </div>
            <div className={styles.header__form}>
                <Search/>
                <Push onClick={handleTogglePush}/>
            </div>
            <Notifications active={push}/>
        </header>
    )
}

export default Header