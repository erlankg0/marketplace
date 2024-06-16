import styles from "./marketplace.module.scss";
import Logo from "@components/logo/UI/logo.tsx";
import Dropdown from "@components/dropdown/UI/dropdown.tsx";
import Logout from "@components/logout/UI/logout.tsx";
import Header from "@components/header/UI/header.tsx";
import Card from "@components/card/UI/card.tsx";
import {useState} from "react";
import Modal from "@components/modal/UI/modal.tsx";
import CardModal from "@components/cardModal/UI/cardModal.tsx";
import {Route, Routes} from "react-router-dom";
import Ads from "@layout/ads/UI/ads.tsx";
import Alert from "@components/alert/UI/alert.tsx";


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

                    <Dropdown/>

                    <div className={'line'}></div>

                    <Dropdown/>

                    <div className={'line'}></div>

                    <Dropdown/>

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