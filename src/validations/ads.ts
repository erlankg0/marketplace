import * as Yup from "yup";

export const validationADS = Yup.object().shape({
    title: Yup.string()
        .max(250, "масимум 250 символов")
        .min(5, "миниум 5 символов")
        .required("Объязательное поле"),
    description: Yup.string()
        .max(1000, "масимум 1000 символов")
        .min(5, "миниум 5 символов")
        .required("Объязательное поле"),
    count: Yup.number()
        .min(1, "минимальное количество 1")
        .required("Объязательное поле"),
    price: Yup.string()
        .required("Объязательное поле"),
    phone: Yup.string()
        .min(5, "Не правльной номер телефона <Мин 10 симоволов>")
        .max(15, "Не правльной номер телефона <Макс 15 симоволов>"),
    email: Yup.string()
        .email("Заполните Почту")
})