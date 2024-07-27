import React, { useEffect, useState } from "react";
import styles from "./cards.module.scss";
import Card from "@components/card/UI/card.tsx";
import { ICards } from "@layout/Cards/interface.ts";
import { getAllEquipment } from "@network/equipment/equipment.ts";
import { useLocation } from "react-router";
import { getAllServices } from "@network/service/service.ts";
import { getAllOrders } from "@network/order/order.ts";
import { IServiceData } from "@network/interfaces/response/service.ts";
import { IOrderData } from "@network/interfaces/response/order.ts";
import { IEquipmentData } from "@network/interfaces/response/equipments.ts";

export interface Response<T> {
    data: T;
}

type Item = IServiceData | IOrderData | IEquipmentData;

const Cards: React.FC<ICards> = ({ setActiveModal }) => {
    const path = useLocation().pathname.split('/').pop() as string;
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
            }
            setItems(response.data);
        } catch (err) {
            console.error('Error fetching items:', err); // Log the full error for debugging
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetItems(path);
    }, [path]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className={styles.cards}>
            {items.map((item) => (
                <Card key={item.name} setActiveModal={setActiveModal} />
            ))}
        </section>
    );
};

export default Cards;
