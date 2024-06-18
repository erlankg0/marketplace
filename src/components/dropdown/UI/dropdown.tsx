import styles from "./dropdown.module.scss";
import React, {useState} from "react";
import {IDropdown} from "@components/dropdown/interface.ts";

const Dropdown: React.FC<IDropdown> = ({title, tabs, icon}) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    const handleToggleDropdown = () => {
        setOpen(!isOpen);
    }
    return (
        <div className={styles.dropdown}>
            <div className={isOpen ? `${styles.dropdown__title} ${styles.active}` : styles.dropdown__title}
                 onClick={handleToggleDropdown}>
                <img src={icon} alt={`icon ${title}`}/>
                <p>{title}</p>
            </div>
            {isOpen && (
                <ul className={styles.dropdown__list}>
                    {tabs.map((tab) => <li className={styles.dropdown__list_text}>{tab}</li>)}
                </ul>
            )}
        </div>
    )
}

export default Dropdown;