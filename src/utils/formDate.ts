export const formatDate = (dateString: string| Date): string => {
    // Define an array for month names in Russian
    const monthNames = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Get day, month, and year from the date object
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2); // Last 2 digits of the year

    // Return the formatted date string
    return `${day} ${month} ${year}г`;
};
