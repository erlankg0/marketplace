import React, { useState } from "react";
import { IButton } from "@components/button/interface.ts";
import styles from "./button.module.scss";

const ButtonComponent: React.FC<IButton> = ({ text, onSubmit, onClick, waiting }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true);
        if (onClick) await onClick();
        setIsLoading(false);
        console.log(e)
    };

    return (
        <button
            className={`${styles.button} ${isLoading || waiting ? styles.waiting : ""}`}
            type="submit"
            onSubmit={onSubmit}
            onClick={handleClick}
            disabled={isLoading || waiting}
        >
            {isLoading ? <div className={styles.loader}></div> : text}
        </button>
    );
};

export default ButtonComponent;
