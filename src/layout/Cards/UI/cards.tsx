import React from "react"
import styles from "./cards.module.scss";
import Card from "@components/card/UI/card.tsx";
import {ICards} from "@layout/Cards/interface.ts";

const Cards: React.FC<ICards> = ({setActiveModal}) => {
    return (
        <section className={styles.cards}>
            <Card  setActiveModal={setActiveModal}/>
            <Card  setActiveModal={setActiveModal}/>
            <Card  setActiveModal={setActiveModal}/>
            <Card  setActiveModal={setActiveModal}/>
            <Card  setActiveModal={setActiveModal}/>
            <Card  setActiveModal={setActiveModal}/>
            <Card  setActiveModal={setActiveModal}/>
            <Card  setActiveModal={setActiveModal}/>
            <Card  setActiveModal={setActiveModal}/>

        </section>
    )
}

export default Cards;