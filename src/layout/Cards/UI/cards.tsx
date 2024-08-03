import React, {useEffect, useState} from "react";
import styles from "./cards.module.scss";
import Card from "@components/card/UI/card";
import {ICards} from "@layout/Cards/interface";
import {getAllEquipment} from "@network/equipment/equipment";
import {getAllServices} from "@network/service/service";
import {getAllOrders} from "@network/order/order";
import {IData} from "@network/interfaces/response/service";
import {useAppSelector} from "@redux/hooks.ts";

const Cards: React.FC<ICards> = ({url}) => {
    const [items, setItems] = useState<IData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const searchText = useAppSelector(state => state.search.text);

    const handleGetItems = async (url: string) => {
        try {
            setLoading(true);
            setError(null);
            let response: IData[];

            switch (url) {
                case 'order':
                    response = await getAllOrders();
                    break;
                case 'services':
                    response = await getAllServices();
                    break;
                case 'equipment':
                    if (searchText) {
                        console.log(searchText);
                    } else {
                        response = await getAllEquipment();
                        console.log(response)
                    }
                    response = await getAllEquipment();
                    break;
                default:
                    throw new Error('Invalid URL');
            }
            if (response){
                setItems(response);
            }
        } catch (err) {
            console.error('Error fetching items:', err);
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetItems(url);
    }, [url]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (items.length === 0) {
        return <div>Ничего нету</div>;
    }

    return (
        <section className={styles.cards}>
            {items.map(item => (
                <Card category={url} key={item.id} data={item}/>
            ))}
        </section>
    );
};

export default Cards;