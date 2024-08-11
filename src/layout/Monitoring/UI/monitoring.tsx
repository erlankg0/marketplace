import React, {useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import styles from "./monitoring.module.scss";
import Order from "@components/order/UI/order.tsx";
import {changeMonitoringOrderById, getMonitoringCurrentOrders} from "@network/monitoring/monitoring.ts";

// Интерфейс для заказа
export interface IOrderMonitoring {
    id: string | number;
    description: string;
    dateOfStart: Date | string;
}

// Начальное состояние списка
const initialOrders: Record<string, IOrderMonitoring[]> = {
    'waiting': [],
    'in-progress': [],
    'review': [],
    'send': [],
    'done': []
};

const Monitoring: React.FC = () => {
    const [orders, setOrder] = useState<Record<string, IOrderMonitoring[]>>(initialOrders);

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

    // Функция для обработки завершения перетаскивания
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
    };

    const handleGetMonitoringOrders = async () => {
        try {
            const response = await getMonitoringCurrentOrders();
            console.log(response.data)
            setOrder(response.data)
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            // Вы можете установить состояние ошибки здесь, если это необходимо
        }
    };

    const handleChangeStatus = async (id: string | number, status: 'MINUS' | 'PLUS') => {
        try {
            await changeMonitoringOrderById(id, status);
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        handleGetMonitoringOrders();
    }, []);

    return (
        <>{orders ? (<DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.monitoring}>
                    {/* Зона "На ожидании" */}
                    <Droppable droppableId="waiting">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={styles.monitoring__collumn}
                            >
                                <h2 className={`${styles.monitoring__head} ${styles.waiting}`}>В ожидании</h2>
                                {orders['waiting'] && orders['waiting'].map((item, index) => (
                                    <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Order {...item} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    {/* Зона "В работе" */}
                    <Droppable droppableId="in-progress">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={styles.monitoring__collumn}
                            >
                                <h2 className={`${styles.monitoring__head} ${styles.progress}`}>В работе</h2>
                                {orders['in-progress'] && orders['in-progress'].map((item, index) => (
                                    <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Order {...item} />
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
                                {orders['review'] && orders['review'].map((item, index) => (
                                    <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Order {...item} />

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
                                {orders['send'] && orders['send'].map((item, index) => (
                                    <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Order {...item} />
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
                                {orders['done'] && orders['done'].map((item, index) => (
                                    <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Order {...item} />
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
        ) : (<p>Нету заказов</p>)}</>
    );
};

export default Monitoring;