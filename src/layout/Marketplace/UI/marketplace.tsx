import styles from "./marketplace.module.scss";
import Logo from "@components/logo/UI/logo.tsx";
import Dropdown from "@components/dropdown/UI/dropdown.tsx";
import Logout from "@components/logout/UI/logout.tsx";
import Header from "@components/header/UI/header.tsx";
import Card from "@components/card/UI/card.tsx";


const Marketplace = () => {
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
                <Logout/>
            </aside>
            <section className={styles.content}>
                <Header/>
                <div className={'line'}></div>
                <div className={styles.cards}>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </section>
        </main>
    )
}

export default Marketplace;