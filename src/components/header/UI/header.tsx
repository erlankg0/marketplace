import {useLocation} from "react-router";
import styles from "./header.module.scss";
import Search from "@components/search/UI/search.tsx";

const Header = () => {
    const location = useLocation();
    const pathNames = location.pathname.split('/').filter(path => path);


    return (
        <header className={styles.header}>
            <div className={styles.header__text}>
                <p className={styles.breads}>{pathNames}</p>
                <text className={'title'}>Оборудования</text>
            </div>
            <div className={styles.header__form}>
                <Search/>
                <div>
                    push
                </div>
            </div>
        </header>
    )
}

export default Header