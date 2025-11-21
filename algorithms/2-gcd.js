// алгоритм Евклида — делим с остатком пока не получим ноль
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

console.log(gcd(48, 18)); // 6
console.log(gcd(100, 25)); // 25