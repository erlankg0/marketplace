import React from "react";
import styles from "./status.module.scss";
import { IStatus } from "@components/status/interface.ts";
import classNames from "classnames";

const Status: React.FC<IStatus> = ({ status }) => {
    const handleStatus = () => {
        switch (status) {
            case 'done':
                return (<p className={classNames(styles.status, styles.status__done)}>Done</p>);
            case 'processing':
                return (<p className={classNames(styles.status, styles.status__processing)}>Processing</p>);
            case 'waiting':
                return (<p className={classNames(styles.status, styles.status__waiting)}>Waiting</p>);
            case 'send':
                return (<p className={classNames(styles.status, styles.status__send)}>Send</p>);
            case 'checking':
                return (<p className={classNames(styles.status, styles.status__cheсking)}>Checking</p>);
            default:
                return (<p className={styles.status}>Unknown Status</p>);
        }
    };

    return handleStatus();
};

export default Status;
