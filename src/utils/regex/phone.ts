// Регулярные выражения для каждого из стран
const kyrgyzstanRegex = /^(\+996|0)?[5-7]\d{8}$/;
const kazakhstanRegex = /^(\+7|8)?7\d{9}$/;
const russiaRegex = /^(\+7|8)?\d{10}$/;
const turkeyRegex = /^(\+90|0)?5\d{9}$/;

// Общая регулярка для всех стран
export const phoneRegex = new RegExp(
    `${kyrgyzstanRegex.source}|${kazakhstanRegex.source}|${russiaRegex.source}|${turkeyRegex.source}`
);
