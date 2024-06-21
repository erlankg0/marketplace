import React, {useState} from "react";
import {useDateSelect} from "react-ymd-date-select";
import {Select} from "antd";
import styles from "./date.module.scss";

interface CustomDateSelectProps {
    onChange: (value: string) => void;
    value: string,
    visibleDate?: boolean
}

const CustomDateSelect = (props: CustomDateSelectProps) => {
    const dateSelect = useDateSelect(props.value, props.onChange);

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
                        <option key={monthOption.value} value={monthOption.value}>
                            {monthOption.label}
                        </option>
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
                    {dateSelect.yearOptions.map((yearOption) => (
                        <option key={yearOption.value} value={yearOption.value}>
                            {yearOption.label}
                        </option>
                    ))}
                </Select>
            </div>
        </div>
    );
}

const DateSelect: React.FC<{ visibleDate?: boolean }> = ({visibleDate}) => {
    const [date, setDate] = useState("");

    return (
        <div>
            <CustomDateSelect visibleDate={visibleDate} value={date} onChange={setDate}/>
        </div>
    );
}

export default DateSelect;
