import {useEffect, useState} from "react";
import styles from "./profile.module.scss";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {validateProfile} from "@validations/profile.ts";
import {IProfile} from "@layout/Profile/interface.ts";
import {IEditProfile} from "@network/interfaces/profile/profile.ts";
import Ads from "@components/ads/UI/ads.tsx";
import ButtonComponent from "@components/button/UI/button.tsx";
import Modal from "@components/modal/UI/modal.tsx";
import Alert from "@components/alert/UI/alert.tsx";
import {getProfile, putProfile} from "@network/profile/profile.ts";
import Person from "@components/person/UI/person.tsx";
import {useAddDispatch, useAppSelector} from "@redux/hooks.ts";
import {setProfile} from "@redux/slices/profile.ts";

const Profile = () => {
    const form = useForm<IProfile>({resolver: yupResolver(validateProfile)});
    const {register, reset, formState: {errors}, handleSubmit} = form;
    const [modal, setModal] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const profile = useAppSelector(state => state.profile);
    const dispatch = useAddDispatch();

    const handlePutProfile = async (data: IEditProfile) => {
        console.log(data)
        try {
            const response = await putProfile(data);
            console.log(response);
            setSuccess(true);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = (data: IProfile) => {
        const profileData = {
            phoneNumber: data.phoneNumber,
            name: data.name,
            surname: data.surname,
            patronymic: data.patronymic
        };
        handlePutProfile(profileData);
        console.log(profileData);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                dispatch(setProfile(response));
                reset({
                    name: response.name,
                    surname: response.surname,
                    patronymic: response.patronymic,
                    email: response.email,
                    phoneNumber: response.phoneNumber,
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, [reset, dispatch]);

    return (
        <section className={styles.profile}>
            <Ads/>
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
                                       className={styles.form__input} {...register('name')}/>
                            </div>
                            <div className={styles.form__field}>
                                <label htmlFor={'surname'}
                                       className={errors.surname ? `${styles.form__label} ${styles.error}` : styles.form__label}>Фамилия</label>
                                <input placeholder={'Иванов'} id={'surname'}
                                       className={styles.form__input} {...register('surname')}/>
                            </div>
                        </div>
                        <div className={styles.form__field}>
                            <label htmlFor={'patronymic'}
                                   className={errors.patronymic ? `${styles.form__label} ${styles.error}` : styles.form__label}>Отчество</label>
                            <input placeholder={'Иванович'} id={'patronymic'}
                                   className={styles.form__input} {...register('patronymic')}/>
                        </div>
                    </div>
                    <div className={styles.form}>
                        <h2 className={styles.form__title}>Личные Данные</h2>
                        <div className={styles.form__row}>
                            <div className={styles.form__field}>
                                <label htmlFor={'email'}
                                       className={errors.email ? `${styles.form__label} ${styles.error}` : styles.form__label}>Почта</label>
                                <input placeholder={'example@com.kg'} id={'email'}
                                       className={styles.form__input} {...register('email')}/>
                            </div>
                            <div className={styles.form__field}>
                                <label htmlFor={'phoneNumber'}
                                       className={errors.phoneNumber ? `${styles.form__label} ${styles.error}` : styles.form__label}>Номер
                                    телефона</label>
                                <input placeholder={'+996 555 555 772'} id={'phoneNumber'}
                                       className={styles.form__input} {...register('phoneNumber')}/>
                            </div>
                        </div>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: "5rem"}}>
                        <div className={'line'}></div>
                        <div style={{alignSelf: "end"}}>
                            <ButtonComponent text={'Изменить данные'} onClick={() => undefined}/>
                        </div>
                    </div>
                </form>
            </section>
            <Modal active={modal} setModalActive={setModal} component={Alert}
                   componentProps={{change: true, setModalActive: setModal}}/>
            <Modal active={success} setModalActive={setModal} component={Alert}
                   componentProps={{success: success, setModalActive: setSuccess}}/>
        </section>
    );
};

export default Profile;