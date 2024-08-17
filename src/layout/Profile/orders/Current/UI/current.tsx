import SelectButton from "@components/button/UI/selectButton.tsx";
import {useEffect, useState} from "react";
import styles from "./current.module.scss";
import HistoryCard from "@components/history/UI/history.tsx";
import {getMyEquipments} from "@network/equipment/equipment.ts";
import {getMyOrders} from "@network/order/order.ts";
import {getMyServices} from "@network/service/service.ts";
import {getMyAds} from "@network/profile/profile.ts";
import {ICards} from "@network/interfaces/basic.ts";

const CurrentOrders = () => {
    const [selectedButton, setSelectedButton] = useState<'ALL' | 'ORDER' | 'SERVICE' | 'EQUIPMENT'>('ALL');
    const [items, setItems] = useState<ICards>();
    const LOCAL_STORAGE_KEY = 'myAdsListSelectedButton';

    const handleGetMyOrder = async () => {
        try {
            let response;
            switch (selectedButton) {
                case "EQUIPMENT":
                    response = await getMyEquipments();
                    if ('status' in response) {
                        console.log(response)
                    } else {
                        setItems(response);
                    }
                    break;
                case "ORDER":
                    response = await getMyOrders();
                    if ('status' in response) {
                        console.log(response)
                    } else {
                        setItems(response);
                    }
                    break;
                case "SERVICE":
                    response = await getMyServices();
                    if ('status' in response) {
                        console.log(response)
                    } else {
                        setItems(response);
                    }
                    break;
                case "ALL":
                    response = await getMyAds();
                    setItems(response.data.advertisement.reverse());
                    break;
            }
        } catch (e) {
            console.error('Error fetching items:', e);
        }
    };

    useEffect(() => {
        handleGetMyOrder();
    }, [selectedButton]);

    useEffect(() => {
        const savedButton = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedButton) {
            setSelectedButton(savedButton as 'ALL' | 'ORDER' | 'SERVICE' | 'EQUIPMENT');
        }
    }, []);

    const handleButtonClick = (buttonType: 'ALL' | 'ORDER' | 'SERVICE' | 'EQUIPMENT') => {
        setSelectedButton(buttonType);
        localStorage.setItem(LOCAL_STORAGE_KEY, buttonType);
    };

    return (
        <section className={styles.my_ads}>
            <h2 className={styles.my_ads__title}>Тип Объявления</h2>
            <div className={'row'}>
                <SelectButton
                    text="Все объявления"
                    action={selectedButton === 'ALL'}
                    onClickAction={() => handleButtonClick('ALL')}
                />
                <SelectButton
                    text="Оборудования"
                    action={selectedButton === 'EQUIPMENT'}
                    onClickAction={() => handleButtonClick('EQUIPMENT')}
                />
                <SelectButton
                    text="Заказ"
                    action={selectedButton === 'ORDER'}
                    onClickAction={() => handleButtonClick('ORDER')}
                />
                <SelectButton
                    text="Услуги"
                    action={selectedButton === 'SERVICE'}
                    onClickAction={() => handleButtonClick('SERVICE')}
                />
            </div>
            <div className={styles.my_ads__column}>
                {items ? (
                    items.advertisement.map(item => (
                        <HistoryCard
                            key={item.id}
                            id={item.id}
                            myAds={true}
                            date={item.date && item.date}
                            title={item.name}
                            description={item.description}
                            image={item.imagePath && item.imagePath}
                            type={selectedButton}
                        />
                    ))
                ) : (
                    <p>No items found</p>
                )}
            </div>
        </section>
    );
};

export default CurrentOrders;