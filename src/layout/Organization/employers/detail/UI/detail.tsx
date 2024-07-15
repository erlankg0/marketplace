import Person from "@components/person/UI/person.tsx";
import {useState} from "react";
import SelectButton from "@components/button/UI/selectButton.tsx";
import OrderEmployer from "@components/employers/order/UI/order.tsx"
const DetailEmployees = () => {
    const [modal, setModal] = useState<boolean>(false)
    const [selectedButton, setSelectedButton] = useState<'current' | 'finish' | 'orders'>('current');

    return (
        <section>
            <Person fullName={'Эрлан Абдраимов'} module={modal} setModal={setModal}/>
            <div className={'row'}>
                <SelectButton
                    text="Текущие заказы"
                    action={selectedButton == 'current'}
                    onClickAction={() => setSelectedButton('current')}
                />
                <SelectButton
                    text="Снять с сотрудника заказ"
                    action={selectedButton == 'finish'}
                    onClickAction={() => setSelectedButton('finish')}
                />
                <SelectButton
                    text="Заказы сотрудника"
                    action={selectedButton == 'orders'}
                    onClickAction={() => setSelectedButton('orders')}
                />
            </div>
            <div>
                <OrderEmployer/>
            </div>
        </section>
    )
}

export default DetailEmployees