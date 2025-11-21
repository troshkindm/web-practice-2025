// math-game/game.js

// состояние игры
let currentLevel = 0;
const levels = ['Начальный', 'Средний', 'Продвинутый'];

let correctAnswers = 0;
let incorrectAnswers = 0;
let currentQuestion = 1;
let currentAnswer = null; // правильный ответ на текущий вопрос
let askedQuestions = []; // предотвращаем повторы вопросов

let timeLeft = 300; // 5 минут в секундах
let timerInterval;

const levelData = {
    0: { name: 'Начальный', type: 'arithmetic' },
    1: { name: 'Средний', type: 'comparison' },
    2: { name: 'Продвинутый', type: 'logical' }
};

function startGame() {
    currentLevel = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    currentQuestion = 1;
    askedQuestions = [];
    timeLeft = 300;

    updateDisplay();
    generateQuestion();
    startTimer();

    document.getElementById('game-over').classList.add('hidden');
    document.querySelector('.input-section').style.display = 'flex';
    document.getElementById('answer-input').disabled = false;
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            endGame('Время вышло! Игра окончена.');
        }
    }, 1000);
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent =
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    document.getElementById('level').textContent = levels[currentLevel];
    document.getElementById('correct').textContent = correctAnswers;
    document.getElementById('incorrect').textContent = incorrectAnswers;
    document.getElementById('current-question').textContent = currentQuestion;
}

// основная логика генерации вопросов - направляет к нужному генератору по уровню
function generateQuestion() {
    let question, answer;
    let questionString;

    // продолжаем генерировать пока не получим уникальный вопрос
    do {
        if (levelData[currentLevel].type === 'arithmetic') {
            [question, answer, questionString] = generateArithmetic();
        } else if (levelData[currentLevel].type === 'comparison') {
            [question, answer, questionString] = generateComparison();
        } else {
            [question, answer, questionString] = generateLogical();
        }
    } while (askedQuestions.includes(questionString));

    // помечаем вопрос как использованный
    askedQuestions.push(questionString);
    currentAnswer = answer;

    document.getElementById('question-display').textContent = question;
    document.getElementById('answer-input').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
}

// уровень 0: базовая арифметика (+, -, *, /)
function generateArithmetic() {
    const operators = ['+', '-', '*', '/'];
    const op = operators[Math.floor(Math.random() * operators.length)];

    let a, b;

    // для деления гарантируем целочисленный результат через обратную генерацию
    // сначала генерируем делитель (от 1 до 9), и только затем желаемый ответ (от 1 до 12), после вычисляем делимое
    if (op === '/') {
        b = Math.floor(Math.random() * 9) + 1;
        const result = Math.floor(Math.random() * 12) + 1;
        a = b * result;
    } else {
        a = Math.floor(Math.random() * 20) + 1;
        b = Math.floor(Math.random() * 20) + 1;
    }

    const question = `${a} ${op} ${b}`;
    let answer;

    switch(op) {
        case '+': answer = a + b; break;
        case '-': answer = a - b; break;
        case '*': answer = a * b; break;
        case '/': answer = a / b; break;
    }

    return [question, answer, question];
}

// уровень 1: операторы сравнения (<, >, <=, >=, ==, !=)
// возвращает булево значение как строку ('true'/'false')
function generateComparison() {
    const operators = ['<', '>', '<=', '>=', '==', '!='];
    const op = operators[Math.floor(Math.random() * operators.length)];

    const a = Math.floor(Math.random() * 30) + 1;
    const b = Math.floor(Math.random() * 30) + 1;

    const question = `${a} ${op} ${b}`;
    let answer;

    switch(op) {
        case '<': answer = a < b; break;
        case '>': answer = a > b; break;
        case '<=': answer = a <= b; break;
        case '>=': answer = a >= b; break;
        case '==': answer = a === b; break;
        case '!=': answer = a !== b; break;
    }

    return [question, answer ? 'true' : 'false', question];
}

// уровень 2: логические операторы и двоичные операции
// 50/50 распределение между побитовыми и булевыми операциями
function generateLogical() {
    const type = Math.random() > 0.5 ? 'binary' : 'logical';

    if (type === 'binary') {
        const a = Math.floor(Math.random() * 16);
        const b = Math.floor(Math.random() * 16);
        const operators = ['&', '|', '^'];
        const op = operators[Math.floor(Math.random() * operators.length)];

        // показываем в двоичной, ответ в двоичной
        const question = `${a.toString(2)} ${op} ${b.toString(2)}`;
        let answer;

        switch(op) {
            case '&': answer = (a & b).toString(2); break;
            case '|': answer = (a | b).toString(2); break;
            case '^': answer = (a ^ b).toString(2); break;
        }

        return [question, answer, question];
    } else {
        const a = Math.random() > 0.5;
        const b = Math.random() > 0.5;
        const operators = ['&&', '||'];
        const op = operators[Math.floor(Math.random() * operators.length)];

        const question = `${a} ${op} ${b}`;
        const answer = op === '&&' ? (a && b) : (a || b);

        return [question, answer ? 'true' : 'false', question];
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer-input').value.trim();
    const feedback = document.getElementById('feedback');

    if (userAnswer === '') return;

    // нестрогое сравнение для обработки и числовых и строковых ответов
    // noinspection EqualityComparisonWithCoercionJS
    const isCorrect = userAnswer == currentAnswer ||
        userAnswer.toLowerCase() === String(currentAnswer).toLowerCase();

    if (isCorrect) {
        correctAnswers++;
        feedback.textContent = 'Правильно!';
        feedback.className = 'feedback correct';
    } else {
        incorrectAnswers++;
        feedback.textContent = `Неправильно! Ответ: ${currentAnswer}`;
        feedback.className = 'feedback incorrect';
    }

    updateDisplay();

    // задержка перед следующим вопросом для видимости обратной связи
    setTimeout(() => {
        if (currentQuestion >= 10) {
            checkLevelProgress();
        } else {
            currentQuestion++;
            generateQuestion();
            updateDisplay();
        }
    }, 1500);
}

// определяем переход на следующий уровень или завершение игры
function checkLevelProgress() {
    const accuracy = (correctAnswers / (correctAnswers + incorrectAnswers)) * 100;

    // нужно 80%+ точности для перехода
    if (accuracy >= 80 && currentLevel < 2) {
        currentLevel++;
        // сбрасываем счетчики для нового уровня
        correctAnswers = 0;
        incorrectAnswers = 0;
        currentQuestion = 1;
        askedQuestions = [];

        alert(`Поздравляем! Вы переходите на уровень: ${levels[currentLevel]}`);
        updateDisplay();
        generateQuestion();
    } else if (currentLevel === 2 && accuracy >= 80) {
        endGame('Поздравляем! Вы прошли все уровни!');
    } else {
        endGame(`Недостаточно правильных ответов (${accuracy.toFixed(0)}%). Попробуйте снова!`);
    }
}

function endGame(message) {
    clearInterval(timerInterval);
    document.getElementById('final-message').textContent = message;
    document.getElementById('game-over').classList.remove('hidden');
    document.querySelector('.input-section').style.display = 'none';
    document.getElementById('answer-input').disabled = true;
}

function restartGame() {
    startGame();
}

function exitGame() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        window.close();
    }
}

// отправка ответа по нажатию enter
document.getElementById('answer-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

startGame();