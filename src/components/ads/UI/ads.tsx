import styles from "./ads.module.scss";
import gift from "@assets/icon/gift.png";
import ButtonAds from "@components/button/UI/buttonAds.tsx";

const Ads = () => {
    const handleOnClick = ()=>{
        console.log('click');
    }
    return (
        <section className={styles.ads}>
            <div>
                <img src={gift} alt={'gift images'}/>
            </div>
            <div className={styles.ads__text}>
                <p className={styles.ads__description}>
                    Оформите подписку, чтобы получить больше возможностей!
                </p>
                <p className={styles.ads__description}>С вами свяжется наш администратор 😉</p>
            </div>

            <ButtonAds onClick={handleOnClick} text={'Отправить запрос на подписку'}/>
        </section>
    )
}

export default Ads