import { useState } from 'react';

function CreateContact() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.name.trim()) {
      alert('Name is required');
      return;
    }

    if (!values.email.includes('@')) {
      alert('Email must be valid');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error('Failed to create contact');
      }

      alert('Contact created!');
      window.location.href = '/';
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label>
        Name:
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email:
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Phone:
        <input name="phone" value={values.phone} onChange={handleChange} />
      </label>

      <label>
        Notes:
        <textarea name="notes" value={values.notes} onChange={handleChange} />
      </label>

      <button type="submit">Add Contact</button>
    </form>
  );
}

export default CreateContact;
