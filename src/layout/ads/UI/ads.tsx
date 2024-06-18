import {useState} from "react";
import SelectButton from "@components/button/UI/selectButton.tsx";
import styles from "./ads.module.scss";
import Equipment from "@layout/equipment/UI/equipment.tsx";
import Order from "@layout/order/UI/order.tsx";


const Ads = () => {
    const [selectedButton, setSelectedButton] = useState('equipment');

    const handleButtonClick = (buttonType: string) => {
        setSelectedButton(buttonType);
    };

    return (
        <div>
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
        </div>
    )
}

export default Ads