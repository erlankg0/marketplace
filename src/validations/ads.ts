import * as Yup from "yup";

export const validationServiceOrOrder = Yup.object().shape({
    name: Yup.string().max(250, "Максимум 250 символов")
        .min(5, "Минимум 5 символов")
        .required("Обязательное поле"),
    description: Yup.string().max(1000, "Максимум 1000 символов")
        .min(5, "Минимум 5 символов")
        .required("Обязательное поле"),
    price: Yup.number().positive('Стоимость должна быть положительной').required('Обязательное поле'),
    contactInfo: Yup.string().required("Обязательное поле"),

})

export const validationEquipment = Yup.object().shape({
    name: Yup.string()
        .max(250, "Максимум 250 символов")
        .min(5, "Минимум 5 символов")
        .required("Обязательное поле"),
    description: Yup.string()
        .max(1000, "Максимум 1000 символов")
        .min(5, "Минимум 5 символов")
        .required("Обязательное поле"),
    price: Yup.number().positive('Стоимость должна быть положительной').required('Обязательное поле'),
    quantity: Yup.number().positive('Количество должна быть положительной').required('Обязательное поле'),
    contactInfo: Yup.string().required("Обязательное поле"),

})