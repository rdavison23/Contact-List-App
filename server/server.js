import express, { json } from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

//get all contact
app.get('/api/contacts/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts order by id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// GET one contact with tags
app.get('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Get the contact
    const contactResult = await pool.query(
      'SELECT * FROM contacts WHERE id = $1',
      [id]
    );

    if (contactResult.rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Get the tags for this contact
    const tagsResult = await pool.query(
      `SELECT t.*
         FROM tags t
         JOIN contact_tags ct ON ct.tag_id = t.id
         WHERE ct.contact_id = $1`,
      [id]
    );

    res.json({
      ...contactResult.rows[0],
      tags: tagsResult.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
