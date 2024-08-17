import React, {ChangeEvent, useState} from "react";
import Alert from "@components/alert/UI/alert.tsx";
import ButtonComponent from "@components/button/UI/button.tsx";
import {Modal} from "antd";

import {postImageProfile} from "@network/profile/profile.ts";
import image from "@assets/emoji/sucess.jpeg";
import styles from "./change.module.scss";
import {IAlert} from "@components/alert/interface.ts";

const Change: React.FC<IAlert> = ({setModalActive}) => {
    const [file, setFile] = useState<File | null>(null);
    const [success, setSuccess] = useState<boolean>(false); // Состояние нового модального окна для подтверждения выхода
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>()
    const handleToggleSuccess = () => {
        setSuccess(!success);
    }
    const handleToggleError = () => {
        setError(!error);
    }
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleChangePhoto = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file); // Ensure 'file' is the correct key expected by your backend
            const response = await postImageProfile(formData);
            if ('status' in response) {
                setMessage(`${response.message}, код: ${response.status}`)
                handleToggleError()
            } else {
                setMessage(response.message);
                setModalActive(false);
                handleToggleSuccess()
            }
        }

    };


    return (
        <div className={styles.change}>
            <div className={styles.change__head}>
                <img src={image} alt="emoji success"/>
            </div>
            <div className={styles.change__text}>
                <h2 className={styles.change__title}>Изменить фото профиля?</h2>
                <p className={styles.change__description}>Загрузите фотографию из своей галереи</p>
            </div>
            <div className={styles.change__upload}>
                <label htmlFor="file" className={styles.label}>+ Загрузить файл</label>
                <input id="file" type="file" onChange={handleFileChange}/>
                <p className={styles.change__description}>Формат JPG, JPEG, PNG</p>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.button}>
                <ButtonComponent text="Сохранить" onClick={handleChangePhoto}/>
            </div>

            <Modal open={success} footer={null} centered={true}>
                <Alert setModalActive={handleToggleSuccess} text={message} success={success}/>
            </Modal>
            <Modal open={error} footer={null} centered={true}>
                <Alert setModalActive={handleToggleError} error={error} text={message}/>
            </Modal>
        </div>
    );
};

export default Change;