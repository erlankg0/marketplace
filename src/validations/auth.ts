import * as Yup from "yup";
import {phoneRegex} from "@utils/regex/phone.ts";

export const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    phone: Yup.string()
        .matches(phoneRegex, "Неправильный номер телефона")
        .min(10, "Не правльной номер телефона <Мин 10 симоволов>")
        .max(15, "Не правльной номер телефона <Макс 15 симоволов>")
        .required("Обязательное поле"),
});