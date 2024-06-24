import {useForm} from 'react-hook-form';
import {ISingUp} from '@layout/SingUp/interface.ts';
import {yupResolver} from '@hookform/resolvers/yup';
import {ValidationSingUp} from '@validations/singUp.ts';
import {NavLink, useNavigate} from 'react-router-dom';
import {Flex} from 'antd';
import styles from "@layout/Auth/UI/auth.module.scss";
import authBackground from "@assets/images/authBackground.jpg";
import ButtonComponent from "@components/button/UI/button.tsx";

const SingUp = () => {
    const navigate = useNavigate();
    const form = useForm<ISingUp>({
        resolver: yupResolver(ValidationSingUp),
    });
    const {register, formState: {errors, touchedFields}, handleSubmit} = form;

    const onSubmit = (data: ISingUp) => {
        console.log(data);
        navigate('/confirmed')
    };

    return (
        <article className={styles.content}>
            <section className={styles.auth}>
                <div className={styles.auth__text}>
                    <h2 className={styles.auth__title}><strong>Регистрация</strong></h2>
                    <p>Введите ваши ФИО и почту, чтобы войти в систему</p>
                </div>
                <i className={'line'}></i>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Flex vertical style={{gap: '16px'}}>
                        <div className={styles.field}>
                            <label
                                className={errors.lastName ? `${styles.label} ${styles.error}` : `${styles.label}`}
                                htmlFor="lastName"
                            >Фамилия*</label>
                            <input
                                type="text"
                                id="lastName"
                                {...register('lastName')}
                                autoFocus={touchedFields.lastName}
                                className={styles.input}
                                placeholder={"Абдраимов"}
                            />
                        </div>

                        <div className={styles.field}>
                            <label
                                className={errors.firstName ? `${styles.label} ${styles.error}` : `${styles.label}`}
                                htmlFor="firstName"
                            >Имя*</label>
                            <input
                                type="text"
                                id="firstName"
                                {...register('firstName')}
                                autoFocus={touchedFields.firstName}
                                className={styles.input}
                                placeholder={"Эрлан"}
                            />
                        </div>
                        <div className={styles.field}>
                            <label
                                className={errors.middleName ? `${styles.label} ${styles.error}` : `${styles.label}`}
                                htmlFor="middleName"
                            >Отчество*</label>
                            <input
                                type="text"
                                id="middleName"
                                {...register('middleName')}
                                autoFocus={touchedFields.middleName}
                                className={styles.input}
                                placeholder={"Кубанычбекович"}
                            />
                        </div>

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
                            >Отчество*</label>
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
                        <ButtonComponent text={'Зарегистрироваться'} onSubmit={() => alert('ok')}/>
                        <Flex gap={5}>
                            <p>Уже зарегистрированы?</p>
                            <NavLink className={'link'}  to="/">Войти</NavLink>
                        </Flex>
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
        </article>
    );
};

export default SingUp;
