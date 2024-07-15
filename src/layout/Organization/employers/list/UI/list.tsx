import styles from "./list.module.scss";

const ListEmployers = () => {
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
                <tbody className={styles.table__body}>

                <tr className={styles.table__column}>
                    <td>
                        <tbody className={styles.table__body}>

                        <tr className={styles.table__column}>
                            <td className={`${styles.table__title} ${styles.table__paragraph}`}>
                                Олейников Кирилл Кириллович
                            </td>
                        </tr>

                        <tr className={styles.table__column}>
                            <td className={styles.table__paragraph}>
                                era.ab.02@gmail.com
                            </td>
                        </tr>

                        <tr className={styles.table__column}>
                            <td>
                                <ul>
                                    <li className={`${styles.table__title} ${styles.table__paragraph}`}>Заказ №234</li>
                                    <li className={`${styles.table__title} ${styles.table__paragraph}`}>Заказ №234</li>
                                    <li className={`${styles.table__title} ${styles.table__paragraph}`}>Заказ №234</li>
                                    <li className={`${styles.table__title} ${styles.table__paragraph}`}>Заказ №234</li>
                                </ul>
                            </td>
                        </tr>

                        <tr className={styles.table__column}>
                            <td className={styles.table__paragraph}>
                                Утюжник
                            </td>
                        </tr>

                        </tbody>
                    </td>
                </tr>
                </tbody>

                <tbody className={styles.table__body}>
                <tr className={styles.table__column}>
                    <td>
                        <tbody className={styles.table__body}>

                        <tr className={styles.table__column}>
                            <td className={`${styles.table__title} ${styles.table__paragraph}`}>
                                Эрлан Абдраимов
                            </td>
                        </tr>

                        <tr className={styles.table__column}>
                            <td className={styles.table__paragraph}>
                                era.ab.02@gmail.com
                            </td>
                        </tr>

                        <tr className={styles.table__column}>
                            <td>
                                <ul>
                                    <li className={`${styles.table__title} ${styles.table__paragraph}`}>Заказ №231</li>
                                    <li className={`${styles.table__title} ${styles.table__paragraph}`}>Заказ №233</li>
                                    <li className={`${styles.table__title} ${styles.table__paragraph}`}>Заказ №235</li>
                                    <li className={`${styles.table__title} ${styles.table__paragraph}`}>Заказ №23</li>
                                </ul>
                            </td>
                        </tr>

                        <tr className={styles.table__column}>
                            <td className={styles.table__paragraph}>
                                Швея
                            </td>
                        </tr>

                        </tbody>
                    </td>
                </tr>
                </tbody>

                <tbody className={styles.table__body}>
                <tr className={styles.table__column}>
                    <td>
                        <tbody className={styles.table__body}>

                        <tr className={styles.table__column}>
                            <td className={`${styles.table__title} ${styles.table__paragraph}`}>
                                Даниель Абдраимов
                            </td>
                        </tr>

                        <tr className={styles.table__column}>
                            <td className={styles.table__paragraph}>
                                era.ab.02@gmail.com
                            </td>
                        </tr>

                        <tr className={styles.table__column}>
                            <td>
                                <ul>
                                    <li className={`${styles.table__title} ${styles.table__paragraph}`}>Заказ №231</li>
                                </ul>
                            </td>
                        </tr>

                        <tr className={styles.table__column}>
                            <td className={styles.table__paragraph}>
                                Швея
                            </td>
                        </tr>

                        </tbody>
                    </td>
                </tr>
                </tbody>

            </table>

        </section>
    )
}

export default ListEmployers;