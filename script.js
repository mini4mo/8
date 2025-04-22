document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sort-form');
    const numbersInput = document.getElementById('numbers');
    const sortOrder = document.getElementsByName('sort');
    const result = document.getElementById('result');
    const stats = document.getElementById('stats');
    const error = document.getElementById('error');
    const clearBtn = document.getElementById('clear');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        error.textContent = '';
        result.classList.add('hidden');

        const input = numbersInput.value.trim();
        if (!input) {
            error.textContent = 'Введите числа!';
            return;
        }

        const numbers = input.split(',').map(n => parseFloat(n.trim()));
        if (numbers.some(isNaN)) {
            error.textContent = 'Введите корректные числа, разделённые запятыми!';
            return;
        }

        const order = Array.from(sortOrder).find(r => r.checked).value;
        numbers.sort((a, b) => order === 'asc' ? a - b : b - a);

        result.textContent = `Отсортированный список: ${numbers.join(', ')}`;
        result.classList.remove('hidden');
        result.classList.add('visible');

        const count = numbers.length;
        const avg = numbers.reduce((sum, n) => sum + n, 0) / count;
        stats.textContent = `Количество чисел: ${count}, Среднее значение: ${avg.toFixed(2)}`;
    });

    clearBtn.addEventListener('click', () => {
        numbersInput.value = '';
        result.classList.add('hidden');
        stats.textContent = '';
        error.textContent = '';
    });
});