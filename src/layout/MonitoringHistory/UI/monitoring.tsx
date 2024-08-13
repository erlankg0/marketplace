import {useState} from "react";
import {useNavigate} from "react-router-dom";

import SelectButton from "@components/button/UI/selectButton.tsx";
import DateComponent from "@components/date/UI/date.tsx";
import styles from "./monitoring.module.scss";

const History = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState<string>("");

    // const [filteredData, setFilteredData] = useState<IHistoryCard[]>();

    // useEffect(() => {
    //     if (date) {
    //         const selectedDate = new Date(date);
    //         const selectedYear = selectedDate.getFullYear();
    //         const selectedMonth = selectedDate.getMonth();
    //
    //         setFilteredData(data.filter(item => {
    //             const itemDate = new Date(item.date);
    //             return itemDate.getFullYear() === selectedYear && itemDate.getMonth() === selectedMonth;
    //         }));
    //     } else {
    //         setFilteredData(data);
    //     }
    // }, [date]);

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
                                navigate('/marketplace/current-orders');
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
                {/*{filteredData.map((history, index) => (*/}
                {/*    <HistoryCard key={index} {...history} />*/}
                {/*))}*/}
            </section>
        </div>
    )
}

export default History;