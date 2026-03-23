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
    e.prventDefault();

    await fetch('http://localhost:3000/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    alert('contact created!');
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
