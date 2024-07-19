import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAddDispatch} from "@redux/hooks.ts";

import type {GetProp} from 'antd';
import {Flex, Input} from 'antd';
import type {OTPProps} from 'antd/es/input/OTP';

import ButtonComponent from "@components/button/UI/button.tsx";
import styles from "@layout/Auth/UI/auth.module.scss";
import authBackground from "@assets/images/authBackground.jpg";
import Timer from "@components/timer/UI/timer.tsx";
import {activate_code, reSendCode} from "@network/auth/confirme.ts";
import {login, setAccessToken, setRefreshToken} from "@redux/slices/auth.ts";

const Confirmed = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [waiting, setWaiting] = useState<boolean>(true);
    const email = localStorage.getItem('email');
    const dispatch = useAddDispatch();

    const handleAuthorization = (accessToken: string, refreshToken: string) => {
        console.log('Dispatching setAccessToken and setRefreshToken'); // Логируем вызов dispatch

        dispatch(setAccessToken(accessToken));
        dispatch(setRefreshToken(refreshToken));
        dispatch(login());
    }
    // const handleAccessToken = (token: string) => {
    //     dispatch(setAccessToken(token));
    //     dispatch(login());
    // }
    const handleActivateCode = async (inputCode: string) => {
        try {
            if (email && email.length > 1) {
                const response = await activate_code({email, code: inputCode});
                console.log('Activation response:', code);
                handleAuthorization(response.data.accessToken, response.data.refreshToken);
                navigate('/');
                setError(false);
            }
        } catch (err) {
            console.error('Activation error:', err);
            setError(true);
        }
    };

    const onChange: GetProp<typeof Input.OTP, 'onChange'> = (text) => {
        console.log('onChange:', text);
        setCode(text);
        if (text.length === 4) {
            handleActivateCode(text);
        }
    };

    const handleResendCode = async () => {
        setWaiting(true);
        try {
            if (email) {
                const response = await reSendCode(email);
                console.log('Код отправлен снова:', response);
            }
        } catch (err) {
            console.error('Ошибка при повторной отправке кода:', err);
        }
    };

    const handleTimerReset = () => {
        setWaiting(false);
    };

    const sharedProps: OTPProps = {
        onChange,
    };

    return (
        <section className={styles.content}>
            <section className={styles.auth}>
                <div className={styles.auth__text}>
                    <h2 className={styles.auth__title}><strong>Регистрация</strong></h2>
                    <p>Введите код подтверждения, отправленный на вашу почту</p>
                </div>
                <i className={'line'}></i>
                <form onSubmit={(event) => event.preventDefault()}>
                    <Flex gap={"5rem"} justify={"center"} align={"center"} vertical={true}>
                        <Input.OTP
                            length={4}
                            style={{gap: '2rem', height: '8rem'}}
                            {...sharedProps}
                        />
                        {error && <div className={styles.error}>Неверный код. Пожалуйста, попробуйте снова.</div>}
                        <ButtonComponent text={'Отправить код ещё раз'} waiting={waiting} onClick={handleResendCode}/>
                    </Flex>
                    <Timer initialSeconds={60} onReset={handleTimerReset}/>
                </form>
            </section>
            <section className={styles.intro} style={{backgroundImage: `url(${authBackground})`}}>
                <div className={styles.intro__content}>
                    <div className={styles.intro__logo}>
                        <p>ST</p>
                    </div>
                    <div className={styles.intro__text}>
                        <h1>SmartTale</h1>
                        <p>Мониторинг и управление швейным производством</p>
                    </div>
                </div>
            </section>
        </section>
    )
};

export default Confirmed;