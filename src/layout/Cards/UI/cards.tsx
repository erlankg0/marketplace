import React, {useEffect} from "react"
import styles from "./cards.module.scss";
import Card from "@components/card/UI/card.tsx";
import {ICards} from "@layout/Cards/interface.ts";
import {getAllEquipment} from "@network/equipment/equipment.ts";

const Cards: React.FC<ICards> = ({setActiveModal}) => {
    const hanleGetEquipments = async () => {
        try {
            const response = await getAllEquipment();
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        hanleGetEquipments()
    }, [])

    return (
        <section className={styles.cards}>
            <Card setActiveModal={setActiveModal}/>
            <Card setActiveModal={setActiveModal}/>
            <Card setActiveModal={setActiveModal}/>
            <Card setActiveModal={setActiveModal}/>
            <Card setActiveModal={setActiveModal}/>
            <Card setActiveModal={setActiveModal}/>
            <Card setActiveModal={setActiveModal}/>
            <Card setActiveModal={setActiveModal}/>
            <Card setActiveModal={setActiveModal}/>

        </section>
    )
}

export default Cards;