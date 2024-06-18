import Logo from "@components/logo/UI/logo.tsx";
import Alert from "@components/alert/UI/alert.tsx";
import Dropdown from "@components/dropdown/UI/dropdown.tsx";
import Logout from "@components/logout/UI/logout.tsx";
import Header from "@components/header/UI/header.tsx";
import Card from "@components/card/UI/card.tsx";
import Modal from "@components/modal/UI/modal.tsx";
import CardModal from "@components/cardModal/UI/cardModal.tsx";

import Ads from "@layout/ads/UI/ads.tsx";

import {useState} from "react";
import {Route, Routes} from "react-router-dom";

import styles from "./marketplace.module.scss";

import person from "@assets/icon/person.svg"
import clipboard from "@assets/icon/clipboard.svg"
import shopping from "@assets/icon/shopping.svg"


const Marketplace = () => {
    const [modalActive, setModalActive] = useState<boolean>(false)
    const [logoutModalActive, setLogoutModalActive] = useState<boolean>(false); // Состояние нового модального окна для подтверждения выхода
    const handleLogout = () => {
        setLogoutModalActive(true); // Показать модальное окно для подтверждения выхода при нажатии на кнопку выхода
    };

    return (
        <main className={styles.body}>
            <aside className={styles.aside}>
                <div className={styles.aside__logo}>
                    <Logo/>
                    <div className={styles.aside__logo__text}>
                        <h1 className={styles.aside__title}>SmartTale</h1>
                        <p className={styles.aside__paragraph}>Мониторинг и управление швейным производством</p>
                    </div>

                    <div className={'line'}></div>

                    <Dropdown icon={person} title={'Личный кабинет'}
                              tabs={['Профиль', 'Мои объявления', 'Мои покупки', 'История заказов', 'Организация']}/>

                    <div className={'line'}></div>

                    <Dropdown icon={clipboard} title={"Заказы"} tabs={['Текущие заказы', 'История']}/>

                    <div className={'line'}></div>

                    <Dropdown icon={shopping} title={'Маркетплейс'}
                              tabs={['Оборудования', 'Услуги', 'Разместить заказ']}/>

                    <div className={'line'}></div>
                </div>
                <Logout onClick={handleLogout}/>
            </aside>
            <section className={styles.content}>
                <Header/>
                <div className={'line'}></div>
                <Routes>
                    <Route path={'/'} element={<div className={styles.cards}>
                        <Card setActiveModal={setModalActive}/>
                    </div>}/>
                    <Route path={'/services'} element={<Ads/>}/>
                </Routes>

            </section>
            <Modal
                active={modalActive}
                setModalActive={setModalActive}
                component={CardModal}
                componentProps={{}}
            />
            <Modal
                active={logoutModalActive}
                setModalActive={setLogoutModalActive}
                component={Alert} // Передача компонента модального окна для подтверждения выхода
                componentProps={{}}
            />

        </main>
    )
}

export default Marketplace;