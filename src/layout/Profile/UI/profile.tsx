import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import React, {useEffect, useState} from "react";

import Ads from "@components/ads/UI/ads.tsx";
import ButtonComponent from "@components/button/UI/button.tsx";
import Alert from "@components/alert/UI/alert.tsx";
import Person from "@components/person/UI/person.tsx";

import {useAddDispatch, useAppSelector} from "@redux/hooks.ts";
import {setProfile} from "@redux/slices/profile.ts";

import {IProfile} from "@layout/Profile/interface.ts";
import {IEditProfile} from "@network/interfaces/profile/profile.ts";
import {getProfile, putProfile} from "@network/profile/profile.ts";

import {validateProfile} from "@validations/profile.ts";

import styles from "./profile.module.scss";
import {Modal} from "antd";

const Profile: React.FC = () => {
    const form = useForm<IProfile>({resolver: yupResolver(validateProfile)});
    const {register, reset, formState: {errors}, handleSubmit} = form;
    const [modal, setModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [success, setSuccess] = useState<boolean>(false); // Состояние нового модального окна для подтверждения выхода
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>()

    const handleToggleSuccess = () => {
        setSuccess(!success);
    }
    const handleToggleError = () => {
        setError(!error);
    }

    const profile = useAppSelector(state => state.profile);
    const dispatch = useAddDispatch();

    const handlePutProfile = async (data: IEditProfile) => {
        try {
            const response = await putProfile(data);
            if ('status' in response) {
                setMessage(`${response.message}, код: ${response.status}`);
                handleToggleError();
            } else {
                setMessage('Успешно, обновлены данные!')
                setSuccess(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (data: IProfile) => {
        setLoading(true);
        const profileData: IEditProfile = {
            phoneNumber: data.phoneNumber,
            name: data.name,
            surname: data.surname,
            patronymic: data.patronymic
        };
        await handlePutProfile(profileData);
        setLoading(false);
    };

    const fetchProfile = async () => {
        try {
            const response = await getProfile();
            if ('status' in response) {
                setMessage(`${response.message}, код: ${response.status}`)
                handleToggleError();
            } else {
                dispatch(setProfile(response));
                reset({
                    name: response.name,
                    surname: response.surname,
                    patronymic: response.patronymic,
                    email: response.email,
                    phoneNumber: response.phoneNumber,
                });
            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [reset, dispatch]);

    useEffect(() => {
        if (success) {
            fetchProfile();
        }
    }, [success]);

    return (
        <section className={styles.profile}>
            <Ads status={profile.hasSubscription}/>
            <section className={styles.profile__content}>
                <Person image={profile.imagePath} fullName={`${profile.name} ${profile.surname} ${profile.patronymic}`}
                        module={modal} setModal={setModal}/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.form}>
                        <h2 className={styles.form__title}>Личные Данные</h2>
                        <div className={styles.form__row}>
                            <div className={styles.form__field}>
                                <label htmlFor={'name'}
                                       className={errors.name ? `${styles.form__label} ${styles.error}` : styles.form__label}>Имя</label>
                                <input placeholder={'Иван'} id={'name'}
                                       className={styles.form__input} {...register('name')} />
                            </div>
                            <div className={styles.form__field}>
                                <label htmlFor={'surname'}
                                       className={errors.surname ? `${styles.form__label} ${styles.error}` : styles.form__label}>Фамилия</label>
                                <input placeholder={'Иванов'} id={'surname'}
                                       className={styles.form__input} {...register('surname')} />
                            </div>
                        </div>
                        <div className={styles.form__field}>
                            <label htmlFor={'patronymic'}
                                   className={errors.patronymic ? `${styles.form__label} ${styles.error}` : styles.form__label}>Отчество</label>
                            <input placeholder={'Иванович'} id={'patronymic'}
                                   className={styles.form__input} {...register('patronymic')} />
                        </div>
                    </div>
                    <div className={styles.form}>
                        <h2 className={styles.form__title}>Личные Данные</h2>
                        <div className={styles.form__row}>
                            <div className={styles.form__field}>
                                <label htmlFor={'email'}
                                       className={errors.email ? `${styles.form__label} ${styles.error}` : styles.form__label}>Почта</label>
                                <input style={{color: 'rgba(#000, .5)'}} readOnly={true} placeholder={'example@com.kg'}
                                       id={'email'} className={styles.form__input} {...register('email')} />
                            </div>
                            <div className={styles.form__field}>
                                <label htmlFor={'phoneNumber'}
                                       className={errors.phoneNumber ? `${styles.form__label} ${styles.error}` : styles.form__label}>Номер
                                    телефона</label>
                                <input placeholder={'+996 555 555 772'} id={'phoneNumber'}
                                       className={styles.form__input} {...register('phoneNumber')} />
                            </div>
                        </div>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: "5rem"}}>
                        <div className={'line'}></div>
                        <div style={{alignSelf: "end"}}>
                            <ButtonComponent text={'Изменить данные'} waiting={loading}/>
                        </div>
                    </div>
                </form>
            </section>

            <Modal open={modal} footer={null} centered={true} style={{margin: "0 auto"}}>
                <Alert setModalActive={setModal} change={modal}/>
            </Modal>
            <Modal open={success} footer={null} centered={true}>
                <Alert setModalActive={handleToggleSuccess} text={message} success={success}/>
            </Modal>
            <Modal open={error} footer={null} centered={true}>
                <Alert setModalActive={handleToggleError} error={error} text={message}/>
            </Modal>
        </section>
    );
};

export default Profile;