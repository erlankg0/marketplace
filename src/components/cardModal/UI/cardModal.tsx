import styles from "./cardModal.module.scss";
import Seller from "@components/seller/UI/seller.tsx";
import sliderMain from "@assets/images/sliderMain.jpg";
import nitka from "@assets/images/nitki.jpg";

const CardModal = () => {
    return (
        <section className={styles.card}>
            <div className={styles.card__gallery}>
                <div className={styles.card__slide}>
                    <img src={sliderMain} alt={''}/>
                </div>
                <div className={styles.card__slides}>
                    <img className={styles.card__slider} src={nitka} alt={'nitka'}/>
                    <img className={styles.card__slider} src={nitka} alt={'nitka'}/>
                    <img className={styles.card__slider} src={nitka} alt={'nitka'}/>
                    <img className={styles.card__slider} src={nitka} alt={'nitka'}/>
                    <img className={styles.card__slider} src={nitka} alt={'nitka'}/>
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