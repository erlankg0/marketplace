import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect, useState} from "react";
import {UploadFile} from "antd";

import UploadImage from "@components/uploadImage/UI/upload.tsx";
import SelectButton from "@components/button/UI/selectButton.tsx";
import ButtonComponent from "@components/button/UI/button.tsx";
import styles from "@layout/ads/UI/ads.module.scss";

import {validationServiceOrOrder} from "@validations/ads.ts";
import {useParams} from "react-router";
import {deleteOrderById, getByIdOrder, hideOrder} from "@network/order/order.ts";
import {IData} from "@network/interfaces/response/service.ts";
import {deleteService, getServiceById, hideService} from "@network/service/service.ts";
import {deleteEquipment, getEquipmentById, hideEquipment} from "@network/equipment/equipment.ts";
import {IDetailAds} from "@network/interfaces/profile/profile.ts";
import {useNavigate} from "react-router-dom";

const DetailOrder = () => {
    const [data, setData] = useState<IData>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const {register, formState: {errors}, handleSubmit, reset} = useForm<IDetailAds>({
        resolver: yupResolver(validationServiceOrOrder),
    });
    const {id, category} = useParams();
    const navigate = useNavigate();
    // images upload
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [selectedButton, setSelectedButton] = useState<'phone' | 'email'>('phone');
    const [selectedCategory, setSelectedCategory] = useState<'equipment' | 'order' | 'service'>('equipment');
    const LOCAL_STORAGE_KEY = `myOrderDetail`;

    const handleSelectCategory = (category: 'equipment' | 'order' | 'service') => {
        setSelectedCategory(category);
        localStorage.setItem(LOCAL_STORAGE_KEY, category);
    }

    useEffect(() => {
        const savedButton = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedButton) {
            setSelectedCategory(savedButton as 'equipment' | 'order' | 'service');
        }
    }, [LOCAL_STORAGE_KEY]);

    const handleGetItem = async () => {
        try {
            setLoading(true);
            setError(null);
            let response: IData;
            if (id) {
                switch (category) {
                    case 'ORDER':
                        response = await getByIdOrder(+id);
                        break;
                    case 'SERVICE':
                        response = await getServiceById(+id);
                        break;
                    case 'EQUIPMENT':
                        response = await getEquipmentById(+id);
                        break;
                    default:
                        throw new Error('Invalid URL');
                }
                setData(response);
                reset({
                    name: response.name,
                    description: response.description,
                    contactInfo: 'example@mail.com.org',
                    price: response.price,
                });
            } else {
                throw new Error('Error: Ошибка нету такого ID');
            }
            console.log(response);
        } catch (err) {
            console.error('Error fetching items:', err);
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteItem = async () => {
        try {
            if (id) {
                switch (category) {
                    case 'ORDER':
                        await deleteOrderById(+id);
                        break;
                    case 'SERVICE':
                        await deleteService(+id);
                        break;
                    case 'EQUIPMENT':
                        await deleteEquipment(+id);
                        break;
                    default:
                        throw new Error('Invalid URL');
                }
            } else {
                throw new Error('Error: Ошибка нету такого ID');
            }
        } catch (err) {
            console.error('Error fetching items:', err);
            setError('An error occurred while fetching data.');
        } finally {
            navigate(-1);
        }
    }

    const handleHideItem = async () => {
        try {
            if (id) {
                switch (category) {
                    case 'ORDER':
                        await hideOrder(+id);
                        break;
                    case 'SERVICE':
                        await hideService(+id);
                        break;
                    case 'EQUIPMENT':
                        await hideEquipment(+id);
                        break;
                    default:
                        throw new Error('Invalid URL');
                }
            } else {
                throw new Error('Error: Ошибка нету такого ID');
            }
        } catch (err) {
            console.error('Error fetching items:', err);
            setError('An error occurred while fetching data.');
        } finally {
            navigate(-1);
        }
    }

    useEffect(() => {
        handleGetItem();
        console.info(data);
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const onSubmit = async (data: IDetailAds) => {
        console.log(data);
    };

    return (
        <section className={'column'}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <p className={styles.form__title}>Тип объявления</p>
                <div className={'row'}>
                    <SelectButton
                        text="Оборудования"
                        action={selectedCategory === 'equipment'}
                        onClickAction={() => handleSelectCategory('equipment')}
                    />
                    <SelectButton
                        text="Заказ"
                        action={selectedCategory === 'order'}
                        onClickAction={() => handleSelectCategory('order')}
                    />
                    <SelectButton
                        text="Услуги"
                        action={selectedCategory === 'service'}
                        onClickAction={() => handleSelectCategory('service')}
                    />
                </div>

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
                            {selectedButton == 'phone' ? 'Номер телефона' : 'Почта'}
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
                    <div className={'row'}>
                        <ButtonComponent onClick={handleDeleteItem} type={'button'} color={'#FF3B30'} text={'Удалить'}/>
                        <ButtonComponent onClick={handleHideItem} type={'button'} color={'#FFD9A1'} text={'Скрыть'}/>
                        <ButtonComponent text={'Сохранить'}/>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default DetailOrder;