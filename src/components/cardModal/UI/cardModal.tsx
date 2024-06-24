import React, {useState} from "react";
import styles from "./cardModal.module.scss";
import Seller from "@components/seller/UI/seller.tsx";
import nitka from "@assets/images/nitki.jpg";
import ni from "@assets/images/nitki02.jpg";
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode, Navigation, Pagination, Thumbs} from 'swiper/modules';
import SwiperCore from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import {Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import {ICardModal} from "@components/cardModal/interface.ts";


SwiperCore.use([Navigation, Pagination, Thumbs, FreeMode]);


const CardModal: React.FC<ICardModal> = ({setAlert, setModal}) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

    const slides = [
        nitka,
        nitka, nitka, nitka, ni, nitka];

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
                            {slides.map((slide, index) => (
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
                        <h3 className={styles.card__title}>Заказ N:5</h3>
                        <p className={styles.time}> Срок: до 15 апреля</p>

                    </div>
                    <p className={styles.card__price}>1000 сом</p>
                </div>
                <div className={styles.card__text}>
                    <div className={'line'}></div>
                    <div>
                        <Seller/>
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
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor
                                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud
                                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                                        </p>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className={styles.content}><a href="tel:+9965505557222"
                                                                       className={styles.content__text}>
                                        Телефон: +996 550 555 7222
                                    </a>
                                        <a href="mailto:marketing@smarttrade.com.kg" className={styles.content__text}>
                                            Э-почта: marketing@smarttrade.com.kg
                                        </a>
                                    </div>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                        <p className={styles.content__count}>В наличие: <strong>2</strong></p>

                    </div>
                    <button onClick={() => {
                        if(setAlert){
                            setAlert(true);
                        }
                        setModal(false);
                    }} className={styles.button}>Купить
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CardModal;