import {Flex} from "antd";
import {NavLink, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import {yupResolver} from "@hookform/resolvers/yup";
import {setEmail} from "@redux/slices/singup.ts";
import {useAddDispatch, useAppSelector} from "@redux/hooks.ts";

import ButtonComponent from "@components/button/UI/button.tsx";
import {IAuth} from "@layout/Auth/interface.ts";

import {validationSchema} from "@validations/auth.ts";

import styles from "./auth.module.scss";
import authBackground from "@assets/images/authBackground.jpg";

const Auth = () => {
    const form = useForm<IAuth>({
        resolver: yupResolver(validationSchema),
    });
    const {register, formState: {errors, touchedFields}, handleSubmit} = form;
    const dispatch = useAddDispatch();
    const email =  useAppSelector(state => state.singUp.email);
    const navigate = useNavigate();
    const onSubmit = (data: IAuth) => {
        dispatch(setEmail(data.email))
        console.log("form submit", email)
    };

    return (
        <section className={styles.content}>
            <section className={styles.auth}>
                <div className={styles.auth__text}>
                    <h2 className={styles.auth__title}><strong>Авторизация</strong></h2>
                    <p>Введите ваши почту и номер телефона, чтобы войти в систему</p>
                </div>
                <i className={'line'}></i>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex vertical style={{gap: '16px'}}>
                        <div className={styles.field}>
                            <label
                                className={errors.email ? `${styles.label} ${styles.error}` : `${styles.label}`}
                                htmlFor="email"
                            >Почта*</label>
                            <input
                                type="email"
                                id="email"
                                {...register('email')}
                                autoFocus={touchedFields.email}
                                className={styles.input}
                                placeholder={"example@jom.com.kg"}
                            />
                        </div>

                        <Flex vertical={false} gap={5}>
                            <input type={'checkbox'}/>
                            <label htmlFor={'remember'}>Запомнить меня</label>
                        </Flex>
                        <ButtonComponent text={'Авторизация'} onClick={()=> {
                            navigate('/confirmed')
                        }}/>
                        <Flex gap={5}>
                            <p>Нету аккаунта?</p>
                            <NavLink className={'link'} to="/singup">Регистрация</NavLink>
                        </Flex>
                    </Flex>
                </form>
            </section>

            <section className={styles.intro} style={{backgroundImage: `url(${authBackground})`}}>
                <div className={styles.intro__content}>
                    <div className={styles.intro__logo}>
                        <p>ST</p>
                    </div>
                    <p className={styles.intro__text}>
                        <h1>SmartTale</h1>
                        <p>Мониторинг и управление швейным производством</p>
                    </p>
                </div>
            </section>
        </section>
    )
}

export default Auth