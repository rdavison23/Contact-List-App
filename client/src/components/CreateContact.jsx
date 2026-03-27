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
    <div className="container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h2>Create Contact</h2>

          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input name="phone" value={values.phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={values.notes}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Add Contact</button>
        </form>
      </div>
    </div>
  );
}

export default CreateContact;
