import {useState} from "react";
import {Tag, Select, UploadFile} from "antd";
import {DownOutlined} from '@ant-design/icons';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import styles from "@layout/ads/UI/ads.module.scss";
import {validationServiceOrOrder} from "@validations/ads.ts";
import {IOrder, ISize} from "@network/interfaces/order/order.ts";
import {CustomTagProps} from 'rc-select/lib/BaseSelect';
import DateSelect from "@components/date/UI/date.tsx";
import SelectButton from "@components/button/UI/selectButton.tsx";
import Alert from "@components/alert/UI/alert.tsx";
import UploadImage from "@components/uploadImage/UI/upload.tsx";
import ButtonComponent from "@components/button/UI/button.tsx";
import {postOrder} from "@network/order/order.ts";
import {Modal} from "antd";

const MAX_COUNT = 10;

const Order = () => {
    const [selectedButton, setSelectedButton] = useState<'phone' | 'email'>('phone');

    const form = useForm<IOrder>({
        resolver: yupResolver(validationServiceOrOrder),
    });
    const {register, formState: {errors, touchedFields}, handleSubmit} = form;
    const [date, setDate] = useState("");
    // const [error, setError] = useState<boolean>(false);

    const [success, setSuccess] = useState<boolean>(false); // Состояние нового модального окна для подтверждения выхода

    const handleToggleModal = () => {
        setSuccess(!success);
    }
    // Images upload
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    // Select Values
    const [selectSize, setSelectSize] = useState<string[]>([]);
    const [item, setItem] = useState<ISize[]>([]);

    const sizes =
        [
            {value: 'S', label: 'S'},
            {value: 'L', label: 'L'},
            {value: 'XL', label: 'XL'},
            {value: 'M', label: 'M'},
        ]


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


    const handleTagClose = (tag: string) => {
        const updatedSelect = selectSize.filter(item => item !== tag);
        setSelectSize(updatedSelect);
        const updatedSize: ISize[] = item.filter(item => item.size !== tag);
        setItem(updatedSize);
    };

    const handleQuantityChange = (size: string, quantity: number) => {
        const updatedItems = item.map((item) =>
            item.size === size ? {...item, quantity} : item
        );
        setItem(updatedItems);
    };
    const handleChangeSize = (values: string[]) => {
        // Преобразуем текущий массив `item` в объект для быстрого поиска
        const itemMap = new Map(item.map(i => [i.size, i]));

        // Обновляем массив `item` с новыми размерами и их количеством
        const updatedItems: ISize[] = values.map(size => {
            // Найти существующий элемент или создать новый
            const existingItem = itemMap.get(size);
            return existingItem ? existingItem : {size, quantity: 1};
        });

        // Обновляем состояние `selectSize` и `item`
        setSelectSize(values);
        setItem(updatedItems);
    };

    const onSubmit = (data: IOrder) => {

        try {
            const payload = {
                ...data,
                dateOfExecution: date,
                items: [...item]
            }
            const formData = new FormData();

            formData.append('order', JSON.stringify(payload));
            fileList.forEach((file) => {
                formData.append('images', file.originFileObj as File)
            })
            postOrder(formData);
            handleToggleModal()

        } catch (error) {
            handleToggleModal()
        }
    };

    return (
        <section className={'column'}>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <p className={styles.form__title}>Информация об оборудовании</p>
                <div className={styles.form__field}>
                    <div className={errors.name ? `${styles.input__error} ${styles.form__input}` : styles.form__input}>
                        <label
                            htmlFor="name"
                            className={styles.label}
                        >Название <div
                            className={errors.name ? `${styles.label__star} ${styles.error}` : styles.error}>*</div>
                        </label>
                        <input
                            type="text"
                            id="title"
                            {...register('name')}
                            autoFocus={touchedFields.name}
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
                            className={errors.name ? `${styles.label__star} ${styles.error}` : styles.error}>*</div>
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
                            options={sizes}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        {item.map((tag) => (
                            <Tag
                                key={tag.size}
                                closable={true}
                                onClose={() => handleTagClose(tag.size)}
                                className={styles.tag}
                            >
                                <div className={styles.tag__row}>
                                    {tag.size}
                                    <input
                                        className={styles.tag__input}
                                        type={'number'}
                                        value={tag.quantity}
                                        onChange={(e) => handleQuantityChange(tag.size, parseInt(e.target.value))}
                                    />
                                </div>
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
                        action={selectedButton === 'phone'}
                        onClickAction={() => setSelectedButton('phone')}
                    />
                    <SelectButton
                        text="Почта"
                        action={selectedButton === 'email'}
                        onClickAction={() => setSelectedButton('email')}
                    />
                </div>
                <div className={styles.form__field}>
                    <div
                        className={errors.contactInfo ? `${styles.input__error} ${styles.form__input}` : styles.form__input}>
                        <label htmlFor={selectedButton} className={styles.label}>
                            {selectedButton === 'phone' ? 'Номер телефеона' : 'Почта'}
                            <div
                                className={errors.contactInfo ? `${styles.label__star} ${styles.error}` : styles.error}>*
                            </div>
                        </label>
                        <input
                            type={selectedButton === 'phone' ? 'tel' : 'email'}
                            id={selectedButton}
                            {...register('contactInfo')}
                            className={styles.input}
                            placeholder={selectedButton === 'phone' ? '+996 ххх ххх ххх' : 'marketing@utopiaworld.com.tr'}
                        />
                    </div>
                </div>
                <div className={'line'}></div>
                <div className={styles.form__button}>
                    <ButtonComponent text={'Разместить Объявления'}/>
                </div>
            </form>
            <Modal open={success} footer={null} centered={true}
                   bodyStyle={{
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                       maxWidth: '30rem',
                       margin: '0 auto'
                   }}>
                <Alert setModalActive={handleToggleModal} success={success}/>
            </Modal>
        </section>
    );
};

export default Order;