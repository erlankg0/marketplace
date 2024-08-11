import {instance} from "@network/network.ts";
import {AxiosResponse} from "axios";

// Интерфейс для данных заказа
interface IOrder {
    id: string | number;
    description: string;
    dateOfStart: Date | string;
}

// Интерфейс для ответа API
// Здесь предполагается, что API возвращает объект, где ключи — это статусы заказов,
// а значения — массивы заказов
type OrdersResponse = Record<string, IOrder[]>;

export const getMonitoringCurrentOrders = async (): Promise<AxiosResponse<OrdersResponse>> => {
    try {
        return await instance.get('order/organization-current-orders-monitoring');
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

export const changeMonitoringOrderById = async (id: string | number, status: 'MINUS' | 'PLUS') => {
    try {
        return await instance.put(`order/change-status/${id}/${status}`)
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}