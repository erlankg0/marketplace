import React, {useEffect, useState} from "react";
import {Modal} from "antd";
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode, Navigation, Pagination, Thumbs} from 'swiper/modules';
import SwiperCore from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import {Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';

import Alert from "@components/alert/UI/alert";
import Seller from "@components/seller/UI/seller";
import {ICardModal} from "@components/cardModal/interface";
import {ISize} from "@layout/ads/interface";
import {getByIdOrder, requestToExecuteOrderById} from "@network/order/order";
import {getServiceById} from "@network/service/service";
import {getEquipmentById, buyEquipment} from "@network/equipment/equipment";
import {formatDate} from "@utils/formDate";
import styles from "./cardModal.module.scss";

SwiperCore.use([Navigation, Pagination, Thumbs, FreeMode]);

interface DetailItem {
    id: number;
    images: string[];
    date?: Date;
    name: string;
    description: string;
    price: number;
    contactInfo: string;
    authorName: string;
    authorImage: string;
    orderItems?: ISize[];
    quantity?: number;
}

const CardModal: React.FC<ICardModal> = ({setModal, id, category}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [item, setItem] = useState<DetailItem | undefined>(undefined);
    const [buy, setBuy] = useState<boolean>(false);

    const handleBuy = async () => {
        setBuy(true);
        setModal(false);

        try {
            switch (category) {
                case 'order':
                    await requestToExecuteOrderById(id);
                    setBuy(true)
                    break;
                case 'equipment':
                    await buyEquipment(id)
                    setBuy(true)

                    break;
                default:
                    setBuy(false)
                    break;
            }

        } catch (err) {
            console.error('Error purchasing equipment:', err);
            setError('An error occurred while processing the purchase.');
        } finally {
            setBuy(false);
        }
    };

    const handleCloseModal = () => {
        setBuy(false);
    };

    const handleGetData = async () => {
        try {
            setLoading(true);
            setError(null);
            let response;

            switch (category) {
                case 'order':
                    response = await getByIdOrder(id);
                    setItem({
                        id: response.id,
                        images: response.orderImages,
                        name: response.name,
                        description: response.description,
                        price: response.price,
                        contactInfo: response.contactInfo,
                        date: response.dateOfExecution,
                        authorImage: response.authorImage,
                        authorName: response.authorFullName,
                        orderItems: response.orderItems,
                    });
                    break;
                case 'services':
                    response = await getServiceById(id);
                    setItem({
                        id: response.id,
                        images: response.serviceImages,
                        name: response.name,
                        description: response.description,
                        price: response.price,
                        contactInfo: response.contactInfo,
                        authorImage: response.authorImagePath,
                        authorName: `${response.authorName} ${response.authorSurname} ${response.patronymic}`,
                    });
                    break;
                case 'equipment':
                    response = await getEquipmentById(id);
                    setItem({
                        id: response.id,
                        images: response.equipmentImages,
                        name: response.name,
                        description: response.description,
                        price: response.price,
                        contactInfo: response.contactInfo,
                        date: response.dateOfExecution,
                        orderItems: response.orderItems,
                        authorImage: response.authorImage,
                        authorName: response.fullName,
                    });
                    break;
                default:
                    throw new Error('Invalid category');
            }
        } catch (err) {
            console.error('Error fetching items:', err);
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetData();
    }, [id, category]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const slides: string[] | undefined = item?.images;

    return (
        <section className={styles.card}>
            <div className={styles.card__gallery}>
                <div className={styles.card__slide}>
                    <Swiper
                        loop={true}
                        thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                        modules={[Navigation, Pagination, Thumbs, FreeMode]}
                        className="main-swiper"
                    >
                        {slides && slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <img className={`${styles.card__slide} ${styles.card__image}`} src={slide}
                                     alt={`Slide ${index}`}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className={styles.card__slides}>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[Thumbs, FreeMode]}
                            className="thumbs-swiper"
                        >
                            {slides && slides.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <img className={styles.card__slider} src={slide} alt={`Thumb ${index}`}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
            <div className={styles.card__content}>
                <div className={styles.card__header}>
                    <p className={styles.card__bread}>Маркетплейс/Инвентарь</p>
                    <div className={styles.row}>
                        <h3 className={styles.card__title}>{item?.name}</h3>
                        {item?.date && <p className={styles.time}> Срок: {formatDate(item.date)}</p>}
                    </div>
                    <p className={styles.card__price}>{`${item?.price || ''} сом`}</p>
                </div>
                <div className={styles.card__text}>
                    <div className={'line'}></div>
                    <div>
                        <Seller fullName={item?.authorName || ''} image={item?.authorImage || ''}/>
                    </div>
                    <div className={styles.content}>
                        <Tabs position='relative' variant='unstyled'>
                            <TabList>
                                <Tab>
                                    <div className={styles.content__tag}>
                                        Описание
                                    </div>
                                </Tab>
                                <Tab>
                                    <div className={styles.content__tag}>
                                        Контакты Авторов
                                    </div>
                                </Tab>
                                {item?.orderItems && (
                                    <Tab>
                                        <div className={styles.content__tag}>
                                            Размеры
                                        </div>
                                    </Tab>
                                )}
                            </TabList>
                            <TabIndicator mt='-1rem' width="fit-content" height='1px' bg='#000000' borderRadius='1px'/>
                            <TabPanels>
                                <TabPanel>
                                    <div className={styles.content}>
                                        <p className={styles.content__text}>
                                            {item?.description}
                                        </p>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className={styles.content}>
                                        {item?.contactInfo.includes('@') ? (
                                            <a href={`mailto:${item.contactInfo}`} className={styles.content__text}>
                                                Э-почта: {item.contactInfo}
                                            </a>
                                        ) : (
                                            <a href={`tel:${item?.contactInfo}`} className={styles.content__text}>
                                                Телефон: {item?.contactInfo}
                                            </a>
                                        )}
                                    </div>
                                </TabPanel>
                                {item?.orderItems && (
                                    <TabPanel>
                                        <div className={styles.content}>
                                            <ul className={'column'}>
                                                {item?.orderItems.map((orderItem, index) => (
                                                    <li className={'row'} key={index}>
                                                        <div>
                                                            <p className={styles.content__text}>{index + 1}</p>
                                                        </div>
                                                        <div className={'row'}>
                                                            <p className={styles.content__text}>
                                                                Size: {orderItem.size}
                                                            </p>
                                                            <p className={styles.content__text}>
                                                                Quantity: {orderItem.quantity}
                                                            </p>
                                                        </div>

                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </TabPanel>
                                )}
                            </TabPanels>
                        </Tabs>
                        {item?.quantity && (
                            <p className={styles.content__count}>В наличии: <strong>{item.quantity}</strong></p>
                        )}
                    </div>
                    <button
                        onClick={handleBuy}
                        className={styles.button}
                    >
                        Купить
                    </button>
                </div>
            </div>
            <Modal open={buy} footer={null} centered={true}
                   bodyStyle={{
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                       maxWidth: '30rem',
                       margin: '0 auto'
                   }}>
                <Alert setModalActive={handleCloseModal} buy={true}/>
            </Modal>
        </section>
    );
};

export default CardModal;