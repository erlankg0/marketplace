import success from "@assets/emoji/forgot.jpeg";
import styles from "./change.module.scss";
import ButtonComponent from "@components/button/UI/button.tsx";

const Change = () => {
    return (
        <div className={styles.change}>
            <div className={styles.change__head}>
                <img src={success} alt={'emoji succes'}/>
            </div>
            <div className={styles.change__text}>
                <h2 className={styles.change__title}>Изменить фото профиля?</h2>
                <p className={styles.change__description}>Загрузите фотографию из своей галлерииl</p>
            </div>
            <div className={styles.change__upload}>
                <input type={'file'}/>
                <label className={styles.change__description}>Формат JPG, JPEG, PNG</label>
            </div>
            <div className={styles.button}>
                <ButtonComponent text={'Сохранить'}/>
            </div>
        </div>
    )
}

export default Change;