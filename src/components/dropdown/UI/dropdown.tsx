import styles from "./dropdown.module.scss";
import React, {useState} from "react";
import {IDropdown} from "@components/dropdown/interface.ts";
import {NavLink} from "react-router-dom";

const Dropdown: React.FC<IDropdown> = ({tabs, icon, title}) => {
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
                    {tabs.map((tab) => <li className={styles.dropdown__list_text}>
                        <NavLink
                            to={tab.url}
                            className={({isActive, isPending}) =>
                                isPending ? "" : isActive ? styles.active : ""
                            }
                        >
                            {tab.title}
                        </NavLink>
                    </li>)}
                </ul>
            )}
        </div>
    )
}

export default Dropdown;