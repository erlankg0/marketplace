import {Radio} from "antd";

const Ads = ()=>{
    return(
        <div>
            <form>
                <h2>Тип объявления</h2>
                <Radio.Group>
                    <Radio>Оборудования</Radio>
                    <Radio>Заказ</Radio>
                </Radio.Group>
            </form>

        </div>
    )
}

export default Ads