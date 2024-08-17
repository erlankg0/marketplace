import React, {useState} from "react";
import {Modal} from "antd";

import {IStatusAds} from "@components/ads/interface.ts";
import ButtonAds from "@components/button/UI/buttonAds.tsx";
import Alert from "@components/alert/UI/alert.tsx";
import {postSendSubscriptionRequest} from "@network/profile/profile.ts";
import gift from "@assets/icon/gift.png";
import done from "@assets/icon/done.svg";
import styles from "./ads.module.scss";

const Ads: React.FC<IStatusAds> = ({status}) => {
    const [success, setSuccess] = useState<boolean>(false); // Состояние нового модального окна для подтверждения выхода
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>()

    const handleToggleSuccess = () => {
        setSuccess(!success);
    }
    const handleToggleError = () => {
        setError(!error);
    }
    const handleSendSubscribe = async () => {
        const response = await postSendSubscriptionRequest();
        if ('status' in response) {
            setMessage(`${response.message}, код: ${response.status}`)
            handleToggleError()
        } else {
            setMessage(response.message);
            handleToggleSuccess();
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
            ) : (
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
            <Modal open={success} footer={null} centered={true}>
                <Alert setModalActive={handleToggleSuccess} text={message} success={success}/>
            </Modal>
            <Modal open={error} footer={null} centered={true}>
                <Alert setModalActive={handleToggleError} error={error} text={message}/>
            </Modal>
        </>

    )
}

export default Ads