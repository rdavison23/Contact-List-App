import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('.api/works', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
