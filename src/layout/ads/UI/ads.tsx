import {useState} from "react";
import SelectButton from "@components/button/UI/selectButton.tsx";
import styles from "./ads.module.scss";
import Equipment from "@layout/equipment/UI/equipment.tsx";
import Order from "@layout/order/UI/order.tsx";
import Service from "@layout/service/UI/service.tsx";
import Create from "@components/create/UI/create.tsx";

const Ads = () => {
    const [selectedButton, setSelectedButton] = useState<'equipment' | 'order' | 'service'>('equipment');
    const [count, setCount] = useState<number>(0);
    const handleButtonClick = (buttonType: 'equipment' | 'order' | 'service') => {
        setSelectedButton(buttonType);
    };
    const handleIncrement = () => {
        setCount(count + 1)
    }
    return (
        <>
            {count < 1 ?
                (
                    <Create count={count} increment={handleIncrement}/>
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

                                <SelectButton
                                    text="Услуги"
                                    action={selectedButton === 'service'}
                                    onClickAction={() => handleButtonClick('service')}
                                />
                                {/*category ads*/}
                            </div>
                        </div>
                        {selectedButton == 'service' && (<Service/>)}
                        {selectedButton == 'equipment' && (<Equipment/>)}
                        {selectedButton == 'order' && (<Order/>)}
                    </>
                )}

        </>
    )
}

export default Ads