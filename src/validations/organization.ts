import * as Yup from 'yup';

export const validationCreateOrganization = Yup.object().shape({
    image: Yup.string(),
    title: Yup.string().min(5,'минимум 5 символов').max(250, 'максимум 250 символов').required('Объязательное поле'),
    description: Yup.string().min(5,'минимум 5 символов').max(1000, 'максимум 1000 символов').required('Объязательное поле'),
})