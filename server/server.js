import express from 'express';
import cors from 'cors';
import pool from './db.js';
import contactsRouter from './routes/contacts.js';

const app = express();

app.use(cors());
app.use(express.json());

// mount contacts routes
app.use('/api/contacts', contactsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
