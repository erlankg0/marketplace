import styles from "@layout/Auth/UI/auth.module.scss";
import authBackground from "@assets/images/authBackground.jpg";
import {Progress as ProgressBar} from "antd";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Progress = () => {
    const [percent, setPercent] = useState<number>(0);
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            setPercent(prevPercent => {
                const newPercent = prevPercent + 1;
                if (newPercent >= 100) {
                    clearInterval(interval);
                    navigate('/')
                }
                return newPercent
            })
        }, 300)
    })

    return (
        <section className={styles.content}>
            <section className={styles.auth}>
                <div className={styles.auth__text}>
                    <h2 className={styles.auth__title}><strong>Авторизация</strong></h2>
                    <p>Пару секунд и вы в системе! 😃</p>
                </div>
                <ProgressBar percent={percent} strokeColor={'#FFCC00'}/>
            </section>

            <section className={styles.intro} style={{backgroundImage: `url(${authBackground})`}}>
                <div className={styles.intro__content}>
                    <div className={styles.intro__logo}>
                        <p>ST</p>
                    </div>
                    <text className={styles.intro__text}>
                        <h1>SmartTale</h1>
                        <p>Мониторинг и управление швейным производством</p>
                    </text>
                </div>
            </section>
        </section>
    )
}

export default Progress