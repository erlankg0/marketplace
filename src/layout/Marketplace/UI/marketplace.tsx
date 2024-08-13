import Logo from "@components/logo/UI/logo.tsx";
import Alert from "@components/alert/UI/alert.tsx";
import Dropdown from "@components/dropdown/UI/dropdown.tsx";
import Logout from "@components/logout/UI/logout.tsx";
import Header from "@components/header/UI/header.tsx";
import Modal from "@components/modal/UI/modal.tsx";

import Cards from "@layout/Cards/UI/cards.tsx";
import Ads from "@layout/ads/UI/ads.tsx";
import Monitoring from "@layout/Monitoring/UI/monitoring.tsx";
import Profile from "@layout/Profile/UI/profile.tsx";
import Organization from "@layout/Organization/organization/UI/organization.tsx";
import HistoryList from "@layout/Profile/history/UI/history.tsx";

import {useState} from "react";
import {Route, Routes} from "react-router-dom";

import styles from "./marketplace.module.scss";

import person from "@assets/icon/person.svg"
import clipboard from "@assets/icon/clipboard.svg"
import shopping from "@assets/icon/shopping.svg"
import organization from "@assets/icon/organization.svg";

import {useLocation} from "react-router";
import CurrentOrders from "@layout/Profile/orders/Current/UI/current.tsx";
import DetailOrder from "@layout/Profile/orders/Detail/UI/detail.tsx";

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

                    <Dropdown key={'profile'} icon={person} title={'Личный кабинет'}
                              tabs={
                                  [
                                      {title: "Профиль", url: "profile"},
                                      {title: "Мои объявления", url: 'self-ads'},
                                      {title: 'Мои покупки', url: 'self-buys'},
                                      {title: 'История заказов', url: 'profiles/history-orders'}
                                  ]
                              }/>

                    <div className={'line'}></div>

                    <Dropdown key={'orders'} icon={clipboard} title={'Заказы'}
                              tabs={
                                  [
                                      {title: "Текущие заказы", url: "current-orders"},
                                      {title: "История заказов", url: 'history-orders'}
                                  ]
                              }/>


                    <div className={'line'}></div>

                    <Dropdown key={'marketplace'} icon={shopping} title={'Маркетплейс'}
                              tabs={
                                  [
                                      {title: "Оборудования", url: "equipment"},
                                      {title: "Заказы", url: 'order'},
                                      {title: "Услуги", url: "services"},
                                      {title: 'Разместить заказ', url: 'add-order'}
                                  ]
                              }/>
                    <div className={'line'}></div>

                    <Dropdown key={'organization'} icon={organization} title={'Оргазаниция'}
                              tabs={
                                  [
                                      {title: "Админ", url: "organization/admin"},
                                      {title: "Сотрудники", url: 'organization/add-employer'},
                                      {title: "Должность", url: "organization/appointment"},
                                      {title: 'История', url: "organization/history-employer"}
                                  ]
                              }/>
                    <div className={'line'}></div>

                </div>
                <Logout active={!modalActive} onClick={handleLogout}/>
            </aside>
            <section className={styles.content}>
                <Header/>
                <div className={'line'}></div>
                <Routes>
                    <Route path={'/profile'} element={<Profile/>}/>
                    <Route path={'/profiles/history-orders'} element={<HistoryList/>}/>
                    <Route path={'/self-ads'} element={<CurrentOrders/>}/>
                    <Route path={'/self-detail/:id/:category'} element={<DetailOrder/>}/>
                    <Route path={'/equipment'} element={<Cards url={path} setActiveModal={setModalActive}/>}/>
                    <Route path={'/order'} element={<Cards url={path} setActiveModal={setModalActive}/>}/>
                    <Route path={'/services'} element={<Cards url={path} setActiveModal={setModalActive}/>}/>
                    <Route path={'/add-order'} element={<Ads/>}/>
                    <Route path={'/current-orders'} element={<Monitoring/>}/>
                    {/*<Route path={'/history-orders'} element={<History/>}/>*/}
                    <Route path={'/organization/*'} element={<Organization setModalActive={setModalActive}/>}/>
                </Routes>
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