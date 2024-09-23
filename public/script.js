// Генерация чекбоксов с уникальными именами
const options = [
    // { id: "checkbox2", name: "Client status", description: "eg. New/FR #N/Rejected/Archived/Other (please specify in the comment section below)" },
    { id: "creationDate", name: "Client creation date", description: "eg. 2024/8/10"},
    { id: "createdBy", name: "Created by", description: "eg. Manual/etc." },
    { id: "fr", name: "Financial Review status or warnings", description: "eg. Not started/In progress/Submitted for review/Waiting to be signed/Other (please specify in the comment section below)" },
    { id: "profile", name: "Profile completion warnings", description: "eg. Bank Details is empty" },
    { id: "csa", name: "CSA status", description: "eg. No active CSA/Waiting for approval by Company Admin/Approved by Admin but not sent/Waiting to be signed" },
    { id: "documents", name: "Documents warnings", description: "eg. #N documents are waiting to be signed" },
    { id: "loa", name: "LoA warnings", description: "eg. Sent 1w ago 2024/5/20", level: 1 },
    { id: "payments", name: "Payments warnings", description: "eg. Not approved/Direct Debit is not signed/Other" },
    { id: "transfers", name: "Transfers warnings", description: "eg. Not approved/Waiting for transfer/Other" },
    { id: "kyc", name: "KYC warnings", description: "eg. Not submitted/Waiting for approval/Rejected" },
    // { id: "checkbox7", name: "Goals status", description: "eg. Risk Level not set/Active" },
    // { id: "checkbox1", name: "Fact Finding Form status", description: "eg. Not Started/In progress/Submitted for review/Other (please specify in the comment section below)" },
    // { id: "checkbox4", name: "LoA status", description: "eg. Sent 3d ago" },

];

const checkboxesDiv = document.getElementById('checkboxes');

options.forEach(option => {
    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';
    checkbox.id = option.id;  // Уникальный ID
    checkbox.name = option.name;  // Уникальное имя для передачи на сервер
    checkbox.level = option.level;
    
    const checkboxContainer = document.createElement('div');
    const labelContainer = document.createElement('div');
    const label = document.createElement('label');
    const description = document.createElement('div');
    
    labelContainer.className = 'label-container';
    checkboxContainer.className = 'checkbox-container';
    description.className = 'checkbox-description';

    if ( checkbox.level == 2 ) {
        checkboxContainer.className = 'checkbox-container level-2'
    }

    label.htmlFor = option.id;
    labelContainer.textContent = option.name;  // Отображаемое имя
    description.textContent = option.description;

    checkboxesDiv.appendChild(checkboxContainer);
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
    label.appendChild(labelContainer);
    label.appendChild(description);
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