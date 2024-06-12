import styles from "./cardModal.module.scss";
import Seller from "@components/seller/UI/seller.tsx";
import nitka from "@assets/images/nitki.jpg";
import ni from "@assets/images/nitki02.jpg";
import {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Thumbs, FreeMode} from 'swiper/modules';
import SwiperCore from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

SwiperCore.use([Navigation, Pagination, Thumbs, FreeMode]);


const CardModal = () => {

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
                                    <img className={`${styles.card__slide} ${styles.card__image}`} src={slide} alt={`Slide ${index}`}/>
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
                    <h3 className={styles.card__title}>Профессиональные спицы для вязания</h3>
                    <p className={styles.card__price}>1000 сом</p>
                </div>
                <div className={styles.card__text}>
                    <div className={'line'}></div>
                    <div>
                        <Seller/>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.content__tags}>
                            <div className={styles.content__tag}>
                                Описание
                            </div>
                            <div className={styles.content__tag}>
                                Контакты Авторов
                            </div>
                        </div>
                        <div className={styles.content}>
                            <text className={styles.content__text}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                            </text>
                            <p className={styles.content__count}>В наличие: <strong>2</strong></p>
                        </div>
                    </div>
                    <button className={styles.button}>Купить</button>
                </div>
            </div>
        </section>
    )
}

export default CardModal;