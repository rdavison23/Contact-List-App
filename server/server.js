import express, { json } from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/works', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/api/contacts/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts order by id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});
