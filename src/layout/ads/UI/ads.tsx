import {useState} from "react";
import SelectButton from "@components/button/UI/selectButton.tsx";
import styles from "./ads.module.scss";
import Equipment from "@layout/equipment/UI/equipment.tsx";
import Order from "@layout/order/UI/order.tsx";
import Button from "@components/button/UI/button.tsx";

const Ads = () => {
    const [selectedButton, setSelectedButton] = useState('equipment');
    const [count, setCount] = useState<number>(0);
    const handleButtonClick = (buttonType: string) => {
        setSelectedButton(buttonType);
    };
    const handleIncrement = () => {
        setCount(count + 1)
    }
    return (
        <div>
            {count < 1 ?
                (
                    <div className={styles.content}>
                        <p>🙂</p>
                        <div className={styles.content__body}>
                            <div className={styles.content__text}>
                                <p className={styles.content__title}>Хмм...</p>
                                <p className={styles.content__title}>У вас еще нет объявлений </p>
                            </div>
                            <p className={styles.content__description}>
                                Давайте создадим объявление
                                и разместим на маркетплейсе
                            </p>
                            <div className={styles.content__button}>
                                <Button onClick={handleIncrement} text={'Создать'}/>
                            </div>
                        </div>

                    </div>
                ) :
                (
                    <>
                        <div className={styles.category}>
                            <h3 className={styles.form__title}>Тип объявления</h3>
                            <div className={styles.form__category}>
                                {/*category ads*/}
                                <SelectButton
                                    text="Оборудования"
                                    action={selectedButton === 'equipment'}
                                    onClickAction={() => handleButtonClick('equipment')}
                                />
                                <SelectButton
                                    text="Заказ"
                                    action={selectedButton === 'order'}
                                    onClickAction={() => handleButtonClick('order')}
                                />
                                {/*category ads*/}
                            </div>
                        </div>
                        {selectedButton == 'equipment' ? (<Equipment/>) : (<Order/>)}
                    </>
                )}

        </div>
    )
}

export default Ads