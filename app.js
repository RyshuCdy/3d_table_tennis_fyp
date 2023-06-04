const express = require('express');
const cors = require('cors')
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(express.json())
const pool = new Pool({
  user: 'ttadmin@userfeedback',
  host: 'userfeedback.postgres.database.azure.com',
  database: 'ttfeedback',
  password: '3dtableTENNIS',
  port: 5432,
  ssl: true,
});

pool.query('SELECT * FROM feedback', (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result.rows);
  }
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/feedback.html');
});

app.post('/submit-feedback', (req, res) => {
  const { name, email, message } = req.body;
  pool.query(
    'INSERT INTO feedback (name, email, message) VALUES ($1, $2, $3)',
    [name, email, message],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error submitting feedback');
      } else {
        console.log('Feedback submitted successfully');
        res.sendFile(__dirname + '/public/thank-you.html');
      }
    }
  );
});

// app.listen(3000, () => {
//   console.log('Server is listening on port 3000');
// });
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// API Endpoints

// Get all feedback
app.get('/api/feedback', (req, res) => {
  pool.query('SELECT * FROM feedback', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result.rows);
    }
  });
});

// Submit feedback
app.post('/api/feedback', (req, res) => {
  const { name, email, message } = req.body;
  pool.query(
    'INSERT INTO feedback (name, email, message) VALUES ($1, $2, $3)',
    [name, email, message],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error submitting feedback' });
      } else {
        res.json({ message: 'Feedback submitted successfully' });
      }
    }
  );
});
