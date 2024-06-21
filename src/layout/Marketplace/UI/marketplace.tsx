import Logo from "@components/logo/UI/logo.tsx";
import Alert from "@components/alert/UI/alert.tsx";
import Dropdown from "@components/dropdown/UI/dropdown.tsx";
import Logout from "@components/logout/UI/logout.tsx";
import Header from "@components/header/UI/header.tsx";
import Modal from "@components/modal/UI/modal.tsx";
import CardModal from "@components/cardModal/UI/cardModal.tsx";

import Cards from "@layout/Cards/UI/cards.tsx";
import Ads from "@layout/ads/UI/ads.tsx";

import {useState} from "react";
import {Route, Routes} from "react-router-dom";

import styles from "./marketplace.module.scss";

import person from "@assets/icon/person.svg"
import clipboard from "@assets/icon/clipboard.svg"
import shopping from "@assets/icon/shopping.svg"
import Monitoring from "@layout/Monitoring/UI/monitoring.tsx";


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
                              tabs={[{title: "Оборудования", url: "equipment"}, {
                                  title: "Заказы",
                                  url: 'order'
                              }, {title: 'Разместить заказ', url: 'add-order'}]}/>

                    <div className={'line'}></div>

                    <Dropdown icon={clipboard} title={'Заказы'}
                              tabs={[{title: "Текущие заказы", url: "current-orders"}, {
                                  title: "Заказы",
                                  url: 'order'
                              }]}/>


                    <div className={'line'}></div>

                    <Dropdown icon={shopping} title={'Маркетплейс'}
                              tabs={[{title: "Оборудования", url: "equipment"}, {
                                  title: "Заказы",
                                  url: 'order'
                              }, {title: 'Разместить заказ', url: 'add-order'}]}/>


                    <div className={'line'}></div>
                </div>
                <Logout onClick={handleLogout}/>
            </aside>
            <section className={styles.content}>
                <Header/>
                <div className={'line'}></div>
                <Routes>
                    <Route path={'/equipment'} element={<Cards setActiveModal={setModalActive}/>}/>
                    <Route path={'/order'} element={<Cards setActiveModal={setModalActive}/>}/>
                    <Route path={'/add-order'} element={<Ads/>}/>
                    <Route path={'current-orders'} element={<Monitoring/>}/>
                </Routes>

            </section>
            <Modal
                active={modalActive}
                setModalActive={setModalActive}
                component={CardModal}
                componentProps={{setAlert: setLogoutModalActive, price: '', setModal: setModalActive}}
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