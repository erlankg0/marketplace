import {handleResponseError, instance} from "@network/network.ts";
import {IEditProfile, IProfile} from "@network/interfaces/profile/profile.ts";
import {IError} from "@network/interfaces/network/error.ts";
import axios, {AxiosError, AxiosResponse} from "axios";
import {ICards} from "@network/interfaces/basic.ts";

export const getProfile = async (): Promise<IProfile | IError> => {
    try {
        const response: AxiosResponse<IProfile> = await instance.get('account/profile');
        if (response.status === 200) {
            return response.data;
        } else {
            // Handle unexpected status codes
            const status = response.status;
            switch (status) {
                case 404:
                    return {message: 'Не найдет профиль', status};
                case 401:
                    return {message: 'Требудется авторизация', status};
                case 403:
                    return {message: 'Не принято!', status};
                default:
                    return {message: 'Не известная ошибка', status};
            }
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // Server responded with an error status
                return {
                    message: error.response.data.message || 'Server error occurred',
                    status: error.response.status
                };
            } else if (error.request) {
                // Request was made but no response received
                return {
                    message: 'No response received from the server',
                    status: 0
                };
            } else {
                // Error setting up the request
                return {
                    message: 'Error setting up the request',
                    status: 0
                };
            }
        } else {
            // Non-Axios error
            return {
                message: 'Unexpected error occurred',
                status: 0
            };
        }
    }
};

export const putProfile = async (profile: IEditProfile): Promise<{ message: string } | IError> => {
    try {
        const response: AxiosResponse<string> = await instance.put('account/profile/edit', profile, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 200) {
            return {message: response.data};
        } else {
            const status = response.status;
            switch (status) {
                case 400:
                    return {message: 'Invalid data provided', status};
                case 401:
                    return {message: 'Authorization required', status};
                case 403:
                    return {message: 'Access denied', status};
                default:
                    return {message: 'Unknown error occurred', status};
            }
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // Handle server error responses
                return {
                    message: error.response.data.message || 'Server error occurred',
                    status: error.response.status
                };
            } else if (error.request) {
                // Handle case where no response was received
                return {
                    message: 'No response received from the server',
                    status: 0
                };
            } else {
                // Handle other errors during request setup
                return {
                    message: 'Error setting up the request',
                    status: 0
                };
            }
        } else {
            // Handle non-Axios errors
            return {
                message: 'Unexpected error occurred',
                status: 0
            };
        }
    }
};


export const postImageProfile = async (formData: FormData): Promise<{ message: string } | IError> => {
    const response: AxiosResponse<string> = await instance.post('account/profile/uploadImage', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    if (response.status === 200) {
        return {message: response.data};
    } else {
        const status = response.status;
        switch (status) {
            case 400:
                return {message: response.data, status};
            case 401:
                return {message: response.data, status};
            case 403:
                return {message: response.data, status};
            case 419:
                return {message: response.data, status};
            default:
                return {message: response.data, status};
        }
    }
}
export const postSendSubscriptionRequest = async (): Promise<{ message: string } | IError> => {
    const response: AxiosResponse<string> = await instance.post('app-user/send-subscription-request');
    if (response.status === 200) {
        return {message: response.data}
    } else {
        const status = response.status;
        switch (status) {
            case 400:
                return {message: response.data, status};
            case 401:
                return {message: response.data, status};
            case 403:
                return {message: response.data, status};
            case 419:
                return {message: response.data, status};
            default:
                return {message: response.data, status};
        }
    }
}

export const getMyAds = async (pageNo: number = 0, pageSize: number = 18) => {
    const response = await instance.get(`account/my-advertisements?pageNumber=${pageNo}&pageSize=${pageSize}`);
    if (response.status == 200) {
        return response.data
    } else {
        const status = response.status;
        switch (status) {
            case 400:
                return {message: response.data, status};
            case 401:
                return {message: response.data, status};
            case 403:
                return {message: response.data, status};
            case 419:
                return {message: response.data, status};
            default:
                return {message: response.data, status};
        }
    }
}

export const getOrderHistoryUser = async (stage: "completed" | "current", pageNo: number = 0, pageSize: number = 18) => {
    try {
        return await instance.get(`order/order-history-for-user?pageNumber=${pageNo}&pageSize=${pageSize}&stage=${stage}`)
    } catch (error) {
        throw `Error: ${error}`
    }
}
export const getMyPurchases = async (pageNumber: number = 0, pageSize: number = 10): Promise<ICards | IError> => {
    try {
        const url = `account/my-purchases?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        const response: AxiosResponse<ICards> = await instance.get(url);

        if (response.status === 200) {
            return response.data;
        } else {
            return handleResponseError(response.statusText, response.status);
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        return handleResponseError(axiosError.message, axiosError.response?.status);
    }
};

export const getUserOrderHistory = async (
    stage: 'current' | 'completed',
    pageNumber: number = 0,
    pageSize: number = 10,
): Promise<ICards| IError> => {
    try {
        const url = `/order/order-history-for-user?pageNumber=${pageNumber}&pageSize=${pageSize}&stage=${stage}`;
        const response: AxiosResponse<ICards> = await instance.get(url);

        if (response.status === 200) {
            return response.data;
        } else {
            return handleResponseError(response.statusText, response.status);
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        return handleResponseError(axiosError.message, axiosError.response?.status);
    }
};
