import styles from "./profile.module.scss";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {validateProfile} from "@validations/profile.ts";
import {IProfile} from "@layout/Profile/interface.ts";

import Ads from "@components/ads/UI/ads.tsx";
import ButtonComponent from "@components/button/UI/button.tsx";
import Modal from "@components/modal/UI/modal.tsx";
import {useEffect, useState} from "react";
import Alert from "@components/alert/UI/alert.tsx";
import {getProfile} from "@network/profile/profile.ts";
import Person from "@components/person/UI/person.tsx";

const Profile = () => {
    const form = useForm<IProfile>({resolver: yupResolver(validateProfile)});
    const {register, formState: {errors}, handleSubmit} = form;
    const [modal, setModal] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const onSubmit = (data: IProfile) => {
        console.log(data);
    }
    useEffect(() => {
        getProfile().then((res) => console.log(res)).catch((er) => console.log(er))
    }, [])
    return (
        <section className={styles.profile}>
            <Ads/>
            <section className={styles.profile__content}>
                <Person fullName={'Эрлан Абдраимов'} module={modal} setModal={setModal}/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.form}>
                        <h2 className={styles.form__title}>Личные Данные</h2>
                        <div className={styles.form__row}>
                            <div className={styles.form__field}>
                                <label htmlFor={'name'}
                                       className={errors.name ? `${styles.form__label} ${styles.error}` : styles.form__label}>Имя</label>
                                <input placeholder={'Иван'} id={'name'}
                                       className={styles.form__input} {...register('name')}/>
                            </div>
                            <div className={styles.form__field}>
                                <label htmlFor={'lastname'}
                                       className={errors.name ? `${styles.form__label} ${styles.error}` : styles.form__label}>Фамилия</label>
                                <input placeholder={'Иванов'} id={'lastname'}
                                       className={styles.form__input} {...register('name')}/>
                            </div>
                        </div>
                        <div className={styles.form__field}>
                            <label htmlFor={'middleName'}
                                   className={errors.name ? `${styles.form__label} ${styles.error}` : styles.form__label}>Отчество</label>
                            <input placeholder={'Иванович'} id={'middleName'}
                                   className={styles.form__input} {...register('middleName')}/>
                        </div>

                    </div>
                    <div className={styles.form}>
                        <h2 className={styles.form__title}>Личные Данные</h2>
                        <div className={styles.form__row}>
                            <div className={styles.form__field}>
                                <label htmlFor={'email'}
                                       className={errors.name ? `${styles.form__label} ${styles.error}` : styles.form__label}>Почта</label>
                                <input placeholder={'example@com.kg'} id={'email'}
                                       className={styles.form__input} {...register('name')}/>
                            </div>
                            <div className={styles.form__field}>
                                <label htmlFor={'phone'}
                                       className={errors.name ? `${styles.form__label} ${styles.error}` : styles.form__label}>Номер
                                    телефона</label>
                                <input placeholder={'+996 555 555 772'} id={'phone'}
                                       className={styles.form__input} {...register('name')}/>
                            </div>
                        </div>
                    </div>
                </form>
                <div style={{display: "flex", flexDirection: "column", gap: "5rem"}}>
                    <div className={'line'}></div>
                    <div style={{alignSelf: "end"}}>
                        <ButtonComponent text={'Изменить данные'} onClick={() => setSuccess(!success)}/>
                    </div>
                </div>
            </section>
            <Modal active={modal} setModalActive={setModal} component={Alert}
                   componentProps={{change: true, setModalActive: setModal}}/>
            <Modal active={success} setModalActive={setModal} component={Alert}
                   componentProps={{success: success, setModalActive: setSuccess}}/>
        </section>
    )
}

export default Profile;