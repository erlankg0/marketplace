import React, {useState} from "react";
import styles from "./monitoring.module.scss";
import HistoryCard from "@components/history/UI/history.tsx";
import {IHistory} from "@layout/MonitoringHistory/interface.ts";
import image from "@assets/images/nitki.jpg";
import SelectButton from "@components/button/UI/selectButton.tsx";
import DateComponent from "@components/date/UI/date.tsx";


const History: React.FC<IHistory> = ({setModalActive}) => {
    const [selectedButton, setSelectedButton] = useState<boolean>(false);
    const handleToggle = () => {
        setSelectedButton(!setSelectedButton);
    }
    const data: IHistory[] = [
        {
            setModalActive: setModalActive,
            price: "100",
            title: "Швейная машинка",
            description: "Отличная швейная машинка в хорошем состоянии.",
            date: new Date('2023-01-01'),
            image,
        },
        {
            setModalActive: setModalActive,
            price: "150",
            title: "Смартфон",
            description: "Последняя модель с отличными характеристиками.",
            date: new Date('2023-02-15'),
            image
        },
        {
            setModalActive: setModalActive,
            price: "200",
            title: "Ноутбук",
            description: "Мощный ноутбук для работы и игр.",
            date: new Date('2024-03-15'), // 15th March 2024
            image
        },
        {
            setModalActive: setModalActive,
            price: "150",
            title: "Смартфон",
            description: "Последняя модель с отличными характеристиками.",
            date: new Date('2023-02-15'),
            image
        },
        {
            setModalActive: setModalActive,
            price: "200",
            title: "Ноутбук",
            description: "Мощный ноутбук для работы и игр.",
            date: new Date('2024-03-15'), // 15th March 2024
            image
        },
        {
            setModalActive: setModalActive,
            price: "150",
            title: "Смартфон",
            description: "Последняя модель с отличными характеристиками.",
            date: new Date('2023-02-15'),
            image
        },
        {
            setModalActive: setModalActive,
            price: "200",
            title: "Ноутбук",
            description: "Мощный ноутбук для работы и игр.",
            date: new Date('2024-03-15'), // 15th March 2024
            image
        },
        {
            setModalActive: setModalActive,
            price: "150",
            title: "Смартфон",
            description: "Последняя модель с отличными характеристиками.",
            date: new Date('2023-02-15'),
            image
        },
        {
            setModalActive: setModalActive,
            price: "200",
            title: "Ноутбук",
            description: "Мощный ноутбук для работы и игр.",
            date: new Date('2024-03-15'), // 15th March 2024
            image
        },
        {
            setModalActive: setModalActive,
            price: "150",
            title: "Смартфон",
            description: "Последняя модель с отличными характеристиками.",
            date: new Date('2023-02-15'),
            image
        },
        {
            setModalActive: setModalActive,
            price: "200",
            title: "Ноутбук",
            description: "Мощный ноутбук для работы и игр.",
            date: new Date('2024-03-15'), // 15th March 2024
            image
        }

    ];


    return (
        <div className={styles.monitoring}>
            <section className={styles.monitoring__header}>
                <h2 className={styles.monitoring__title}>История заказов</h2>
                <div className={styles.monitoring__body}>
                    <div className={styles.monitoring__category}>
                        <SelectButton
                            text="Текущие"
                            action={selectedButton}
                            onClickAction={handleToggle}
                        />
                        <SelectButton
                            text="Выполненные"
                            action={!selectedButton}
                            onClickAction={handleToggle}
                        />
                    </div>
                    <div className={styles.monitoring__filter}>
                        <p className={styles.monitoring__title}>Фильтр по дате принятия заказа</p>
                        <div>
                            <DateComponent visibleDate={false}/>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.monitoring__cards}>
                {data.map((history => (
                    <HistoryCard {...history}/>
                )))}
            </section>
        </div>
    )
}

export default History