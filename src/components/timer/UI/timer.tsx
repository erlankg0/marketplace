import React, {useEffect, useState} from "react";
import {ITimer} from "@components/timer/interface.ts";
import styles from "@layout/Auth/UI/auth.module.scss";

const Timer: React.FC<ITimer> = ({initialSeconds, onReset}) => {
    const [seconds, setSeconds] = useState<number>(initialSeconds);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((seconds) => {
                if (seconds === 0) {
                    onReset();
                    return initialSeconds;
                } else {
                    return seconds - 1;
                }
            })
        }, 1000)
        return () => clearInterval(interval);
    }, [initialSeconds, onReset])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };


    return (
        <div>
            <p className={styles.timer}>Отправить код повторно через {formatTime(seconds)}</p>
        </div>
    )
}

export default Timer;