import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {validationSchema} from "@validations/auth.ts";
import {Flex} from "antd";
import styles from "./auth.module.scss";
import authBackground from "@assets/images/authBackground.jpg";
import ButtonComponent from "@components/button/UI/button.tsx";
import {NavLink} from "react-router-dom";
import {IAuth} from "@layout/Auth/interface.ts";
import {useAddDispatch} from "@redux/hooks.ts";
import {login} from "@redux/slices/singup.ts";
import {useAppSelector} from "@redux/hooks.ts";
import {useNavigate} from "react-router-dom";

const Auth = () => {
    const form = useForm<IAuth>({
        resolver: yupResolver(validationSchema),
    });
    const {register, formState: {errors, touchedFields}, handleSubmit} = form;
    const dispatch = useAddDispatch();
    const {
        email,
        phone,
        firstName,
        lastName,
        middleName,
        isAuthenticated,
        remember
    } = useAppSelector(state => state.singUp);
    const navigate = useNavigate();
    const onSubmit = (data: IAuth) => {
        dispatch(login(data))
        console.log("form submit", data)
        console.log(email, phone, firstName, lastName, middleName, isAuthenticated, remember)
    }
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

                        <div className={styles.field}>
                            <label
                                className={errors.phone ? `${styles.label} ${styles.error}` : `${styles.label}`}
                                htmlFor="phone"
                            >Номер телефона*</label>
                            <input
                                type="tel"
                                id="phone"
                                {...register('phone')}
                                autoFocus={touchedFields.phone}
                                className={styles.input}
                                placeholder={"+90 553 368 73 69"}
                            />
                        </div>
                        <Flex vertical={false} gap={5}>
                            <input type={'checkbox'}/>
                            <label htmlFor={'remember'}>Запомнить меня</label>
                        </Flex>
                        <ButtonComponent text={'Авторизация'} onClick={()=> {
                            navigate('/marketplace')
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