import styles from "./modal.module.scss";
import {IModal} from "@components/modal/interface.ts";
import closeImage from "@assets/icon/close.svg";

const Modal = <T extends object>({active, setModalActive, component: Component, componentProps}: IModal<T>) => {
    return (
        <div className={active ? `${styles.modal} ${styles.active}` : styles.modal}
             onClick={() => setModalActive(false)}>

            <div className={styles.modal__content} onClick={event => event.stopPropagation()}>
                <div className={styles.modal__content__header}>
                    <img src={closeImage} alt={'close button'} onClick={() => setModalActive(false)}/>
                </div>
                <Component {...componentProps as T} />
            </div>
        </div>
    );
};

export default Modal;
