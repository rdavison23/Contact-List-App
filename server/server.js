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

// Create a contact
app.post('/api/contacts', async (req, res) => {
  const { name, email, phone, notes } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO contacts (name, email, phone, notes)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, phone || null, notes || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);

    //unique email violation
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email must be unique.' });
    }

    res.status(500).json({ error: 'Failed to create contact' });
  }
});

//Update a contact
app.put('/api/contacts/:id', async (req, res) => {
  console.log('PUT BODY:', req.body);

  const { id } = req.params;
  const { name, email, phone, notes } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const result = await pool.query(
      `UPDATE contacts
       SET name = $1,
           email = $2,
           phone = $3,
           notes = $4
       WHERE id = $5
       RETURNING *`,
      [name, email, phone || null, notes || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// Delete a contact

app.delete('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM contacts WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'contact not found' });
    }
    res.json({ sucess: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to delete contact' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
