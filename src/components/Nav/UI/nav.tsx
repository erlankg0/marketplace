import {NavLink} from "react-router-dom";
import React from "react";
import styles from "@components/dropdown/UI/dropdown.module.scss";
import {INav} from "@components/Nav/interface.ts";

const Nav : React.FC<INav> = ({url, title, icon}) => {

    return (
            <NavLink to={url}
                     className={({isActive, isPending}) =>
                         isPending ? `${styles.dropdown__title}` : isActive ? `${styles.dropdown__title} ${styles.active}` : `${styles.dropdown__title}`
                     }>
                    <img src={icon} alt={`icon ${title}`}/>
                    <p>{title}</p>
            </NavLink>
    )
}

export default Nav