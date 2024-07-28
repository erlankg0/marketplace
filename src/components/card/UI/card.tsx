import React from "react";
import styles from "@components/card/UI/card.module.scss";
import Seller from "@components/seller/UI/seller.tsx"; // Убедитесь, что путь правильный.
import {IServiceData} from "@network/interfaces/response/service.ts";
import {IOrderData} from "@network/interfaces/response/order.ts";
import {IEquipmentData} from "@network/interfaces/response/equipments.ts";
import {ICard} from "@components/card/interface.ts";

const OrderCard: React.FC<ICard<IOrderData>> = ({data, setActiveModal}) => (
    <div className={styles.card}>
        <img className={styles.card__image} src={data.orderPhotoUrl} alt="Card Image"/>
        <div className={styles.card__content}>
            <div className={styles.card__text}>
                <div className={styles.card__title}>
                    <p className={styles.title}>{data.name}</p>
                    <p className={styles.price}>{data.price} сом</p>
                </div>
                <Seller fullName={''} image={''}/>
                <p className={styles.description}>
                    {data.orderDescription}
                </p>
            </div>
            <div>
                <button type="button" onClick={() => setActiveModal(true)} className={styles.card__button}>Подробнее
                </button>
            </div>
        </div>
    </div>
);

const ServiceCard: React.FC<ICard<IServiceData>> = ({data, setActiveModal}) => (
    <div className={styles.card}>
        <img className={styles.card__image} src={data.imagePath} alt="Card Image"/>
        <div className={styles.card__content}>
            <div className={styles.card__text}>
                <div className={styles.card__title}>
                    <p className={styles.title}>{data.name}</p>
                    <p className={styles.price}>{data.price} сом</p>
                </div>
                <Seller fullName={`${data.authorName} ${data.authorSurname} ${data.patronymic}`} image={data.authorImagePath}/>
                <p className={styles.description}>
                    {data.description}
                </p>
            </div>
            <div>
                <button type="button" onClick={() => setActiveModal(true)} className={styles.card__button}>Подробнее
                </button>
            </div>
        </div>
    </div>
);

const EquipmentCard: React.FC<ICard<IEquipmentData>> = ({data, setActiveModal}) => (
    <div className={styles.card}>
        <img className={styles.card__image} src={data.equipmentPhotoUrl} alt="Card Image"/>
        <div className={styles.card__content}>
            <div className={styles.card__text}>
                <div className={styles.card__title}>
                    <p className={styles.title}>{data.name}</p>
                    <p className={styles.price}>{data.price} сом</p>
                </div>
                <Seller fullName={data.authorFullName} image={data.authorImageUrl}/>
                <p className={styles.description}>
                    {data.description}
                </p>
            </div>
            <div>
                <button type="button" onClick={() => setActiveModal(true)} className={styles.card__button}>Подробнее
                </button>
            </div>
        </div>
    </div>
);

const Card: React.FC<ICard<IEquipmentData | IOrderData | IServiceData>> = ({setActiveModal, data, category}) => {
    const renderCard = () => {
        switch (category) {
            case 'order':
                return <OrderCard data={data as IOrderData} setActiveModal={setActiveModal}/>;
            case 'services':
                return <ServiceCard data={data as IServiceData} setActiveModal={setActiveModal}/>;
            default:
                return <EquipmentCard data={data as IEquipmentData} setActiveModal={setActiveModal}/>;
        }
    };

    return (
        <>
            {renderCard()}
        </>
    );
};

export default Card;