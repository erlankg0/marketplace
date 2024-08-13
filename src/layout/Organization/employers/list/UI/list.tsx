import styles from "./list.module.scss";
import {NavLink} from "react-router-dom";
import {getEmployers} from "@network/employee/employee.ts";
import {useEffect, useState} from "react";
import {IEmployee} from "@network/interfaces/employee/employee.ts";

const ListEmployers = () => {
    const [employers, setEmployers] = useState<IEmployee[]>([])

    const handleGetEmployers = () => {
        try {
            getEmployers().then(response=> setEmployers(response.data))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handleGetEmployers();
        return setEmployers([])
    }, [])

    return (
        <section>
            <table className={styles.table}>
                <thead>
                <tr className={styles.table__header}>
                    <th className={styles.table__th}>ФИО</th>
                    <th className={styles.table__th}>Почта</th>
                    <th className={styles.table__th}>Заказы</th>
                    <th className={styles.table__th}>Должность</th>
                </tr>
                </thead>
                <>
                    {employers.map((employer) => (
                        <>
                            <tbody className={styles.table__body}>

                            <tr className={styles.table__column}>
                                <td>
                                    <tbody className={styles.table__body}>

                                    <tr className={styles.table__column}>
                                        <td className={`${styles.table__title} ${styles.table__paragraph}`}>
                                            <NavLink to={`detail-employer/${employer.id}`}>{employer.fullName}</NavLink>
                                        </td>
                                    </tr>

                                    <tr className={styles.table__column}>
                                        <td className={styles.table__paragraph}>
                                            {employer.email}
                                        </td>
                                    </tr>

                                    <tr className={styles.table__column}>
                                        <td>
                                            <ul>
                                                {employer.orders && employer.orders.map((order) => (
                                                    <li className={`${styles.table__title} ${styles.table__paragraph}`}>Заказ
                                                        №{order}</li>
                                                ))}
                                            </ul>
                                        </td>
                                    </tr>

                                    <tr className={styles.table__column}>
                                        <td className={styles.table__paragraph}>
                                            {employer.position}
                                        </td>
                                    </tr>

                                    </tbody>
                                </td>
                            </tr>
                            </tbody>
                        </>
                    ))}

                </>

            </table>

        </section>
    )
}

export default ListEmployers;