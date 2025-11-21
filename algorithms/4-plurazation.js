// склонение по правилам русского языка — проверяем последние 1-2 цифры
function pluralizeRecords(n) {
    let recordForm;
    let wasFoundForm;

    let lastDigit = n % 10;
    let lastTwoDigits = n % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        recordForm = 'записей';
        wasFoundForm = 'было найдено';
    } else if (lastDigit === 1) {
        recordForm = 'запись';
        wasFoundForm = 'была найдена';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        recordForm = 'записи';
        wasFoundForm = 'было найдено';
    } else {
        recordForm = 'записей';
        wasFoundForm = 'было найдено';
    }

    return `В результате выполнения запроса ${wasFoundForm} ${n} ${recordForm}`;
}

console.log(pluralizeRecords(1)); // была найдена 1 запись
console.log(pluralizeRecords(2)); // было найдено 2 записи
console.log(pluralizeRecords(5)); // было найдено 5 записей
console.log(pluralizeRecords(11)); // было найдено 11 записей