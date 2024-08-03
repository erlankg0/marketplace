import searchIcon from "@assets/icon/search.svg";
import styles from "./search.module.scss";
import { useAppSelector, useAddDispatch } from "@redux/hooks.ts";
import {setSearchText} from "@redux/slices/search.ts";

const Search = () => {
    const dispatch = useAddDispatch();
    const search = useAppSelector(state => state.search.text);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchText(e.target.value));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        // Здесь можно выполнить действие при нажатии Enter, например, отправить запрос
        console.log("Search submitted:", search);
    };

    return (
        <div className={styles.inputBox}>
            <img className={styles.inputBox__icon} onClick={handleSearch} src={searchIcon} alt={'search icon'}/>
            <input
                placeholder={'Поиск ...'}
                value={search}
                className={styles.inputBox__input}
                type={'search'}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default Search;