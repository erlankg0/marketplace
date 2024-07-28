import styles from "./seller.module.scss";
import user from "@assets/images/user.png";
import React from "react";
import {ISeller} from "@components/seller/interface.ts";

const Seller: React.FC<ISeller> = ({image, fullName}) => {
    return (
        <div className={styles.user}>
            <img className={styles.user__image} src={image ? image : user} alt={'user image'}/>
            <div className={styles.user__text}>
                <h4 className={styles.user__title}>{fullName ? fullName : 'Sandy Wilder Cheng'}</h4>
                <p className={styles.user__paragraph}>Автор объявления</p>
            </div>
        </div>
    )
}
export default Seller;