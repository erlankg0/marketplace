import {useLocation} from "react-router";
import {Breadcrumb} from "antd";
import {NavLink} from "react-router-dom";
import styles from "./header.module.scss";
import Search from "@components/search/UI/search.tsx";
import Push from "@components/push/UI/push.tsx";
import Notifications from "@components/notifications/UI/notifications.tsx";
import {useEffect, useState} from "react";

const Header = () => {
    const location = useLocation();
    const pathNames = location.pathname.split('/').filter(path => path);
    const [push, setPush] = useState<boolean>(false);
    const [title, setTitle] = useState<string>()
    useState()
    const handleTogglePush = () => {
        setPush(!push);
    }
    const handleTitle = () => {
        switch (pathNames[pathNames.length - 1]) {
            case 'equipment':
                setTitle('Оборудования');
                break;
            case 'services':
                setTitle('Услуги');
                break;
            case 'order':
                setTitle('Заказы');
                break;
            case 'profile':
                setTitle('Личная страница');
                break;
            case 'add-order':
                setTitle('Объявления');
                break;
            case 'admin':
                setTitle('Организация');
                break;
            case 'self-ads':
                setTitle('Мои объявления');
                break;
            case 'self-buy':
                setTitle('Мои покупки');
                break;
            case 'history-orders':
                setTitle('История заказов');
                break;
            case 'current-orders':
                setTitle('Мониторниг текуших заказов');
                break;
            case 'add-employer':
                setTitle('Сотрудники');
                break;
            case 'appointment':
                setTitle('Позиция');
                break;
            case 'history-employer':
                setTitle('История сотрудника');
                break
            default:
                setTitle('');
                break;
        }

    }
    useEffect(handleTitle, [pathNames])

    return (
        <header className={styles.header}>
            <div className={styles.header__text}>
                <Breadcrumb>
                    {pathNames.map((path, index) => {
                        const url = `/${pathNames.slice(0, index + 1).join('/')}`;
                        return (
                            <Breadcrumb.Item key={url}>
                                <NavLink to={url}>
                                    {path.charAt(0).toUpperCase() + path.slice(1)}
                                </NavLink>
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>
                <p className={'title'}>{title && title}</p>
            </div>
            <div className={styles.header__form}>
                <Search/>
                <Push onClick={handleTogglePush}/>
            </div>
            <Notifications active={push}/>
        </header>
    )
}

export default Header;