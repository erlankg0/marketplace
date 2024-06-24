import React from "react";
import {useDateSelect} from "react-ymd-date-select";
import {Select} from "antd";
import styles from "./date.module.scss";

interface CustomDateSelectProps {
    onChange: (value: string) => void;
    value: string,
    visibleDate?: boolean
}

const {Option} = Select
const CustomDateSelect = (props: CustomDateSelectProps) => {
    const dateSelect = useDateSelect(props.value, props.onChange);
    const monthNames = [
        {value: "01", label: "Январь"},
        {value: "02", label: "Февраль"},
        {value: "03", label: "Март"},
        {value: "04", label: "Апрель"},
        {value: "05", label: "Май"},
        {value: "06", label: "Июнь"},
        {value: "07", label: "Июль"},
        {value: "08", label: "Август"},
        {value: "09", label: "Сентябрь"},
        {value: "10", label: "Октябрь"},
        {value: "11", label: "Ноябрь"},
        {value: "12", label: "Декабрь"}
    ];

    return (
        <div className={styles.date}>
            <div className={styles.date__field}>
                {props.visibleDate && (
                    <label className={styles.date__label}>
                        День
                    </label>
                )}

                <Select value={dateSelect.dayValue} onChange={dateSelect.onDayChange} placeholder={'День'}>
                    {dateSelect.dayOptions.map((dayOption) => (
                        <option key={dayOption.value} value={dayOption.value}>
                            {dayOption.label}
                        </option>
                    ))}
                </Select>
            </div>

            <div className={styles.date__field}>
                {props.visibleDate &&
                    (
                        <label className={styles.date__label}>
                            Месяц
                        </label>
                    )
                }

                <Select
                    value={dateSelect.monthValue}
                    onChange={dateSelect.onMonthChange}
                    placeholder={'Месяц'}
                >
                    {dateSelect.monthOptions.map((monthOption) => (
                        <Option key={monthOption.value} value={monthOption.value}>
                            {monthNames[+monthOption.value - 1].label}
                        </Option>
                    ))}
                </Select>

            </div>
            <div className={styles.date__field}>
                {props.visibleDate && (
                    <label className={styles.date__label}>
                        Год
                    </label>
                )}
                <Select value={dateSelect.yearValue} onChange={dateSelect.onYearChange} placeholder={'Год'}>
                    <Option selected={true}>Год</Option>
                    {dateSelect.yearOptions.map((yearOption) => (
                        <Option key={yearOption.value} value={yearOption.value}>
                            {yearOption.label}
                        </Option>
                    ))}
                </Select>
            </div>
        </div>
    );
}

const DateSelect: React.FC<{ visibleDate?: boolean, date: string, setDate: (date: string) => void }> = ({
                                                                                                            visibleDate,
                                                                                                            date,
                                                                                                            setDate
                                                                                                        }) => {
    return (
        <div>
            <CustomDateSelect visibleDate={visibleDate} value={date} onChange={setDate}/>
        </div>
    );
}

export default DateSelect;
