import SelectButton from "@components/button/UI/selectButton.tsx";
import {useEffect, useState} from "react";
import styles from "./current.module.scss";
import {myAds} from "@network/profile/profile.ts";
import {IMyAds} from "@network/interfaces/profile/profile.ts";
import HistoryCard from "@components/history/UI/history.tsx";

const CurrentOrders = () => {
    const [selectedButton, setSelectedButton] = useState<'ALL' | 'ORDER' | 'SERVICE' | 'EQUIPMENT'>('ALL');
    const [items, setItems] = useState<IMyAds[]>([]);
    const LOCAL_STORAGE_KEY = 'myAdsListSelectedButton';

    const handleFilterItems = (type?: 'SERVICE' | 'EQUIPMENT' | 'ORDER') => {
        if (type) {
            return items.filter(item => item.type == type);
        }
        return items
    }

    const handleGetItems = async () => {
        try {
            const response = await myAds();
            setItems(response.data);
            return response.data;
        } catch (e) {
            console.error('Error fetching items:', e);
        }
    };

    useEffect(() => {
        handleGetItems();
    }, [])

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
                {selectedButton == 'ALL' ? (
                    <>
                        {
                            handleFilterItems().map(item => (
                                    <HistoryCard
                                        id={item.id}
                                        type={item.type}
                                        myAds={true}
                                        date={item.createdAt}
                                        title={item.name}
                                        description={item.description}
                                        image={item.imagePath}
                                        category={item.type}
                                    />
                                )
                            )
                        }
                    </>
                ) : (
                    <>
                        {
                            handleFilterItems(selectedButton).map(item => (
                                    <HistoryCard
                                        type={item.type}
                                        myAds={true}
                                        date={item.createdAt}
                                        title={item.name}
                                        description={item.description}
                                        image={item.imagePath}
                                    />
                                )
                            )
                        }
                    </>
                )}
            </div>
        </section>
    )
}
export default CurrentOrders;