import React, {useState} from "react";
import {DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";

// заказ

interface Order {
    id: string,
    content: string
}

// Начальное состояние списка
const initialOrders: Order[] = [
    {id: '1', content: "first"},
    {id: '2', content: "second"},
    {id: '3', content: "last"}
]

const Monitoring: React.FC = () => {
    const [orders, setOrder] = useState<Order[]>(initialOrders);

    // Фунция для обработки завершения перетаскивания
    const onDragEnd = (result: DropResult) => {
        // Проверяем, если ли значения у result/desctination
        // если результат не создержить названия (на пример был брошел за пределами коллоник ничего не делаем просто)
        if (!result.destination) {
            return;
        }
        // создаем копию текушиего массива заказов, что бы избедать мутацию состояния на прямую
        const newOrders = Array.from(orders);

        // удаляем элемент из исходного индекса (result.soruce.index) и сохраняем его в переменую movedOrder
        // Метод splice возвращает массив удаленных элементов, поэтому используем деструктуризацию для получения первого элемента.
        const [movedOrder] = newOrders.splice(result.source.index, 1);

        // Выставляем перемешенный элемент movedORder в новый индекс result.destionation.index
        // опять же используем методо splice но этат раз для вставки элемента в Drappable

        newOrders.splice(result.destination.index, 0, movedOrder);

        // Обноляем состояние orders новым массиов newOrders

        setOrder(newOrders);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} style={{border: "solid 1px red"}}>
                        {orders.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            userSelect: 'none',
                                            padding: '16px',
                                            margin: '0 0 8px 0',
                                            background: 'lightgrey',
                                            ...provided.draggableProps.style,
                                        }}
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} style={{border: "solid 1px red"}}>
                        {orders.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            userSelect: 'none',
                                            padding: '16px',
                                            margin: '0 0 8px 0',
                                            background: 'lightgrey',
                                            ...provided.draggableProps.style,
                                        }}
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );

}

export default Monitoring;