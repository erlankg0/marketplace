import React, {useEffect, useState} from "react";
import styles from "./cards.module.scss";
import Card from "@components/card/UI/card.tsx";
import {ICards} from "@layout/Cards/interface.ts";
import {getAllEquipment} from "@network/equipment/equipment.ts";
import {getAllServices} from "@network/service/service.ts";
import {getAllOrders} from "@network/order/order.ts";
import {IServiceData} from "@network/interfaces/response/service.ts";
import {IOrderData} from "@network/interfaces/response/order.ts";
import {IEquipmentData} from "@network/interfaces/response/equipments.ts";

export interface Response<T> {
    data: T;
}

export type Item = IServiceData | IOrderData | IEquipmentData;

const Cards: React.FC<ICards> = ({ setActiveModal, url}) => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleGetItems = async (url: string) => {
        try {
            setLoading(true);
            setError(null);
            let response: Response<Item[]>;
            switch (url) {
                case 'order':
                    response = await getAllOrders();
                    break;
                case 'services':
                    response = await getAllServices();
                    break;
                default:
                    response = await getAllEquipment();
                    break;
            }
            setItems(response.data);
        } catch (err) {
            console.error('Error fetching items:', err);
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetItems(url);
    }, [url]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className={styles.cards}>
            {items && items.map(item => (
                <Card category={url} key={item.name} data={item} setActiveModal={setActiveModal} />
            ))}
        </section>
    );
};

export default Cards;
