import styles from "./push.module.scss"
import push from "@assets/icon/push.svg";
import {useState} from "react";

const Push = () => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const handleToggle = () => {
        setOpen(!isOpen);
    }
    return (
        <div className={styles.push}>
            <img onClick={handleToggle} className={styles.push__logo} src={push} alt={'push image'}/>
        </div>
    )
}

export default Push;