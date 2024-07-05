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
                <p className={styles.change__description}>Загрузите фотографию из своей галлерии</p>
            </div>
            <div className={styles.change__upload}>
                <label htmlFor={'file'} className={styles.label}>+ Загрузить файл</label>
                <input id={'file'} type={'file'}/>
                <p className={styles.change__description}>Формат JPG, JPEG, PNG</p>
            </div>
            <div className={styles.button}>
                <ButtonComponent text={'Сохранить'}/>
            </div>
        </div>
    )
}

export default Change;