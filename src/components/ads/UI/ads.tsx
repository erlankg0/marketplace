import styles from "./ads.module.scss";
import gift from "@assets/icon/gift.png";
import done from "@assets/icon/done.svg";
import ButtonAds from "@components/button/UI/buttonAds.tsx";
import {postSendSubscriptionRequest} from "@network/profile/profile.ts";
import {IStatusAds} from "@components/ads/interface.ts";
import React from "react";

const Ads: React.FC<IStatusAds> = ({status}) => {

    const handleSendSubscribe = async () => {
        try {
            const response = await postSendSubscriptionRequest();
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            {status ? (
                <section className={styles.ads__flex}>

                    <img className={styles.ads__date} src={done} alt={'gift images'}/>

                    <div className={styles.ads__text}>
                        <h2 className={styles.ads__title}>Подписка оформлена</h2>
                        <p className={styles.ads__date}>Срок: до бесконечности</p>
                    </div>
                </section>
            ): (
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
            )}
        </>

    )
}

export default Ads