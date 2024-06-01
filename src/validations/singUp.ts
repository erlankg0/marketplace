import * as Yup from "yup";

export const ValidationSingUp = Yup.object().shape({
    email: Yup.string()
        .min(5, "Э почта должна быть более 5 символов")
        .max(100, "Э почта должна быть меньше 100 символов")
        .email("Не правильная э почта")
        .required("Обязательное поле"),
    phone: Yup.string()
        .min(10, "Не правльной номер телефона <Мин 10 симоволов>")
        .max(15, "Не правльной номер телефона <Макс 15 симоволов>")
        .required("Обязательное поле"),
    username: Yup.string()
        .max(100, "Максимум 100 символов")
        .required("Объязательное поле")
})