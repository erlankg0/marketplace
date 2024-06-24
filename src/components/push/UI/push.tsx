import React, {useState} from "react";
import {IPush} from "@components/push/interface.ts";
import push from "@assets/icon/push.svg";

import styles from "./push.module.scss"

const Push: React.FC<IPush> = ({onClick}) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const handleToggle = () => {
        setOpen(!isOpen);
        onClick();
    }
    return (
        <div className={styles.push}>
            <img onClick={handleToggle} className={styles.push__logo} src={push} alt={'push image'}/>
        </div>
    )
}

export default Push;