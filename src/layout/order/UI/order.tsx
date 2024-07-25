import UploadImage from "@components/uploadImage/UI/upload.tsx";
import ButtonComponent from "@components/button/UI/button.tsx";

import {useState} from "react";
import {Select, Tag, UploadFile} from "antd";
import {DownOutlined} from '@ant-design/icons';

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import styles from "@layout/ads/UI/ads.module.scss";
import {validationOrder} from "@validations/ads.ts";
import {IOrder, ISize} from "@layout/ads/interface.ts";
import {CustomTagProps} from 'rc-select/lib/BaseSelect';
import DateSelect from "@components/date/UI/date.tsx";
import SelectButton from "@components/button/UI/selectButton.tsx";
import Alert from "@components/alert/UI/alert.tsx";
import Modal from "@components/modal/UI/modal.tsx";
import {postOrder} from "@network/order/order.ts";

const MAX_COUNT = 10;


const Order = () => {
    const [selectedButton, setSelectedButton] = useState<'phone' | 'email'>('phone');

    const form = useForm<IOrder>({
        resolver: yupResolver(validationOrder),
    });
    const {register, formState: {errors, touchedFields}, handleSubmit} = form
    const [date, setDate] = useState("");
    const [error, setError] = useState<boolean>(false)

    // images upload
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    // Select Values
    const [selectSize, setSelectSize] = useState<string[]>([]);
    const [item, setItem] = useState<ISize[]>([])
    const [selectCategory, setSelectCategory] = useState<'Цифры' | 'Буквы'>('Цифры')
    const sizes = {
        'Цифры': [
            {value: '36', label: '36'},
            {value: '37', label: '37'},
            {value: '38', label: '38'},
            {value: '39', label: '39'},
            {value: '40', label: '40'},
            {value: '42', label: '42'},
            {value: '44', label: '44'},

        ],
        'Буквы': [
            {value: 'S', label: 'S'},
            {value: 'L', label: 'L'},
            {value: 'XL', label: 'XL'},
            {value: 'M', label: 'M'},
        ]
    }
    const handleChangeSize = (values: string[]) => {
        setSelectSize(values);
        console.log(values.map((item) => (item)))
        const items: ISize[] = values.map((item): ISize => {
            return {size: item, quantity: 1}
        })
        setItem(items)
    };
    const handleChangeCategory = (value: 'Цифры' | 'Буквы') => {
        setSelectCategory(value);
    }

    const tagRender = (props: CustomTagProps) => {
        const {label, value} = props;
        const isLast = selectSize[selectSize.length - 1] === value;
        return isLast ? (
            <p>{label}</p>
        ) : <p></p>;
    };

    const suffix = (
        <>
      <span>
        {selectSize.length} / {MAX_COUNT}
      </span>
            <DownOutlined/>
        </>
    );

    const handleToggle = () => {
        setError(!error);
    }

    const handleTagClose = (tag: string, quantity?: number) => {
        const updatedSelect = selectSize.filter(item => item !== tag);
        setSelectSize(updatedSelect);
        const updatedSize: ISize[] = item.filter((item) => {
            if (item.size == tag) {
                return {item: item.size, quantity: quantity}
            }
            return {item: item.size, quantity: 1}
        })
        setItem(updatedSize)
    };


    const onSubmit = (data: IOrder) => {
        console.log("form submit", data, item, fileList)
        const contactInfo: string = data.email ? data.email : data.phone ? data.phone : '';
        // const photos = fileList.map((image) => image.thumbUrl);
        const orderData = {
            name: data.title,
            description: data.description,
            photos: fileList.map((image) => image.thumbUrl),
            contactInfo: contactInfo,
            price: data.price,
            items: [
                ...item
            ]

        }
        console.log(orderData)
        console.log(date)
        const formData = new FormData();
        formData.append("name", data.title);
        formData.append("description", data.description.trim());
        formData.append('contactInfo', contactInfo);
        formData.append('price', `${data.price}`)
        // formData.append("photos", photos.join(','));
        formData.append('items', item.join(','))
        formData.append('dateOfExecution', date)
        postOrder(formData);
        console.log(formData)
    }


    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <p className={styles.form__title}>Информация об оборудовании</p>
            <div className={styles.form__field}>
                <div className={errors.title ? `${styles.input__error} ${styles.form__input}` : styles.form__input}>
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
                <div
                    className={errors.description ? `${styles.input__error} ${styles.form__input}` : styles.form__input}>
                    <label
                        htmlFor="description"
                        className={styles.label}
                    >Описание <div
                        className={errors.description ? `${styles.label__star} ${styles.error}` : styles.error}>*</div>
                    </label>
                    <textarea
                        id="description"
                        {...register('description')}
                        autoFocus={touchedFields.description}
                        className={styles.textarea}
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
                        maxCount={1}
                        value={selectCategory}
                        onChange={handleChangeCategory}
                        placeholder={'Выберите размер'}
                        options={[
                            {value: 'Цифры', label: 'Цифры'},
                            {value: 'Буквы', label: 'Буквы'},
                        ]}
                    />
                </div>
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
                        value={selectSize}
                        onChange={handleChangeSize}
                        suffixIcon={suffix}
                        placeholder={'Выберите размер'}
                        options={sizes[selectCategory]}
                    />
                </div>
            </div>
            <div>
                <div>
                    {item.map((tag) => (
                        <Tag
                            key={tag.size} // Теперь в качестве ключа используется само значение тега
                            closable={true}
                            onClose={() => handleTagClose(tag.size)} // Обработчик закрытия Tag
                            className={styles.tag}
                        >
                            {(
                                <div className={styles.tag__row}>
                                    {tag.size}
                                    <input className={styles.tag__input} type={'number'} value={tag.quantity}/>
                                </div>)}
                        </Tag>
                    ))}
                </div>

            </div>

            <div className={styles.form__field}>
                <div className={errors.price ? `${styles.input__error} ${styles.form__input}` : styles.form__input}>
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
                    multiple={true}
                />
            </div>
            <p className={styles.form__title}>Контактаця информация</p>
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
                    className={errors[selectedButton] ? `${styles.input__error} ${styles.form__input}` : styles.form__input}>
                    <label htmlFor={selectedButton} className={styles.label}>
                        {selectedButton == 'phone' ? 'Номер телефеона' : 'Почта'}
                        <div
                            className={errors[selectedButton] ? `${styles.label__star} ${styles.error}` : styles.error}>*
                        </div>
                    </label>
                    <input
                        type={selectedButton == 'phone' ? 'tel' : 'email'}
                        id={selectedButton}
                        {...register(selectedButton)}
                        className={styles.input}
                        placeholder={selectedButton == 'phone' ? '+996 ххх ххх ххх' : 'marketing@utopiaworld.com.tr'}
                    />
                </div>
            </div>
            <div className={'line'}></div>
            <div className={styles.form__button}>
                <ButtonComponent text={'Разместить Объявления'}/>
            </div>
            <Modal
                active={error}
                setModalActive={handleToggle}
                component={Alert} // Передача компонента модального окна для подтверждения выхода
                componentProps={{forgot: true, setModalActive: handleToggle,}}
            />
        </form>
    )
}

export default Order;