import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import styles from "./monitoring.module.scss";
import Order from "@components/order/UI/order.tsx";
import { changeMonitoringOrderById, getMonitoringCurrentOrders } from "@network/monitoring/monitoring.ts";

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
    const isTransitionAllowed = (
        source: string,
        destination: string | undefined,
        operation: 'PLUS' | 'MINUS'
    ): boolean => {
        switch (source) {
            case 'waiting':
                return operation === 'PLUS' && destination === 'in-progress';
            case 'in-progress':
                return operation === 'PLUS' && destination === 'review';
            case 'review':
                if (operation === 'PLUS') {
                    return destination === 'send';
                } else if (operation === 'MINUS') {
                    return destination === 'in-progress' || destination === 'waiting';
                }
                break;
            case 'send':
                return operation === 'PLUS' && destination === 'done';
            case 'done':
                return false;
            default:
                return false;
        }
        return false;
    };

    // Функция для обработки завершения перетаскивания
    const handleValidation = async (result: DropResult) => {
        const { source, destination } = result;

        if (!destination || source.droppableId === destination.droppableId) {
            return orders; // Return current state if no destination or no actual change in column
        }

        // Determine operation type based on the movement direction
        const operation: 'PLUS' | 'MINUS' = !(destination.index > source.index) ? 'PLUS' : 'MINUS';

        if (isTransitionAllowed(source.droppableId, destination.droppableId, operation)) {
            const newOrders = { ...orders };
            const sourceList = newOrders[source.droppableId];
            const destinationList = newOrders[destination.droppableId];

            if (!sourceList || !destinationList) {
                console.error(`Invalid source or destination: ${source.droppableId} to ${destination.droppableId}`);
                return orders;
            }

            // Backup current state
            const backupOrders = { ...newOrders };

            // Splice the item from the source and insert it into the destination
            const [movedItem] = sourceList.splice(source.index, 1);
            destinationList.splice(destination.index, 0, movedItem);

            // Call the API to update the status
            try {
                await changeMonitoringOrderById(movedItem.id, operation);
                return newOrders; // Return updated state if the API call succeeds
            } catch (error) {
                console.error(`Failed to change status for order ${movedItem.id}:`, error);
                // Revert the changes if the API call fails
                sourceList.splice(source.index, 0, movedItem);
                destinationList.splice(destination.index, 1);
                return backupOrders; // Return the original state before changes
            }
        }

        return orders; // Return current state if transition not allowed
    };

    const onDragEnd = async (result: DropResult) => {
        const newOrders = await handleValidation(result);
        if (newOrders) {
            setOrder(newOrders);
        }
    };

    const handleGetMonitoringOrders = async () => {
        try {
            const response = await getMonitoringCurrentOrders();
            const fetchedOrders = response.data;

            // Ensure all keys are present in the fetched orders
            const updatedOrders = { ...initialOrders, ...fetchedOrders };
            setOrder(updatedOrders);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    useEffect(() => {
        handleGetMonitoringOrders();
    }, []);

    return (
        <>
            {orders ? (
                <DragDropContext onDragEnd={onDragEnd}>
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
                                    {orders['waiting'].map((item, index) => (
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
                                    {orders['in-progress'].map((item, index) => (
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
                                    {orders['review'].map((item, index) => (
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
                                    {orders['send'].map((item, index) => (
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
                                    {orders['done'].map((item, index) => (
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
            ) : (
                <p>Нету заказов</p>
            )}
        </>
    );
};

export default Monitoring;