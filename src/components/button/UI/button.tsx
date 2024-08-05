import React, {useState} from "react";
import {IButton} from "@components/button/interface.ts";
import styles from "./button.module.scss";

const ButtonComponent: React.FC<IButton> = ({text, onSubmit, onClick, waiting, color, type}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClick = async () => {
        setIsLoading(true);
        if (onClick) await onClick();
        setIsLoading(false);
    };

    return (
        <button
            className={`${styles.button} ${isLoading || waiting ? styles.waiting : ""}`}
            style={color ? {backgroundColor: color} : undefined}
            type={type && type}
            onSubmit={onSubmit}
            onClick={handleClick}
            disabled={isLoading || waiting}
        >
            {isLoading ? <div className={styles.loader}></div> : text}
        </button>
    );
};

export default ButtonComponent;
