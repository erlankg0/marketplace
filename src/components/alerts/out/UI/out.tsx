import styles from "@components/alerts/forgot/UI/forgot.module.scss";
import out from "@assets/emoji/out.jpeg";
import ButtonComponent from "@components/button/UI/button.tsx";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {IOut} from "@components/alerts/out/interface.ts";

const Out: React.FC<IOut> = ({setModalActive}) => {
    const [logout, setLogout] = useState<boolean>(false)
    const navigate = useNavigate();
    useEffect(() => {
        console.log(logout)
        if (logout) {
            navigate('/marketplace');
        }
    }, [logout, setLogout])
    return (
        <div className={styles.forgot}>
            <div className={styles.forgot__head}>
                <img className={styles.forgot__image} src={out} alt={'forgot icon'}/>
            </div>
            <div className={styles.forgot__text}>
                <div>
                    <p className={styles.forgot__title}>Вы действительно</p>
                    <p className={styles.forgot__title}>хотите выйти?</p>
                </div>
                <div>
                    <p className={styles.forgot__description}>Все данные будут сохранены!</p>
                </div>
            </div>
            <div className={styles.forgot__out}>
                <ButtonComponent waiting={true} onClick={() => {
                    setLogout(false);
                    if (setModalActive) {
                        setModalActive(!logout);
                    }
                }} text={'Нет'}/>
                <ButtonComponent onClick={() => {
                    setLogout(true);
                    if (setModalActive) {
                        setModalActive(!logout);
                    }
                }} text={'Да'}/>
            </div>
        </div>)
}

export default Out