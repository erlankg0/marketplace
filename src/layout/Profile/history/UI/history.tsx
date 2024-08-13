import styles from "@layout/Organization/employers/list/UI/list.module.scss";
import Status from "@components/status/UI/status.tsx";
import {formatDate} from "@utils/formDate.ts";
import {useEffect, useState} from "react";
import SelectButton from "@components/button/UI/selectButton.tsx";
import {data} from "@layout/Profile/history/data.ts";
import {getOrderHistoryUser} from "@network/profile/profile.ts";

const HistoryList = () => {
    const [selectedButton, setSelectedButton] = useState<'current' | 'completed'>('current');
    const [items, setItems] = useState(data);

    const LOCAL_STORAGE_KEY = 'historyListSelectedButton';

    useEffect(() => {
        const savedButton = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedButton) {
            setSelectedButton(savedButton as 'current' | 'completed');
        }
    }, []);

    const handleButtonClick = (buttonType: 'current' | 'completed') => {
        setSelectedButton(buttonType);
        localStorage.setItem(LOCAL_STORAGE_KEY, buttonType);
        setItems(data);
    };

    const handleGetHistory = async () => {
        try {
            const response = await getOrderHistoryUser(selectedButton);
            console.log(response)
        } catch (error) {
            new Error(`${error}`)
        }
    }

    useEffect(() => {
        handleGetHistory();
    }, [selectedButton])

    return (
        <section className={styles.table__column}>
            <div className={'row'}>
                <SelectButton
                    text="Активные"
                    action={selectedButton === 'current'}
                    onClickAction={() => handleButtonClick('current')}
                />
                <SelectButton
                    text="Завершеные заказы"
                    action={selectedButton === 'completed'}
                    onClickAction={() => handleButtonClick('completed')}
                />
            </div>
            {selectedButton == 'current' && (
                <table className={styles.table}>
                    <thead>
                    <tr className={styles.table__header}>
                        <th className={styles.table__th}>Заказ</th>
                        <th className={styles.table__th}>Сумма</th>
                        <th className={styles.table__th}>Статус</th>
                        <th className={styles.table__th}>Дата заверщения</th>
                    </tr>
                    </thead>
                    {items['current'].map(item => (
                        <tbody className={styles.table__body}>

                        <tr className={styles.table__column}>
                            <tbody className={styles.table__body}>

                            <tr className={styles.table__column}>
                                <td className={`${styles.table__title} ${styles.table__paragraph}`}>
                                    {item.order}
                                </td>
                            </tr>

                            <tr className={styles.table__column}>
                                <td className={styles.table__paragraph}>
                                    {item.price} сом
                                </td>
                            </tr>

                            <tr className={styles.table__column}>
                                <td>
                                    <Status status={item.status}/>
                                </td>
                            </tr>

                            <tr className={styles.table__column}>
                                <td className={styles.table__paragraph}>
                                    {formatDate(item.date)}
                                </td>
                            </tr>

                            </tbody>

                        </tr>
                        </tbody>
                    ))}

                </table>
            )}
            {selectedButton == 'completed' && (
                <table className={styles.table}>
                    <thead>
                    <tr className={styles.table__header}>
                        <th className={styles.table__th}>Заказ</th>
                        <th className={styles.table__th}>Сумма</th>
                        <th className={styles.table__th}>Дата заверщения</th>
                    </tr>
                    </thead>
                    {items['done'].map(item => (
                        <tbody className={styles.table__body}>

                        <tr className={styles.table__column}>
                            <td>
                                <tbody className={styles.table__body}>

                                <tr className={styles.table__column}>
                                    <td className={`${styles.table__title} ${styles.table__paragraph}`}>
                                        {item.order}
                                    </td>
                                </tr>

                                <tr className={styles.table__column}>
                                    <td className={styles.table__paragraph}>
                                        {item.price} сом
                                    </td>
                                </tr>

                                <tr className={styles.table__column}>
                                    <td className={styles.table__paragraph}>
                                        {formatDate(item.date)}
                                    </td>
                                </tr>

                                </tbody>
                            </td>
                        </tr>
                        </tbody>
                    ))}

                </table>
            )}

        </section>

    )
}

export default HistoryList