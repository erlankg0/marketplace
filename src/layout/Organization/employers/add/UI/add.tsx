import styles from "@layout/Organization/styles/styles.module.scss";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm, Controller} from "react-hook-form";
import {validationEmployers} from "@validations/employers.ts";
import {IEmployer} from "@interfaces/employers.ts";
import {Flex, Select} from "antd";
import ButtonComponent from "@components/button/UI/button.tsx";
import {sendInvitation} from "@network/organization/admin.ts";

const Add = () => {
    const form = useForm<IEmployer>({
        resolver: yupResolver(validationEmployers)
    });
    const {register, handleSubmit, control, formState: {errors}} = form;

    const onSubmit = (data: IEmployer) => {
        console.log(data);
        const formData = new FormData();
        const body = {
            surname: data.lastName,
            name: data.firstName,
            patronymic: data.patronymicName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            position: "Администратор"
        }
        formData.append('employee', JSON.stringify(body));
        sendInvitation(formData);
    };

    return (
        <section>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form__content}>
                    <div className={styles.form__content}>
                        <h2 className={styles.form__title}>Прилашения сотрудника</h2>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label htmlFor={'firstName'} className={styles.field__label}>
                                    Имя
                                    <span className={errors.firstName ? styles.field__error : ''}>*</span>
                                </label>
                                <input
                                    {...register('firstName')}
                                    id={'firstName'}
                                    className={styles.field__input}
                                    placeholder={'Имя сотрудника'}
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor={'lastName'} className={styles.field__label}>
                                    Фамилия
                                    <span className={errors.lastName ? styles.field__error : ''}>*</span>
                                </label>
                                <input
                                    {...register('lastName')}
                                    id={'lastName'}
                                    className={styles.field__input}
                                    placeholder={'Фамилия сотрудника'}
                                />
                            </div>
                        </div>
                        <div className={styles.field}>
                            <label htmlFor={'patronymicName'} className={styles.field__label}>Отчество
                                <span className={errors.patronymicName ? styles.field__error : ''}>*</span>
                            </label>
                            <input
                                {...register('patronymicName')}
                                id={'patronymicName'}
                                className={styles.field__input}
                                placeholder={'Отчество сотрудника'}
                            />
                        </div>
                    </div>
                    <div className={styles.form__content}>
                        <h2 className={styles.form__title}>Контактные данные</h2>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label htmlFor={'email'} className={styles.field__label}>Почта
                                    <span className={errors.email ? styles.field__error : ''}>*</span>
                                </label>
                                <input
                                    {...register('email')}
                                    id={'email'}
                                    className={styles.field__input}
                                    placeholder={'Почта сотрудника'}
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor={'phoneNumber'} className={styles.field__label}>Номер телефона
                                    <span className={errors.phoneNumber ? styles.field__error : ''}>*</span>
                                </label>
                                <input
                                    {...register('phoneNumber')}
                                    id={'phoneNumber'}
                                    className={styles.field__input}
                                    placeholder={'Номер телефона сотрудника'}
                                />
                            </div>

                        </div>
                    </div>

                    <div className={styles.form__content}>
                        <h2 className={styles.form__title}>Должность</h2>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label htmlFor={'appointment'} className={styles.field__label}>Должность
                                    <span className={errors.appointment ? styles.field__error : ''}>*</span>
                                </label>
                                <Controller
                                    name="appointment"
                                    control={control}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            options={[
                                                {value: '1', label: 'Швея'},
                                                {value: '2', label: 'Закройщик'},
                                                {value: '3', label: 'Утюжник'},
                                                {value: '4', label: 'Технолог'},
                                            ]}
                                            placeholder={'Должность сотрудника'}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Flex gap={'2rem'} vertical={true}>
                    <div className={'line'}></div>
                    <div style={{alignSelf: 'end'}}>
                        <ButtonComponent text={'Добавить сотрудника'}/>
                    </div>
                </Flex>
            </form>
        </section>
    );
};

export default Add;