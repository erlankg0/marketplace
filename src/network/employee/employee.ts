import {instance} from "@network/network.ts";

export const getEmployers = async () => {
    try {
        return await instance.get('employee/get-all-employees')
    } catch (error) {
        throw `Error: ${error}`
    }
}

export const getEmployeeOrdersByState = async (stage: 'current' | 'completed', employeeID: number | string, pageNo: number = 0, pageSize: number = 4) => {
    try {
        return await instance.get(`order/get-employee-orders-by-stage/${employeeID}?stage=${stage}&pageNumber=${pageNo}&pageSize=${pageSize}`);
    } catch (error) {
        throw `Error: ${error}`
    }
}

export const postAssignEmployeeToOrder = async (orderId: string | number, employeeId: string | number) => {
    try {
        return await instance.post(`order/assign-employee-to-order/${orderId}?employeeId=${employeeId}`);
    } catch (error) {
        throw `Error: ${error}`
    }
}