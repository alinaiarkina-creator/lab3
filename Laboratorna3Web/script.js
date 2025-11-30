// Глобальні змінні для керування інтервалом
let intervalId = null;
let rowCounter = 0;

window.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const intervalInput = document.getElementById('intervalInput');

    startBtn.addEventListener('click', () => {
        const intervalValue = parseInt(intervalInput.value, 10);

        if (isNaN(intervalValue) || intervalValue <= 0) {
            alert('Будь ласка, введіть коректний інтервал (більше 0).');
            return;
        }

        // Якщо вже запущено – спочатку зупиняємо
        if (intervalId !== null) {
            clearInterval(intervalId);
        }

        // Запускаємо генерацію
        intervalId = setInterval(addRandomRow, intervalValue);

        startBtn.disabled = true;
        stopBtn.disabled = false;
        intervalInput.disabled = true;
    });

    stopBtn.addEventListener('click', () => {
        stopGeneration();
    });
});

/**
 * Функція зупинки генерації
 */
function stopGeneration() {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const intervalInput = document.getElementById('intervalInput');

    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }

    startBtn.disabled = false;
    stopBtn.disabled = true;
    intervalInput.disabled = false;
}

/**
 * Додає новий рядок з випадковими даними в таблицю
 */
function addRandomRow() {
    const tableBody = document.querySelector('#dataTable tbody');

    rowCounter++;

    // Випадкові дані
    const randomNumber = getRandomInt(1, 100);
    const randomValue = getRandomInt(100, 999);
    const timestamp = new Date().toLocaleTimeString();

    const tr = document.createElement('tr');

    const tdIndex = document.createElement('td');
    tdIndex.textContent = rowCounter;

    const tdRandom = document.createElement('td');
    tdRandom.textContent = randomNumber;

    const tdOther = document.createElement('td');
    tdOther.textContent = randomValue;

    const tdTime = document.createElement('td');
    tdTime.textContent = timestamp;

    tr.appendChild(tdIndex);
    tr.appendChild(tdRandom);
    tr.appendChild(tdOther);
    tr.appendChild(tdTime);

    tableBody.appendChild(tr);
}

/**
 * Генерація випадкового цілого числа в діапазоні [min, max]
 */
function getRandomInt(min, max) {
    const lower = Math.ceil(min);
    const upper = Math.floor(max);
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
