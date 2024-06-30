import styles from "./profile.module.scss";
import person from "@assets/icon/person.svg";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {validateProfile} from "@validations/profile.ts";
import {IProfile} from "@layout/Profile/interface.ts";

import Ads from "@components/ads/UI/ads.tsx";
import ButtonComponent from "@components/button/UI/button.tsx";
import Modal from "@components/modal/UI/modal.tsx";
import {useState} from "react";
import Alert from "@components/alert/UI/alert.tsx";

const Profile = () => {
    const form = useForm<IProfile>({resolver: yupResolver(validateProfile)});
    const {register, formState: {errors}, handleSubmit} = form;
    const [modal, setModal] = useState<boolean>(false)
    const onSubmit = (data: IProfile) => {
        console.log(data);
    }

    return (
        <section className={styles.profile}>
            <Ads/>
            <section className={styles.profile__content}>
                <div className={styles.profile__head}>
                    <div className={styles.profile__image}>
                        <img src={person} alt={'user image'}/>
                    </div>
                    <div className={styles.profile__detail}>
                        <p className={styles.profile__name}>Эрлан Абдраимов</p>
                        <p className={styles.profile__change} onClick={() => setModal(!modal)}>Изменить фото профиля</p>
                    </div>
                </div>
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
                        <ButtonComponent text={'Изменить данные'}/>
                    </div>
                </div>
            </section>
            <Modal active={modal} setModalActive={setModal} component={Alert}
                   componentProps={{change: true, setModalActive: setModal}}/>
        </section>
    )
}

export default Profile;