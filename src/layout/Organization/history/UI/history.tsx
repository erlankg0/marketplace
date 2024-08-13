import styles from "@layout/Organization/styles/styles.module.scss";
import {Select} from "antd";
import SelectButton from "@components/button/UI/selectButton.tsx";
import React, {useState} from "react";
import DateComponent from "@components/date/UI/date.tsx";
import {IOrganization} from "@layout/Organization/interface.ts";
import style from "./history.module.scss";

const History: React.FC<IOrganization> = () => {
    const [selectedButton, setSelectedButton] = useState<'current' | 'done' | 'processing'>('current');
    const [selectCategory, setSelectCategory] = useState<string>('')
    const [date, setDate] = useState<string>("");

    const handleChangeCategory = (value: string) => {
        setSelectCategory(value);
    }

    return (
        <section className={style.history}>
            <div className={styles.field}>
                <label htmlFor={'employer'} className={styles.field__label}>Сотрудник</label>
                <Select
                    id={'employer'}
                    maxCount={1}
                    value={selectCategory}
                    onChange={handleChangeCategory}
                    placeholder={'Выберите размер'}
                    options={[
                        {value: 'Цифры', label: 'Цифры'},
                        {value: 'Буквы', label: 'Буквы'},
                    ]}
                />
            </div>
            <div className={'row'} style={{width: "100%", justifyContent: "space-between"}}>
                <div className={'row'}>
                    <SelectButton
                        text={'Текущие заказы'}
                        action={selectedButton == 'current'}
                        onClickAction={() => setSelectedButton('current')}
                    />
                    <SelectButton
                        text={'Завершенные заказы'}
                        action={selectedButton == 'done'}
                        onClickAction={() => setSelectedButton('done')}
                    />
                    <SelectButton
                        text={'Рабочий статус заказов'}
                        action={selectedButton == 'processing'}
                        onClickAction={() => setSelectedButton('processing')}
                    />
                </div>
                <div className={style.history__row}>
                    <p className={style.history__text}>Фильтр по дате принятия заказа</p>
                    <DateComponent date={date} setDate={setDate} visibleDate={false}/>
                </div>
            </div>

            <section className={style.history__column}>
                {/*{data.map((item) => (<HistoryCard {...item}/>))}*/}
            </section>

        </section>
    )
}

export default History;