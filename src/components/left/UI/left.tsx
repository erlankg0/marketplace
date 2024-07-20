import left from "@assets/icon/left.svg";
import {useNavigate} from "react-router-dom";
import styles from "./left.module.scss";

const Left = () => {
    const navigation = useNavigate();

    const handleNavigationBack = () => {
        navigation(-1);
    }
    return (
        <div className={styles.left}>
            <img className={styles.left__icon} src={left} alt={'button navigation for back'}
                 onClick={handleNavigationBack}/>
            <p className={styles.left__text}>Детали сотрудника</p>
        </div>
    )
}

export default Left;