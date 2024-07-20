import React from "react";
import Person from "@components/person/UI/person.tsx";
import {useState} from "react";
import SelectButton from "@components/button/UI/selectButton.tsx";
import OrderEmployer from "@components/employers/order/UI/order.tsx"
import styles from "./detail.module.scss";
import Left from "@components/left/UI/left.tsx";
import {IOrganization} from "@layout/Organization/interface.ts";
import {IHistoryCard} from "@components/history/interface.ts";
import image from "@assets/images/nitki.jpg";
import HistoryCard from "@components/history/UI/history.tsx";

const DetailEmployees: React.FC<IOrganization> = ({setModalActive}) => {
    const [modal, setModal] = useState<boolean>(false)
    const [selectedButton, setSelectedButton] = useState<'current' | 'finish' | 'orders'>('current');
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
        <section className={styles.detail}>
            <div className={styles.detail__header}>
                <Left/>
                <Person image={''} fullName={'Эрлан Абдраимов'} module={modal} setModal={setModal}/>
                <div className={'row'}>
                    <SelectButton
                        text="Текущие заказы"
                        action={selectedButton == 'current'}
                        onClickAction={() => setSelectedButton('current')}
                    />
                    <SelectButton
                        text="Снять с сотрудника заказ"
                        action={selectedButton == 'finish'}
                        onClickAction={() => setSelectedButton('finish')}
                    />
                    <SelectButton
                        text="Заказы сотрудника"
                        action={selectedButton == 'orders'}
                        onClickAction={() => setSelectedButton('orders')}
                    />
                </div>
            </div>

            <div className={styles.detail__items}>
                <OrderEmployer/>
                <OrderEmployer/>
                <OrderEmployer/>
                {data.map((item) => (
                    <HistoryCard {...item}/>
                ))}
            </div>
        </section>
    )
}

export default DetailEmployees