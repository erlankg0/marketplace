import UploadImage from "@components/uploadImage/UI/upload.tsx";
import ButtonComponent from "@components/button/UI/button.tsx";

import {useState} from "react";
import {UploadFile} from "antd";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import styles from "@layout/ads/UI/ads.module.scss";
import {validationADS} from "@validations/ads.ts";
import {IADS} from "@layout/ads/interface.ts";
import Modal from "@components/modal/UI/modal.tsx";
import Alert from "@components/alert/UI/alert.tsx";

const Equipment = () => {
    const form = useForm<IADS>({resolver: yupResolver(validationADS)});
    const {register, formState: {errors}, handleSubmit} = form;

    // images upload
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);


    const [error, setError] = useState<boolean>(false)
    const handleToggle = () => {
        setError(!error);
    }
    const onSubmit = (data: IADS) => {
        if (Object.keys(errors).length > 0) {
            setError(true);
            return;
        }
        setError(false)
        console.log("form submit", data);
        console.log(fileList)
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <p className={styles.form__title}>Информация об оборудовании</p>
            <div className={styles.form__field}>
                <div className={styles.form__input}>
                    <label htmlFor="title" className={styles.label}>
                        Название <div
                        className={errors.title ? `${styles.label__star} ${styles.error}` : styles.error}>*</div>
                    </label>
                    <input
                        type="text"
                        id="title"
                        {...register('title')}
                        className={styles.input}
                        placeholder={"..."}
                    />
                </div>
                <p className={styles.form__info}>максимум 250 символов, минимум 5</p>
            </div>
            <div className={styles.form__field}>
                <div className={styles.form__input}>
                    <label htmlFor="description" className={styles.label}>
                        Описание <div
                        className={errors.description ? `${styles.label__star} ${styles.error}` : styles.error}>*</div>
                    </label>
                    <textarea
                        id="description"
                        {...register('description')}
                        className={styles.textarea}
                        placeholder={"..."}
                        maxLength={1001}
                    />
                </div>
                <p className={styles.form__info}>максимум 1000 символов, минимум 5</p>
            </div>
            <div className={styles.form__field}>
                <div className={styles.form__input}>
                    <label htmlFor="count" className={styles.label}>
                        Количество <div
                        className={errors.count ? `${styles.label__star} ${styles.error}` : styles.error}>*</div>
                    </label>
                    <input
                        type="number"
                        id="count"
                        {...register('count')}
                        className={styles.input}
                        placeholder={"1"}
                        minLength={1}
                    />
                </div>
            </div>
            <div className={styles.form__field}>
                <div className={styles.form__input}>
                    <label htmlFor="price" className={styles.label}>
                        Стоимость <div
                        className={errors.price ? `${styles.label__star} ${styles.error}` : styles.error}>*</div>
                    </label>
                    <input
                        type="number"
                        id="price"
                        {...register('price')}
                        className={styles.input}
                        placeholder={"1000 сом"}
                    />
                </div>
            </div>
            <p className={styles.form__title}>Галерея фотографий</p>
            <div className={styles.form__field}>
                <UploadImage
                    previewOpen={previewOpen}
                    setPreviewOpen={setPreviewOpen}
                    setPreviewImage={setPreviewImage}
                    previewImage={previewImage}
                    fileList={fileList}
                    setFileList={setFileList}
                />
            </div>
            <p className={styles.form__title}>Контактная информация</p>
            <div className={styles.form__field}>
                <div className={styles.form__input}>
                    <label htmlFor="phone" className={styles.label}>
                        Телефон <div
                        className={errors.phone ? `${styles.label__star} ${styles.error}` : styles.error}>*</div>
                    </label>
                    <input
                        type="text"
                        id="phone"
                        {...register('phone')}
                        className={styles.input}
                        placeholder={"+996 xxx xxx xxx"}
                    />
                </div>
            </div>
            <div className={'line'}></div>
            <div className={styles.form__button}>
                <ButtonComponent onClick={handleToggle} text={'Разместить Объявления'}/>
            </div>
            <Modal
                active={error}
                setModalActive={handleToggle}
                component={Alert} // Передача компонента модального окна для подтверждения выхода
                componentProps={{forgot: true, setModalActive: handleToggle,}}
            />

        </form>
    );
};

export default Equipment;