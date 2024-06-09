import styles from "./cardModal.module.scss";
import Seller from "@components/seller/UI/seller.tsx";


const CardModal = () => {
    return (
        <section className={styles.card}>
            <div>
                Slide
            </div>
            <div>
                <div>
                    <p>Маркетплейс/Инвентарь</p>
                    <h3>Профессиональные спицы для вязания</h3>
                    <p>1000 сом</p>
                </div>
                <div className={'line'}></div>
                <div>
                    <div>
                        <Seller/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CardModal;