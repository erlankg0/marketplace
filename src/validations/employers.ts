import * as Yup from "yup"

export const validationEmployers = Yup.object().shape({
    firstName: Yup.string().required('Объязательное поле'),
    lastName: Yup.string().required('Объязательное поле'),
    patronymicName: Yup.string().required('Объязательное поле'),
    email: Yup.string().email('Не правильная э почта').required('Объязательное поле'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Только цифры')
        .min(10, 'Минимум 10 символов')
        .max(15, 'Максимум 15 символов')
        .required('Объязательное'),
    appointment: Yup.string().required('Объязательное'),
})