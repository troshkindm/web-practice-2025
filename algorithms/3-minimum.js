// извлекаем цифры через остаток от деления на 10, ищем минимальную
function minDigit(x) {
    let min = 9;
    while (x > 0) {
        let digit = x % 10;
        if (digit < min) {
            min = digit;
        }
        x = Math.floor(x / 10);
    }
    return min;
}

console.log(minDigit(7392)); // 2
console.log(minDigit(5081)); // 0