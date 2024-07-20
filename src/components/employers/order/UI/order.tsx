import styles from "./order.module.scss"
import Deadline from "@components/deadline/UI/deadline.tsx";
import Employer from "@components/employer/UI/employer.tsx";
import ButtonComponent from "@components/button/UI/button.tsx";

const OrderEmployer = () => {
    return (
        <div className={styles.order}>
            <div className={styles.order__header}>
                <div>
                    <div>
                        <h2 className={styles.order__number}>Заказ №234</h2>
                        <p className={styles.order__title}>Сшить костюм</p>
                        <p className={styles.order__description}>Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor
                            incididunt...</p>
                    </div>
                    <p className={styles.order__price}>1000 сом</p>
                </div>
                <div>
                    <Deadline date={new Date()} text={'Дата'}/>
                </div>
            </div>
            <div className={'line'}></div>
            <div>
                <h2>Сотрудники</h2>
                <div className={'row'}>
                    <Employer/>
                    <Employer/>
                    <Employer/>
                </div>
            </div>
            <div className={'line'}></div>
            <div>
                <h2>Сотрудники</h2>
                <div className={'row'}>
                    <Employer/>
                    <Employer/>
                    <Employer/>
                </div>
            </div>
            <div className={'line'}></div>
            <div className={styles.order__button}>
                <ButtonComponent text={'Снять с сотрудника заказ'}/>
            </div>
        </div>
    )
}

export default OrderEmployer