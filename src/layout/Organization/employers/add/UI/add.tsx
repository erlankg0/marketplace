import styles from "@layout/Organization/styles/styles.module.scss";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {validationEmployers} from "@validations/employers.ts";
import {IEmployer} from "@interfaces/employers.ts";
import {Flex, Select} from "antd";
import ButtonComponent from "@components/button/UI/button.tsx";

const Add = () => {
    const form = useForm<IEmployer>({
        resolver: yupResolver(validationEmployers)
    })
    const {register, handleSubmit, formState: {errors}} = form;
    const onSubmit = (data: IEmployer) => {
        console.log(data);
    }


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
                                    <span
                                        className={errors.firstName ? styles.field__error : ''}>*
                                     </span>
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
                                    <span
                                        className={errors.firstName ? styles.field__error : ''}>*
                                     </span>
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
                                <Select
                                    maxCount={1}
                                    placeholder={'Должность сотрудника'}
                                    options={[
                                        {value: '1', label: 'Швея'},
                                        {value: '2', label: 'Закройщик'},
                                        {value: '3', label: 'Утюжник'},
                                        {value: '4', label: 'Технолог'},
                                    ]}
                                    {...register('appointment')}
                                    id={'appointment'}
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
    )
}

export default Add