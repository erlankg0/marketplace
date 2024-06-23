import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SelectButton from "@components/button/UI/selectButton.tsx";
import DateComponent from "@components/date/UI/date.tsx";
import HistoryCard from "@components/history/UI/history.tsx";

import { IHistory } from "@layout/MonitoringHistory/interface.ts";
import image from "@assets/images/nitki.jpg";
import styles from "./monitoring.module.scss";
import {IHistoryCard} from "@components/history/interface.ts";

const History: React.FC<IHistory> = ({ setModalActive }) => {
    const navigate = useNavigate();
    const [date, setDate] = useState<string>("");

    const data: IHistoryCard[] = [
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
            date: new Date('2024-03-15'),
            image
        },
        // остальные данные...
    ];

    const [filteredData, setFilteredData] = useState<IHistoryCard[]>(data);

    useEffect(() => {
        if (date) {
            setFilteredData(data.filter(item => item.date.toISOString().split('T')[0] === date));
        } else {
            setFilteredData(data);
        }
    }, [date, data]);

    return (
        <div className={styles.monitoring}>
            <section className={styles.monitoring__header}>
                <h2 className={styles.monitoring__title}>История заказов</h2>
                <div className={styles.monitoring__body}>
                    <div className={styles.monitoring__category}>
                        <SelectButton
                            text="Текущие"
                            action={false}
                            onClickAction={() => {
                                navigate('/current-orders');
                            }}
                        />
                        <SelectButton
                            text="Выполненные"
                            action={true}
                        />
                    </div>
                    <div className={styles.monitoring__filter}>
                        <p className={styles.monitoring__title}>Фильтр по дате принятия заказа</p>
                        <div>
                            <DateComponent date={date} setDate={setDate} visibleDate={false} />
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.monitoring__cards}>
                {filteredData.map((history, index) => (
                    <HistoryCard key={index} {...history} />
                ))}
            </section>
        </div>
    )
}

export default History;
