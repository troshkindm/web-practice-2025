// шифр цезаря — сдвигаем каждую букву на shift позиций в алфавите
function caesar(str, shift, action) {
    const alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
    let result = '';

    const actualShift = action === 'encode' ? shift : -shift;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const lowerChar = char.toLowerCase();
        const index = alphabet.indexOf(lowerChar);

        if (index === -1) {
            result += char;
        } else {
            let newIndex = (index + actualShift) % alphabet.length;
            if (newIndex < 0) {
                newIndex += alphabet.length;
            }

            const newChar = alphabet[newIndex];
            result += char === char.toUpperCase() ? newChar.toUpperCase() : newChar;
        }
    }

    return result;
}

console.log(caesar('привет', 3, 'encode')); // тулеих
console.log(caesar('тулеих', 3, 'decode')); // привет
console.log(caesar('рсйгжу нйс', 1, 'decode')); // привет мир