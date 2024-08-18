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
import {IError} from "@network/interfaces/network/error.ts";
import {ICards as ICardsResponse} from "@network/interfaces/basic.ts";
import {getMyPurchases} from "@network/profile/profile.ts";

const Cards: React.FC<ICards> = ({url}) => {
    const [items, setItems] = useState<IData[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);

    // loader and errors
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // category select
    const [currentPage, setCurrentPage] = useState<number>(1);
    // search
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
    console.log(url)
    const handleGetItems = async (url: string, page: number, searchText?: string) => {
        try {
            setLoading(true);
            setError(null);
            let response: ICardsResponse | IError;
            setLoading(true);
            switch (url) {
                case 'order':
                    response = await getAllOrders(page - 1, 8);
                    if ('status' in response) {
                        setError(`${response.message}, код: ${response.status}`)
                        console.log(response.message)
                    } else {
                        setItems(response.advertisement);
                        setTotalItems(response.totalCount);
                    }
                    break;
                case 'services':
                    response = await getAllServices(page - 1, 8);
                    if ('status' in response) {
                        setError(`${response.message}, код: ${response.status}`)
                        console.log(response.message)
                    } else {
                        setItems(response.advertisement);
                        setItems(response.advertisement);
                        setTotalItems(response.totalCount);
                    }
                    break;
                case 'self-buys':
                    response = await getMyPurchases(page - 1, 8);
                    if ('status' in response) {
                        setError(`${response.message}, код: ${response.status}`)
                        console.log(response.message)
                    } else {
                        setItems(response.advertisement);
                        setItems(response.advertisement);
                        setTotalItems(response.totalCount);
                    }
                    break;
                case 'equipment':
                    if (searchText) {
                        response = await searchEquipment(searchText);
                        if ('status' in response) {
                            setError(`${response.message}, код: ${response.status}`)
                            console.log(response.message)
                        } else {
                            setItems(response.advertisement);
                            setItems(response.advertisement);
                            setTotalItems(response.totalCount);
                        }
                    } else {
                        response = await getAllEquipment(page - 1, 8);
                        if ('status' in response) {
                            setError(`${response.message}, код: ${response.status}`)
                            console.log(response.message)
                        } else {
                            setItems(response.advertisement);
                            setItems(response.advertisement);
                            setTotalItems(response.totalCount);
                        }
                    }
                    break;
            }
        } catch (err) {
            console.error('Error fetching items:', err);
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
        <section className="column">
            <div className={styles.cards}>
                {items.map(item => (
                    <Card category={url} key={item.id} data={item}/>
                ))}
            </div>
            <div style={{display: 'flex', justifyContent: "center"}}>
                <Pagination
                    current={currentPage}
                    total={totalItems}
                    pageSize={4} // Adjust this if needed
                    onChange={handlePageChange}
                />
            </div>
        </section>
    );
};

export default Cards;