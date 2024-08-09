import React, {useEffect, useState} from "react";
import {Pagination} from "antd";
import styles from "./cards.module.scss";
import Card from "@components/card/UI/card";
import {ICards} from "@layout/Cards/interface";
import {getAllEquipment, searchEquipment} from "@network/equipment/equipment";
import {getAllServices} from "@network/service/service";
import {getAllOrders} from "@network/order/order";
import {IData} from "@network/interfaces/response/service";
import {useAppSelector} from "@redux/hooks.ts";

const Cards: React.FC<ICards> = ({url}) => {
    const [items, setItems] = useState<IData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const searchText = useAppSelector(state => state.search.text);
    const [debouncedSearchText, setDebouncedSearchText] = useState<string>(searchText);

    // Debounce the search text
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchText(searchText);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [searchText]);

    const handleGetItems = async (url: string, page: number, searchText?: string) => {
        try {
            setLoading(true);
            setError(null);
            let response: { advertisement: IData[], isLast: boolean, totalCount: number };

            switch (url) {
                case 'order':
                    response = await getAllOrders(page - 1, 8);
                    break;
                case 'services':
                    response = await getAllServices(page - 1, 8);
                    break;
                case 'equipment':
                    if (searchText) {
                        response = await searchEquipment(searchText);
                    } else {
                        response = await getAllEquipment(page - 1, 8);
                    }
                    break;
                default:
                    throw new Error('Invalid URL');
            }

            if (response) {
                setItems(response.advertisement);
                setTotalItems(response?.totalCount ? response.totalCount : 1);
            }
        } catch (err) {
            console.error('Error fetching items:', err);
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetItems(url, currentPage, debouncedSearchText);
    }, [url, currentPage, debouncedSearchText]);

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
        return <div>No items found</div>;
    }

    return (
        <section className={'column'}>
            <div className={styles.cards}>
                {items.map(item => (
                    <Card category={url} key={item.id} data={item}/>
                ))}
            </div>
            <div style={{display: 'flex', justifyContent: "center"}}>
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