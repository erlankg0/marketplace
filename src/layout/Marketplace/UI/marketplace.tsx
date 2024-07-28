import Logo from "@components/logo/UI/logo.tsx";
import Alert from "@components/alert/UI/alert.tsx";
import Dropdown from "@components/dropdown/UI/dropdown.tsx";
import Logout from "@components/logout/UI/logout.tsx";
import Header from "@components/header/UI/header.tsx";
import Modal from "@components/modal/UI/modal.tsx";
import CardModal from "@components/cardModal/UI/cardModal.tsx";

import Cards from "@layout/Cards/UI/cards.tsx";
import Ads from "@layout/ads/UI/ads.tsx";
import Monitoring from "@layout/Monitoring/UI/monitoring.tsx";
import History from "@layout/MonitoringHistory/UI/monitoring.tsx";
import Profile from "@layout/Profile/UI/profile.tsx";
import Organization from "@layout/Organization/organization/UI/organization.tsx";

import {useState} from "react";
import {Route, Routes} from "react-router-dom";

import styles from "./marketplace.module.scss";

import person from "@assets/icon/person.svg"
import clipboard from "@assets/icon/clipboard.svg"
import shopping from "@assets/icon/shopping.svg"
import Nav from "@components/Nav/UI/nav.tsx";
import {useLocation} from "react-router";


const Marketplace = () => {
    const [modalActive, setModalActive] = useState<boolean>(false)
    const [logoutModalActive, setLogoutModalActive] = useState<boolean>(false); // Состояние нового модального окна для подтверждения выхода
    const handleLogout = () => {
        setLogoutModalActive(true); // Показать модальное окно для подтверждения выхода при нажатии на кнопку выхода
    };
    const path = useLocation().pathname.split('/').pop() as string;

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
                              tabs={[{title: "Профиль", url: "profile"}, {
                                  title: "Заказы",
                                  url: 'order'
                              }, {title: 'Разместить заказ', url: 'add-order'}]}/>

                    <div className={'line'}></div>

                    <Dropdown icon={clipboard} title={'Заказы'}
                              tabs={[{title: "Текущие заказы", url: "current-orders"}, {
                                  title: "История заказов",
                                  url: 'history-orders'
                              }]}/>


                    <div className={'line'}></div>

                    <Dropdown icon={shopping} title={'Маркетплейс'}
                              tabs={[{title: "Оборудования", url: ""}, {title: "Заказы", url: 'order'}, {title: "Услуги", url: "services"}, {title: 'Разместить заказ', url: 'add-order'}]}/>


                    <div className={'line'}></div>

                    <Nav url={'organization'} title={"Организация"} icon={shopping}/>
                    <Nav url={'organization/admin'} title={"Админ"} icon={shopping}/>
                    <Nav url={'organization/add-employer'} title={"Персонал"} icon={shopping}/>
                    <Nav url={'organization/list-employer'} title={"Персонал Таблица"} icon={shopping}/>
                    <Nav url={'organization/detail-employer'} title={"Персонал Детали"} icon={shopping}/>
                    <Nav url={'organization/appointment'} title={"Персонал Должность"} icon={shopping}/>
                    <Nav url={'organization/history-employer'} title={'История'} icon={shopping}/>

                </div>
                <Logout active={!modalActive} onClick={handleLogout}/>
            </aside>
            <section className={styles.content}>
                <Header/>
                <div className={'line'}></div>
                <Routes>
                    <Route path={'/profile'} element={<Profile/>}/>
                    <Route path={'/'} element={<Cards url={path} setActiveModal={setModalActive}/>}/>
                    <Route path={'/order'} element={<Cards url={path} setActiveModal={setModalActive}/>}/>
                    <Route path={'/services'} element={<Cards url={path} setActiveModal={setModalActive}/>}/>
                    <Route path={'/add-order'} element={<Ads/>}/>
                    <Route path={'/current-orders'} element={<Monitoring/>}/>
                    <Route path={'/history-orders'} element={<History setModalActive={setModalActive}/>}/>
                    <Route path={'/organization/*'} element={<Organization setModalActive={setModalActive}/>}/>
                </Routes>
                <Modal
                    active={modalActive}
                    setModalActive={setModalActive}
                    component={CardModal}
                    componentProps={{setModal: setModalActive, setAlert: setLogoutModalActive, price: '1000'}}
                />
                <Modal
                    active={logoutModalActive}
                    setModalActive={setLogoutModalActive}
                    component={Alert} // Передача компонента модального окна для подтверждения выхода
                    componentProps={{logout: true, setModalActive: setLogoutModalActive}}
                />
            </section>
        </main>
    )
}

export default Marketplace;