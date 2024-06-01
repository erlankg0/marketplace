import * as Yup from "yup"

export const ValidateConfirmed = Yup.object().shape({
    code: Yup.string()
        .required("Объязательное поле")
        .min(4, "Код подверждения 4 символа")
        .max(4, "Код подверждения 4 символа")
})