import React, {useEffect, useState} from "react";
import {DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";
import styles from "./monitoring.module.scss"
import Order from "@components/order/UI/order.tsx";

// заказ

interface IOrder {
    id: string,
    content: string
}

// Начальное состояние списка
const initialOrders: Record<string, IOrder[]> = {
    'waiting': [{id: '1', content: 'Test'}],
    'in-progress': [],
    'review': [],
    'send': [],
    'done': []
};


const Monitoring: React.FC = () => {
    const [orders, setOrder] = useState<Record<string, IOrder[]>>(initialOrders);

    // Функция для проверки допустимости перехода между статусами заказов
    const isTransitionAllowed = (source: string, destination: string | undefined): boolean => {
        switch (source) {
            case 'waiting':
                return destination === 'in-progress';
            case 'in-progress':
                return destination === 'review';
            case 'review':
                return destination === 'in-progress' || destination === 'waiting' || destination === 'send';
            case 'send':
                return destination === 'done';
            case 'done':
                return false; // В статус "done" не может быть переходов
            default:
                return false; // Если статусы не совпадают с ожидаемыми, переход не разрешен
        }
    };

    // const handleValidation = (result: DropResult) => {
    //     const {source, destination} = result
    //
    //     const currentData = source.droppableId; // здания которую мы выбрали
    //     const choiceColumn = destination?.droppableId;
    //
    //     // ультат не создержить названия (на пример был брошел за пределами коллоник ничего не делаем просто)
    //     if (!destination) {
    //         return;
    //     }
    //
    //     // Если значения элемента был перещен в ту же зону и остался в том же мест, выходим из фунции
    //     if (source.droppableId === destination.droppableId && source.index === destination.index) {
    //         return;
    //     }
    //
    //     if (destination) {
    //         if (!isTransitionAllowed(currentData, choiceColumn)) {
    //             // Создаем копию текущего состояния элементов, чтобы не мутировать его напрямую.
    //             const newOrders = {...orders};
    //
    //             // Извлекаем элемент из исходной зоны. Метод splice возвращает массив удаленных элементов, поэтому используем деструктуризацию для получения первого элемента.
    //             const [movedItem] = newOrders[source.droppableId].splice(source.index, 1);
    //
    //             // Вставляем извлеченный элемент в новую зону на указанную позицию. Метод splice используется для вставки элемента.
    //             newOrders[destination.droppableId].splice(destination.index, 0, movedItem);
    //             // Обновляем состояние с новыми значениями. Это вызывает перерисовку компонента с обновленным порядком элементов.
    //
    //             return newOrders;
    //         }
    //     }
    // }

    // Фунция для обработки завершения перетаскивания
    const handleValidation = (result: DropResult) => {
        const {source, destination} = result;

        if (!destination || source.droppableId === destination.droppableId) {
            return orders; // Return current state if no destination or no actual change in column
        }

        if (isTransitionAllowed(source.droppableId, destination.droppableId)) {
            const newOrders = {...orders};
            const [movedItem] = newOrders[source.droppableId].splice(source.index, 1);
            newOrders[destination.droppableId].splice(destination.index, 0, movedItem);
            return newOrders;
        }

        return orders; // Return current state if transition not allowed
    };

    const onDragEnd = (result: DropResult) => {
        const newOrders = handleValidation(result);
        if (newOrders) {
            setOrder(newOrders);
        }
        setOrder(orders);
    };

    useEffect(() => {
        console.log(orders)
    }, [orders])

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.monitoring}>
                {/* Зона "На ожиданнии" */}
                <Droppable droppableId="waiting">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={styles.monitoring__collumn}
                        >
                            <h2 className={`${styles.monitoring__head} ${styles.waiting}`}>В ожидании</h2>
                            <div>
                                {orders['waiting'].map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Order/>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}

                            </div>
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="in-progress">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}
                             className={styles.monitoring__collumn}>
                            <h2 className={`${styles.monitoring__head} ${styles.progress}`}>В работе</h2>
                            {orders['in-progress'].map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}

                                        >
                                            <Order/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                {/* Зона "На Проверка" */}
                <Droppable droppableId="review">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={styles.monitoring__collumn}
                        >
                            <h2 className={`${styles.monitoring__head} ${styles.review}`}>Проверка</h2>
                            {orders['review'].map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}

                                        >
                                            <Order/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                {/* Зона "На Отправка" */}
                <Droppable droppableId="send">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={styles.monitoring__collumn}
                        >
                            <h2 className={`${styles.monitoring__head} ${styles.send}`}>Отправка</h2>
                            {orders['send'].map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}

                                        >
                                            <Order/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                {/* Зона "Сделано" */}
                <Droppable droppableId="done">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={styles.monitoring__collumn}
                        >
                            <h2 className={`${styles.monitoring__head} ${styles.done}`}>Прибыл</h2>
                            {orders['done'].map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}

                                        >
                                            <Order/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>

        </DragDropContext>

    );

}

export default Monitoring;