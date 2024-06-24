import UploadImage from "@components/uploadImage/UI/upload.tsx";
import ButtonComponent from "@components/button/UI/button.tsx";

import {useState} from "react";
import {Select, UploadFile, Tag} from "antd";
import {DownOutlined} from '@ant-design/icons';

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import styles from "@layout/ads/UI/ads.module.scss";
import {validationADS} from "@validations/ads.ts";
import {IADS} from "@layout/ads/interface.ts";
import {CustomTagProps} from 'rc-select/lib/BaseSelect';
import DateSelect from "@components/date/UI/date.tsx";

const MAX_COUNT = 3;

const Order = () => {
    const form = useForm<IADS>({resolver: yupResolver(validationADS)})
    const {register, formState: {errors, touchedFields}, handleSubmit} = form
    const [date, setDate] = useState("");

    // images upload
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    // Select Values
    const [select, setSelect] = useState<string[]>([]);

    const handleChange = (values: string[]) => {
        setSelect(values);
    };

    const tagRender = (props: CustomTagProps) => {
        const { label, value } = props;
        const isLast = select[select.length - 1] === value;
        return isLast ? (
            <p>{label}</p>
        ) : <p></p>;
    };

    const suffix = (
        <>
      <span>
        {select.length} / {MAX_COUNT}
      </span>
            <DownOutlined/>
        </>
    );

    const handleTagClose = (tag: string) => {
        const updatedSelect = select.filter(item => item !== tag);
        setSelect(updatedSelect);
    };


    const onSubmit = (data: IADS) => {
        console.log("form submit", data)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                        htmlFor="size"
                        className={styles.label}
                    >Размер <div
                        className={errors.title ? `${styles.label__star} ${styles.error}` : styles.error}>*</div>
                    </label>
                    <Select
                        id={'size'}
                        mode={'multiple'}
                        tagRender={tagRender}
                        maxCount={MAX_COUNT}
                        value={select}
                        onChange={handleChange}
                        suffixIcon={suffix}
                        placeholder={'Выберите размер'}
                        options={[
                            {value: 'S', label: 'S'},
                            {value: 'L', label: 'L'},
                            {value: 'XL', label: 'XL'},
                            {value: 'M', label: 'M'},
                        ]}
                    />
                </div>
            </div>
            <div>
                <div>
                    {select.map((tag) => (
                        <Tag
                            key={tag} // Теперь в качестве ключа используется само значение тега
                            closable={true}
                            onClose={() => handleTagClose(tag)} // Обработчик закрытия Tag
                            className={styles.tag}
                        >
                            {tag}
                        </Tag>
                    ))}
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
                <DateSelect setDate={setDate} date={date}/>
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
                <ButtonComponent text={'Разместить Объявления'}/>
            </div>
        </form>
    )
}

export default Order;