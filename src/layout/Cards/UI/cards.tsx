import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import styles from "./cards.module.scss";
import Card from "@components/card/UI/card";
import { ICards } from "@layout/Cards/interface";
import { getAllEquipment } from "@network/equipment/equipment";
import { getAllServices } from "@network/service/service";
import { getAllOrders } from "@network/order/order";
import { IData } from "@network/interfaces/response/service";
import { useAppSelector } from "@redux/hooks.ts";

const Cards: React.FC<ICards> = ({ url }) => {
    const [items, setItems] = useState<IData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const searchText = useAppSelector(state => state.search.text);

    const handleGetItems = async (url: string, page: number) => {
        try {
            setLoading(true);
            setError(null);
            let response: { advertisement: IData[], isLast: boolean };

            switch (url) {
                case 'order':
                    response = await getAllOrders(page - 1, 4);
                    break;
                case 'services':
                    response = await getAllServices(page - 1, 4);
                    break;
                case 'equipment':
                    if (searchText) {
                        console.log(searchText);
                    } else {
                        response = await getAllEquipment(page - 1, 4);
                    }
                    response = await getAllEquipment(page - 1, 4);
                    break;
                default:
                    throw new Error('Invalid URL');
            }
            if (response) {
                setItems(response.advertisement);
                setTotalItems(19); // Assume the response includes a totalItems property
            }
        } catch (err) {
            console.error('Error fetching items:', err);
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetItems(url, currentPage);
    }, [url, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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
        <section className={'column'}>
            <div className={styles.cards}>
                {items.map(item => (
                    <Card category={url} key={item.id} data={item} />
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '3rem 0' }}>
                <Pagination
                    current={currentPage}
                    total={totalItems}
                    pageSize={4}
                    onChange={handlePageChange}
                />
            </div>
        </section>
    );
};

export default Cards;