import type {GetProp} from 'antd';
import {Flex, Input} from 'antd';
import type {OTPProps} from 'antd/es/input/OTP';
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "@layout/Auth/UI/auth.module.scss";
import authBackground from "@assets/images/authBackground.jpg";
import ButtonComponent from "@components/button/UI/button.tsx";

const Confirmed = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState<string>();
    const [error, setError] = useState<boolean>(false)
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(code)
        if (code == '1111') {
            navigate('/')
            setError(false);
        }
        console.log(error)
        setError(true)
    }
    const onChange: GetProp<typeof Input.OTP, 'onChange'> = (text) => {
        console.log('onChange:', text);
        setCode(text);
    };

    const sharedProps: OTPProps = {
        onChange,
    };
    return (
        <section className={styles.content}>
            <section className={styles.auth}>
                <div className={styles.auth__text}>
                    <h2 className={styles.auth__title}><strong>Регистрация</strong></h2>
                    <p>Введите ваши ФИО и почту, чтобы войти в систему</p>
                </div>
                <i className={'line'}></i>
                <form onSubmit={(event) => onSubmit(event)}>
                    <Flex gap={"5rem"} justify={"center"} align={"center"} vertical={true}>
                        <Input.OTP
                            length={4}
                            style={{gap: '2rem', height: '8rem'}}
                            onError={() => (<div>Error</div>)}
                            {...sharedProps}/>
                        <ButtonComponent text={'Подверждения'} onSubmit={() => undefined}/>
                    </Flex>
                </form>
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
export default Confirmed;