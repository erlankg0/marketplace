import styles from "./dropdown.module.scss";
import React, {useEffect, useState} from "react";
import {IDropdown} from "@components/dropdown/interface.ts";
import {NavLink} from "react-router-dom";

const Dropdown: React.FC<IDropdown> = ({tabs, icon, title}) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    const LOCAL_STORAGE_KEY = `dropdown-${title}`;

    useEffect(() => {
        const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedState !== null) {
            setOpen(JSON.parse(savedState));
        }
    }, [LOCAL_STORAGE_KEY]);

    const handleToggleDropdown = () => {
        const newState = !isOpen;
        setOpen(newState);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
    };
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
                            key={tab.url}
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