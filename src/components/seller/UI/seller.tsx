import styles from "./seller.module.scss";
import user from "@assets/images/user.png";

const Seller = () => {
    return (
        <div className={styles.user}>
            <img className={styles.user__image} src={user} alt={'user image'}/>
            <div className={styles.user__text}>
                <h4 className={styles.user__title}>Sandy Wilder Cheng</h4>
                <p className={styles.user__paragraph}>Автор объявления</p>
            </div>
        </div>
    )
}
export default Seller;