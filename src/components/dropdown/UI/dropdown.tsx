import person from "@assets/icon/person.svg";
import styles from "./dropdown.module.scss";
import {useState} from "react";

const Dropdown = () => {
    const [isOpen, setOpen] = useState<boolean>(false);

    const handleToggleDropdown = () => {
        setOpen(!isOpen);
    }
    return (
        <div className={styles.dropdown}>
            <div className={isOpen ? `${styles.dropdown__title} ${styles.active}` : styles.dropdown__title} onClick={handleToggleDropdown}>
                <img src={person}/>
                <p>Личный кабинет</p>
            </div>
            {isOpen && (
                <ul className={styles.dropdown__list}>
                    <li className={styles.dropdown__list_text} >Профиль</li>
                    <li className={styles.dropdown__list_text}>Мои объявления</li>
                    <li className={styles.dropdown__list_text}>Мои покупки</li>
                    <li className={styles.dropdown__list_text}>История заказов</li>
                    <li className={styles.dropdown__list_text}>Организация</li>
                </ul>
            )}
        </div>
    )
}

export default Dropdown;