import styles from "./ads.module.scss";
import gift from "@assets/icon/gift.png";
import ButtonAds from "@components/button/UI/buttonAds.tsx";
import {postSendSubscriptionRequest} from "@network/profile/profile.ts";

const Ads = () => {

    const handleSendSubscribe = async () => {
        try {
            const response = await postSendSubscriptionRequest();
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
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

            <ButtonAds onClick={handleSendSubscribe} text={'Отправить запрос на подписку'}/>
        </section>
    )
}

export default Ads