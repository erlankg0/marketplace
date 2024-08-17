import React, {useEffect, useState} from "react";

import Logo from "@components/logo/UI/logo.tsx";
import SelectButton from "@components/button/UI/selectButton.tsx";
import ListEmployers from "@layout/Organization/employers/list/UI/list.tsx";
import Create from "@layout/Organization/create/UI/create.tsx";

import {getOrganization, getOrganizationOrdersByStage} from "@network/organization/admin.ts";
import {IOrganizationData, IOrganizationOrders} from "@network/interfaces/organization/organization.tsx";

import styles from "./admin.module.scss";
import {formatDate} from "@utils/formDate.ts";
import HistoryCard from "@components/history/UI/history.tsx";
import {Modal} from "antd";
import Alert from "@components/alert/UI/alert.tsx";

const Admin: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<'current' | 'completed' | 'staffers'>('current');
    const [organization, setOrganization] = useState<IOrganizationData>();
    const [orders, setOrders] = useState<IOrganizationOrders>();
    const LOCAL_STORAGE_KEY = 'adminComponentSelectedButton';

    const [success, setSuccess] = useState<boolean>(false); // Состояние нового модального окна для подтверждения выхода
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>()
    const handleToggleSuccess = () => {
        setSuccess(!success);
    }
    const handleToggleError = () => {
        setError(!error);
    }

    useEffect(() => {
        const savedButton = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedButton) {
            setSelectedButton(savedButton as 'current' | 'completed' | 'staffers');
        }
    }, []);

    const handleGetOrganization = async () => {
        try {
            const response = await getOrganization();
            if ('status' in response) {
                setMessage(`${response.message}, код: ${response.status}`);
                handleToggleError();

            } else {
                setOrganization(response)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handleGetOrdersByStage = async () => {
        if (selectedButton == 'current' || selectedButton == 'completed') {
            const response = await getOrganizationOrdersByStage(selectedButton);
            if ('status' in response) {
                setMessage(`${response.message}, код: ${response.status}`);
                handleToggleError();
            } else {
                setOrders(response);
            }

        }
    }


    useEffect(() => {
        handleGetOrganization();
    }, [])

    useEffect(() => {
        handleGetOrdersByStage();
    }, [selectedButton])

    const handleButtonClick = (button: 'current' | 'completed' | 'staffers') => {
        setSelectedButton(button);
        localStorage.setItem(LOCAL_STORAGE_KEY, button);
        console.log(orders)
    };


    return (
        <>
            {organization ? (
                <section className={styles.admin}>
                    <div className={styles.admin__header}>
                        {!organization.imagePath ? (
                            <Logo/>
                        ) : (
                            <div className={styles.admin__logo}>
                                <img src={organization.imagePath}/>
                            </div>
                        )}
                        <div className={styles.admin__info}>
                            <h1 className={styles.admin__title}>{organization.name}</h1>
                            <p className={styles.admin__description}>{organization.description}</p>
                        </div>
                        <div>
                            <p className={styles.admin__created}>Создан: {formatDate(organization.createdAt)}</p>
                        </div>
                    </div>
                    <div>
                        <div className={styles.row}>
                            <SelectButton
                                text="Текущие заказы"
                                action={selectedButton === 'current'}
                                onClickAction={() => handleButtonClick('current')}
                            />
                            <SelectButton
                                text="Завершенные заказы"
                                action={selectedButton === 'completed'}
                                onClickAction={() => handleButtonClick('completed')}
                            />
                            <SelectButton
                                text="Список сотрудников"
                                action={selectedButton === 'staffers'}
                                onClickAction={() => handleButtonClick('staffers')}
                            />
                        </div>

                        <div className={styles.column}>
                            {selectedButton === 'completed' && (
                                <>
                                    {orders && orders.orders.map((history, index) => (
                                        <HistoryCard key={index} description={history.description} price={history.price}
                                                     title={history.name} image={history.imageUrl} id={history.id}/>
                                    ))}
                                </>
                            )}

                            {selectedButton === 'current' && (
                                <>
                                    {orders && orders.orders.map((history, index) => (
                                        <HistoryCard accept={true} key={index} description={history.description}
                                                     price={history.price} title={history.name} image={history.imageUrl}
                                                     id={history.id}/>
                                    ))}
                                </>
                            )}

                            {selectedButton === 'staffers' && (
                                <ListEmployers/>
                            )}

                        </div>
                    </div>
                    <Modal open={success} footer={null} centered={true}>
                        <Alert setModalActive={handleToggleSuccess} success={success}/>
                    </Modal>
                    <Modal open={error} footer={null} centered={true}>
                        <Alert setModalActive={handleToggleError} error={error} text={message}/>
                    </Modal>
                </section>
            ) : (<Create/>)}
        </>
    );
}

export default Admin;