import searchIcon from "@assets/icon/search.svg";
import styles from "./search.module.scss";

const Search = () => {
    return (
        <div className={styles.inputBox}>
            <img className={styles.inputBox__icon} src={searchIcon} alt={'search icon'}/>
            <input placeholder={'Поиск ...'} className={styles.inputBox__input} type={'search'}/>
        </div>
    )
}

export default Search;