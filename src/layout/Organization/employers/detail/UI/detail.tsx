import {useEffect, useState} from "react";
import {useParams} from "react-router";

import Person from "@components/person/UI/person.tsx";
import SelectButton from "@components/button/UI/selectButton.tsx";
import OrderEmployer from "@components/employers/order/UI/order.tsx"
import Left from "@components/left/UI/left.tsx";

import {IEmployeeDetail} from "@network/interfaces/employee/employee.ts";

import styles from "./detail.module.scss";
import {getEmployeeOrdersByState} from "@network/employee/employee.ts";

const DetailEmployees = () => {
    const [selectedButton, setSelectedButton] = useState<'current' | 'completed' | 'orders'>('current');

    const [data, setData] = useState<IEmployeeDetail>();

    const {id} = useParams();
    const LOCAL_STORAGE_KEY = 'employeeDetail';

    useEffect(() => {
        const savedButton = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedButton) {
            setSelectedButton(savedButton as 'current' | 'completed' | 'orders');
        }
    }, []);

    const handleGetOrders = () => {
        if ((selectedButton == 'completed' || selectedButton == 'current') && id != undefined) {
            getEmployeeOrdersByState(selectedButton, id)
                .then((response) => setData(response.data))
                .catch((error) => console.error(error))
        }
    }

    useEffect(handleGetOrders, [id, selectedButton]);


    return (
        <section className={styles.detail}>
            {data ?
                (<>
                    <div className={styles.detail__header}>
                        <Left/>
                        <Person changePhoto={false} image={''} fullName={data.employeeFullName}/>
                        <div className={'row'}>
                            <SelectButton
                                text="Текущие заказы"
                                action={selectedButton == 'current'}
                                onClickAction={() => setSelectedButton('current')}
                            />
                            <SelectButton
                                text="Снять с сотрудника заказ"
                                action={selectedButton == 'completed'}
                                onClickAction={() => setSelectedButton('completed')}
                            />
                            <SelectButton
                                text="Заказы сотрудника"
                                action={selectedButton == 'orders'}
                                onClickAction={() => setSelectedButton('orders')}
                            />
                        </div>
                    </div>
                    <div className={styles.detail__items}>
                        {data && data.orders.map((order) => (<OrderEmployer {...order}/>))}
                    </div>
                </>) :
                (<h1>Ничего нету</h1>)
            }

        </section>
    )
}

export default DetailEmployees