import styles from "./card.module.scss";
import cardImage from "@assets/images/cardimage.png";
import Button from "@components/button/UI/button.tsx";
import user from "@assets/images/user.png"

const Card = () => {
    return (
        <div className={styles.card}>
            <img className={styles.card__image} src={cardImage} alt={'Card Image'}/>
            <div className={styles.card__content}>
                <div className={styles.card__text}>
                    <div className={styles.card__title}>
                        <p className={styles.title}>Нитки</p>
                        <p className={styles.price}>100 сом</p>
                    </div>
                    <div className={styles.user}>
                        <img className={styles.user__image} src={user} alt={'user image'}/>
                        <div className={styles.user__text}>
                            <h4 className={styles.user__title}>Sandy Wilder Cheng</h4>
                            <p className={styles.user__paragraph}>Автор объявления</p>
                        </div>
                    </div>
                    <p className={styles.user__description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing eliе...
                    </p>
                </div>
                <div>
                    <Button text={'Побробнее'} onSubmit={() => undefined}/>
                </div>
            </div>
        </div>
    )
}

export default Card;