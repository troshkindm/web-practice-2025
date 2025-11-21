// пузырьковая сортировка — сравниваем соседние элементы по ключу
function getSortedArray(array, key) {
    let sorted = [...array];

    for (let i = 0; i < sorted.length - 1; i++) {
        for (let j = 0; j < sorted.length - i - 1; j++) {
            if (sorted[j][key] > sorted[j + 1][key]) {
                let temp = sorted[j];
                sorted[j] = sorted[j + 1];
                sorted[j + 1] = temp;
            }
        }
    }

    return sorted;
}

const users = [
    { name: 'Иван', age: 25 },
    { name: 'Анна', age: 20 },
    { name: 'Петр', age: 30 }
];

console.log(getSortedArray(users, 'age'));
console.log(getSortedArray(users, 'name'));