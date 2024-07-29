import UploadImage from "@components/uploadImage/UI/upload.tsx";
import ButtonComponent from "@components/button/UI/button.tsx";
import SelectButton from "@components/button/UI/selectButton.tsx";

import {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import styles from "@layout/ads/UI/ads.module.scss";
import {IService} from "@layout/service/service.ts";

import {validationServiceOrOrder} from "@validations/ads.ts";
import {postService} from "@network/service/service.ts";
import {UploadFile} from "antd";


const Service = () => {
    const form = useForm<IService>({resolver: yupResolver(validationServiceOrOrder)});
    const {register, formState: {errors}, handleSubmit} = form;
    // images upload
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile<File>[]>([]);

    const [selectedButton, setSelectedButton] = useState<'phone' | 'email'>('phone');

    const onSubmit = async (data: IService) => {
        const formData = new FormData();
        formData.append('service', JSON.stringify(data));
        fileList.forEach((file) => {
            formData.append('images', file.originFileObj as File)
        })
        try {
            const response = await postService(formData);
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <p className={styles.form__title}>Информация об оборудовании</p>
            <div className={styles.form__field}>
                <div className={errors.name ? `${styles.input__error} ${styles.form__input}` : styles.form__input}>
                    <label htmlFor="name" className={styles.label}>
                        Название <div
                        className={errors.name ? `${styles.label__star} ${styles.error}` : styles.error}>*</div>
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className={styles.input}
                        placeholder={"..."}
                    />
                </div>
                <p className={styles.form__info}>максимум 250 символов, минимум 5</p>
            </div>
            <div className={styles.form__field}>
                <div
                    className={errors.description ? `${styles.input__error} ${styles.form__input}` : styles.form__input}>
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
                <div className={errors.price ? `${styles.input__error} ${styles.form__input}` : styles.form__input}>
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
                    multiple={true}
                />
            </div>
            <p className={styles.form__title}>Контактная информация</p>
            <div className={styles.row}>
                <SelectButton
                    text="Номер телефона"
                    action={selectedButton == 'phone'}
                    onClickAction={() => setSelectedButton('phone')}
                />
                <SelectButton
                    text="Почта"
                    action={selectedButton == 'email'}
                    onClickAction={() => setSelectedButton('email')}
                />
            </div>
            <div className={styles.form__field}>
                <div
                    className={errors.contactInfo ? `${styles.input__error} ${styles.form__input}` : styles.form__input}>
                    <label htmlFor={selectedButton} className={styles.label}>
                        {selectedButton == 'phone' ? 'Номер телефеона' : 'Почта'}
                        <div
                            className={errors.contactInfo ? `${styles.label__star} ${styles.error}` : styles.error}>*
                        </div>
                    </label>
                    <input
                        type={selectedButton == 'phone' ? 'tel' : 'email'}
                        id={selectedButton}
                        {...register('contactInfo')}
                        className={styles.input}
                        placeholder={selectedButton == 'phone' ? '+996 ххх ххх ххх' : 'marketing@utopiaworld.com.tr'}
                    />
                </div>
            </div>
            <div className={'line'}></div>
            <div className={styles.form__button}>
                <ButtonComponent text={'Разместить Объявления'}/>
            </div>
        </form>
    );
};

export default Service