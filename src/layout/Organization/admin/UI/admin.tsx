import Logo from "@components/logo/UI/logo.tsx";
import styles from "./admin.module.scss";
import SelectButton from "@components/button/UI/selectButton.tsx";
import React, {useState} from "react";
import HistoryCard from "@components/history/UI/history.tsx";
import {IHistoryCard} from "@components/history/interface.ts";
import image from "@assets/images/nitki.jpg";
import {IOrganization} from "@layout/Organization/interface.ts";

const Admin: React.FC<IOrganization> = ({setModalActive}) => {
    const [selectedButton, setSelectedButton] = useState<'current' | 'done' | 'staffers'>('current');
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
    return (
        <section className={styles.admin}>
            <div className={styles.admin__header}>
                <Logo/>
                <div className={styles.admin__info}>
                    <h1 className={styles.admin__title}>SmartTrade</h1>
                    <p className={styles.admin__description}>Мониторинг и управление швейным производством</p>
                </div>
                <div>
                    <p className={styles.admin__created}>Создан 10 апреля 2024</p>
                </div>
            </div>
            <div>
                <div className={styles.row}>
                    <SelectButton
                        text="Текущие заказы"
                        action={selectedButton == 'current'}
                        onClickAction={() => setSelectedButton('current')}
                    />
                    <SelectButton
                        text="Заверщеные заказы"
                        action={selectedButton == 'done'}
                        onClickAction={() => setSelectedButton('done')}
                    />
                    <SelectButton
                        text="Список сотрудников"
                        action={selectedButton == 'staffers'}
                        onClickAction={() => setSelectedButton('staffers')}
                    />
                </div>
                <div className={styles.column}>
                    {data.map((history, index) => (
                        <HistoryCard key={index} {...history} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Admin