import { useState, ChangeEvent } from "react";
import ButtonComponent from "@components/button/UI/button.tsx";
import success from "@assets/emoji/forgot.jpeg";
import styles from "./change.module.scss";
import { postImageProfile } from "@network/profile/profile.ts";

const Change: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

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
            console.log(formData)
            console.log(file)
            try {
                await postImageProfile(formData);
                console.log("File uploaded successfully");
            } catch (error) {
                console.error("Error uploading file", error);
                setError("Failed to upload the file. Please try again.");
            }
        } else {
            setError("Please select a file to upload.");
        }
    };


    return (
        <div className={styles.change}>
            <div className={styles.change__head}>
                <img src={success} alt="emoji success" />
            </div>
            <div className={styles.change__text}>
                <h2 className={styles.change__title}>Изменить фото профиля?</h2>
                <p className={styles.change__description}>Загрузите фотографию из своей галереи</p>
            </div>
            <div className={styles.change__upload}>
                <label htmlFor="file" className={styles.label}>+ Загрузить файл</label>
                <input id="file" type="file" onChange={handleFileChange} />
                <p className={styles.change__description}>Формат JPG, JPEG, PNG</p>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.button}>
                <ButtonComponent text="Сохранить" onClick={handleChangePhoto} />
            </div>
        </div>
    );
};

export default Change;