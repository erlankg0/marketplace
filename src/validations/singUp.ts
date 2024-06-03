import * as Yup from "yup";
import {phoneRegex} from "@utils/regex/phone.ts";

export const ValidationSingUp = Yup.object().shape({
    email: Yup.string()
        .min(5, "Э почта должна быть более 5 символов")
        .max(100, "Э почта должна быть меньше 100 символов")
        .email("Не правильная э почта")
        .required("Обязательное поле"),
    phone: Yup.string()
        .matches(phoneRegex, "Неправильный номер телефона")
        .min(10, "Не правльной номер телефона <Мин 10 симоволов>")
        .max(15, "Не правльной номер телефона <Макс 15 симоволов>")
        .required("Обязательное поле"),
    lastName: Yup.string()
        .min(3, " Фамилия быть более 3 символов")
        .max(50, "Фамилия не можеть быть более 50 символов")
        .required("Объязательное поле"),
    firstName: Yup.string()
        .min(3, "Имя Должна быть более 3 символов")
        .max(50, "Имя не можеть быть более 50 символов")
        .required("Объязательное поле"),
    middleName: Yup.string()
        .min(3, "Отчество Должна быть более 3 символов")
        .max(50, "Отчество не можеть быть более 50 символов")
        .required("Объязательное поле"),
})