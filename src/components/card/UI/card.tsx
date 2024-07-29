import React, {useState} from "react";
import styles from "@components/card/UI/card.module.scss";
import Seller from "@components/seller/UI/seller.tsx";
import {IData} from "@network/interfaces/response/service.ts";
import {ICard} from "@components/card/interface.ts";
import Modal from "@components/modal/UI/modal.tsx";
import CardModal from "@components/cardModal/UI/cardModal.tsx";


const Card: React.FC<ICard<IData>> = ({data, category}) => {
    const [modalActive, setModalActive] = useState<boolean>(false);

    return (
        <div className={styles.card}>
            <img className={styles.card__image} src={data.equipmentImageUrl} alt="Card Image"/>
            <div className={styles.card__content}>
                <div className={styles.card__text}>
                    <div className={styles.card__title}>
                        <p className={styles.title}>{data.name}</p>
                        <p className={styles.price}>{data.price} сом</p>
                    </div>
                    <Seller fullName={''} image={''}/>
                    <p className={styles.description}>
                        {data.description}
                    </p>
                </div>
                <div>
                    <button type="button" onClick={() => setModalActive(!modalActive)}
                            className={styles.card__button}>Подробнее
                    </button>
                </div>
            </div>
            <Modal
                active={modalActive}
                setModalActive={(active: boolean) => setModalActive(active)}
                component={CardModal}
                componentProps={{
                    setModal: (active: boolean) => setModalActive(active),
                    id: data.id,
                    category: category
                }}
            />
        </div>
    )
};

export default Card;