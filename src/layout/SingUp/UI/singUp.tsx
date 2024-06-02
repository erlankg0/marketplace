import {useForm} from 'react-hook-form';
import {ISingUp} from '@layout/SingUp/interface.ts';
import {yupResolver} from '@hookform/resolvers/yup';
import {ValidationSingUp} from '@validations/singUp.ts';
import {NavLink, useNavigate} from 'react-router-dom';
import {Button, Flex} from 'antd';
import styles from "@layout/Auth/UI/auth.module.scss";

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
        <div className={styles.content}>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex vertical style={{gap: '16px'}}>
                        <div>
                            <label
                                className={errors.email ? `${styles.label} ${styles.error}` : `${styles.label}`}
                                htmlFor="email"
                            >Эл. почта</label>
                            <input
                                type="email"
                                id="email"
                                {...register('email')}
                                autoFocus={touchedFields.email}
                                className={styles.input}
                            />

                            {errors.email && <p className="error-message">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="phone"
                                className={errors.phone ? `${styles.label} ${styles.error}` : styles.label}
                            >Номер телефона</label>
                            <input
                                type="tel"
                                id="phone"
                                {...register('phone')}
                                autoFocus={touchedFields.phone}
                                className={styles.input}
                            />
                            {errors.phone && <p className="error-message">{errors.phone.message}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="username"
                                className={errors.username ? `${styles.label} ${styles.error}` : styles.label}
                            >Имя пользователя</label>
                            <input
                                type="text"
                                id="username"
                                {...register('username')}
                                autoFocus={touchedFields.username}
                                className={styles.input}
                            />
                            {errors.username && <p className="error-message">{errors.username.message}</p>}
                        </div>
                        <Button htmlType="submit" type="dashed">Регистрация</Button>
                        <NavLink className={'link'} to="/auth">Авторизация</NavLink>
                    </Flex>
                </form>
            </div>
            <div>
                a
            </div>
        </div>
    );
};

export default SingUp;
