const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let submissions = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit', (req, res) => {
    const { name, checkboxes, comment, timeFormatted } = req.body;
    submissions.push({ name, checkboxes, comment, timeFormatted });
    res.json({ status: 'success' });
  });

app.get('/submissions', (req, res) => {
  res.json(submissions);
});

app.use(express.static('public'));

app.get('/results.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'results.html'));
  });

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

app.delete('/clear', (req, res) => {
    submissions.length = 0; // Очищаем массив
    res.status(204).send(); // Отправляем статус 204 No Content
});