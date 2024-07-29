import React, {useEffect, useState} from "react";
import styles from "./cardModal.module.scss";
import Seller from "@components/seller/UI/seller.tsx";

import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode, Navigation, Pagination, Thumbs} from 'swiper/modules';
import SwiperCore from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import {Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';

import {ICardModal} from "@components/cardModal/interface.ts";
import {getByIdOrder} from "@network/order/order.ts";
import {getServiceById} from "@network/service/service.ts";
import {getEquipmentById} from "@network/equipment/equipment.ts";
import {ISize} from "@layout/ads/interface.ts";
import nitka from "@assets/images/nitki.jpg";
import ni from "@assets/images/nitki02.jpg";
import Alert from "@components/alert/UI/alert.tsx";
import {Modal} from "antd";

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

    const handleBuy = () => {
        setBuy(true);
        setModal(false);
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
                        orderItems: response.orderItems,
                        authorImage: response.authorImage,
                        authorName: response.fullName,
                    });
                    break;
                case 'services':
                    response = await getServiceById(id);
                    setItem({
                        id: response.id,
                        images: response.imagesPaths,
                        name: response.name,
                        description: response.description,
                        price: response.price,
                        contactInfo: response.contactInfo,
                        authorImage: response.authorImagePath,
                        authorName: `${response.authorName} ${response.authorSurname} ${response.patronymic}`,
                    });
                    break;
                default:
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

    const slides: string[] = item ? item.images : [ni, nitka];

    return (
        <section className={styles.card}>
            <div className={styles.card__gallery}>
                <div className={styles.card__slide}>
                    <div>
                        <Swiper
                            loop={true}
                            thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                            modules={[Navigation, Pagination, Thumbs, FreeMode]}
                            className="main-swiper"
                        >
                            {item?.images.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <img className={`${styles.card__slide} ${styles.card__image}`} src={slide}
                                         alt={`Slide ${index}`}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
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
                            {slides.map((slide, index) => (
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
                        {item?.date && <p className={styles.time}> Срок: {item.date.getDate()}</p>}
                    </div>
                    <p className={styles.card__price}>{`${item?.price || ''}`} сом</p>
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
                                            <a href="tel:+9965505557222" className={styles.content__text}>
                                                Телефон: +996 550 555 7222
                                            </a>
                                        ) : (
                                            <a href="mailto:marketing@smarttrade.com.kg"
                                               className={styles.content__text}>
                                                Э-почта: marketing@smarttrade.com.kg
                                            </a>
                                        )}
                                    </div>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                        {item?.quantity && (
                            <p className={styles.content__count}>В наличие: <strong>{item?.quantity || ''}</strong></p>
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
            <Modal open={buy} footer={<></>} centered={true}
                   bodyStyle={{display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '30rem'}}>
                <Alert setModalActive={handleCloseModal} success={true}/>
            </Modal>
        </section>
    );
};

export default CardModal;