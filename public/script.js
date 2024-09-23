// Генерация чекбоксов с уникальными именами
const options = [
    { id: "checkbox1", name: "Custom Name 1" },
    { id: "checkbox2", name: "Custom Name 2" },
    { id: "checkbox3", name: "Custom Name 3" },
    { id: "checkbox4", name: "Custom Name 4" },
    { id: "checkbox5", name: "Custom Name 5" },
    { id: "checkbox6", name: "Custom Name 6" },
    { id: "checkbox7", name: "Custom Name 7" },
    { id: "checkbox8", name: "Custom Name 8" },
    { id: "checkbox9", name: "Custom Name 9" },
    { id: "checkbox10", name: "Custom Name 10" },
];

const checkboxesDiv = document.getElementById('checkboxes');
options.forEach(option => {
    const checkbox = document.createElement('input');
    const checkboxContainer = document.createElement('div');
    checkbox.type = 'checkbox';
    checkbox.id = option.id;  // Уникальный ID
    checkbox.name = option.name;  // Уникальное имя для передачи на сервер
    checkboxContainer.className = 'checkbox-container';

    const label = document.createElement('label');
    label.htmlFor = option.id;
    label.textContent = option.name;  // Отображаемое имя

    checkboxesDiv.appendChild(checkboxContainer);
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
});

document.getElementById('feedbackForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const checkboxes = options.map(option => ({
        name: option.name,
        checked: document.getElementById(option.id).checked
    }));

    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    const timeFormatted = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });

    const response = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, checkboxes, comment, timeFormatted })
    });

    if (response.ok) {
        alert('Form submitted successfully!');
        window.location.href = '/results.html';
    } else {
        alert('Failed to submit the form.');
    }
});

document.getElementById('resetButton').addEventListener('click', function() {
    options.forEach(option => {
      document.getElementById(option.id).checked = false; // Сбрасываем состояние чекбоксов
    });
  });