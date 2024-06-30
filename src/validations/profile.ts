import * as Yup from "yup";

// Reusable validation schema for name fields
const nameValidation = Yup.string()
    .max(250, 'Максимум 250 символов')
    .min(3, 'Минимум 3 символа')
    .required('Объязательное');

export const validateProfile = Yup.object().shape({
    name: nameValidation,
    lastName: nameValidation,
    middleName: nameValidation,
    email: Yup.string()
        .email('Неверный формат email')
        .required('Объязательное'),
    phone: Yup.string()
        .matches(/^[0-9]+$/, 'Только цифры')
        .min(10, 'Минимум 10 символов')
        .max(15, 'Максимум 15 символов')
        .required('Объязательное'),
})