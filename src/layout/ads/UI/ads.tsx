import {useState} from "react";
import SelectButton from "@components/button/UI/selectButton.tsx";
import ButtonSing from "@components/button/UI/button.tsx";
import styles from "./ads.module.scss";
import {useForm} from "react-hook-form";
import {validationADS} from "@validations/ads.ts";
import {IADS} from "@layout/ads/interface.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import UploadImage from "@components/uploadImage/UI/upload.tsx";
import Date from "@components/date/UI/date.tsx";


const Ads = () => {
    const [selectedButton, setSelectedButton] = useState('equipment');
    const form = useForm<IADS>({resolver: yupResolver(validationADS)})
    const {register, formState: {errors, touchedFields}, handleSubmit} = form

    const handleButtonClick = (buttonType: string) => {
        setSelectedButton(buttonType);
    };

    const onSubmit = (data: IADS) => {
        console.log("form submit", data)
    }
    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h3 className={styles.form__title}>Тип объявления</h3>
                <div className={styles.form__category}>
                    {/*category ads*/}
                    <SelectButton
                        text="Оборудования"
                        action={selectedButton === 'equipment'}
                        onClickAction={() => handleButtonClick('equipment')}
                    />
                    <SelectButton
                        text="Заказ"
                        action={selectedButton === 'order'}
                        onClickAction={() => handleButtonClick('order')}
                    />
                    {/*category ads*/}
                </div>
                <p className={styles.form__title}>Информация об оборудовании</p>
                <div className={styles.form__field}>
                    <div className={styles.form__input}>
                        <label
                            htmlFor="title"
                            className={styles.label}
                        >Название <div
                            className={errors.title ? `${styles.label__star} ${styles.error}` : styles.error}>*</div>
                        </label>
                        <input
                            type="text"
                            id="title"
                            {...register('title')}
                            autoFocus={touchedFields.title}
                            className={styles.input}
                            placeholder={"..."}
                        />
                    </div>
                    <p className={styles.form__info}>максимум 250 символов, минимум 5</p>
                </div>
                <div className={styles.form__field}>
                    <div className={styles.form__input}>
                        <label
                            htmlFor="description"
                            className={styles.label}
                        >Описание <div
                            className={errors.title ? `${styles.label__star} ${styles.error}` : styles.error}>*</div>
                        </label>
                        <input
                            type={'text'}
                            id="description"
                            {...register('description')}
                            autoFocus={touchedFields.description}
                            className={styles.input}
                            placeholder={"..."}
                            maxLength={1001}
                        />
                    </div>
                    <p className={styles.form__info}>максимум 1000 символов, минимум 5</p>
                </div>
                <div className={styles.form__field}>
                    <div className={styles.form__input}>
                        <label
                            htmlFor="count"
                            className={styles.label}
                        >Количество <div
                            className={errors.title ? `${styles.label__star} ${styles.error}` : styles.error}>*</div>
                        </label>
                        <input
                            type="number"
                            id="count"
                            {...register('count')}
                            autoFocus={touchedFields.title}
                            className={styles.input}
                            placeholder={"1"}
                            minLength={1}
                        />
                    </div>
                </div>
                <div className={styles.form__field}>
                    <div className={styles.form__input}>
                        <label
                            htmlFor="price"
                            className={styles.label}
                        >Стоимость <div
                            className={errors.price ? `${styles.label__star} ${styles.error}` : styles.error}>*</div>
                        </label>
                        <input
                            type="number"
                            id="price"
                            {...register('price')}
                            autoFocus={touchedFields.price}
                            className={styles.input}
                            placeholder={"1000 сом"}
                        />
                    </div>
                </div>
                <div>
                    <Date/>
                </div>
                <p className={styles.form__title}>Галерея фотографий</p>
                <div className={styles.form__field}>
                    <UploadImage/>
                </div>
                <p className={styles.form__title}>Контактаця информация</p>
                <div className={styles.form__field}>
                    <div className={styles.form__input}>
                        <label
                            htmlFor="title"
                            className={styles.label}
                        >Название <div
                            className={errors.title ? `${styles.label__star} ${styles.error}` : styles.error}>*</div>
                        </label>
                        <input
                            type="text"
                            id="title"
                            {...register('phone')}
                            autoFocus={touchedFields.phone}
                            className={styles.input}
                            placeholder={"+996 xxx xxx xxx"}
                        />
                    </div>
                </div>
                <div className={'line'}></div>
                <div className={styles.form__button}>
                    <ButtonSing text={'Разместить Объявления'}/>
                </div>
            </form>

        </div>
    )
}

export default Ads