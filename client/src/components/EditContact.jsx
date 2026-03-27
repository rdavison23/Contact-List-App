import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditContact() {
  const { id } = useParams();
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  useEffect(() => {
    const loadContact = async () => {
      const res = await fetch(`http://localhost:3000/api/contacts/${id}`);
      const data = await res.json();
      setValues(data);
    };
    loadContact();
  }, [id]);

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
      const res = await fetch(`http://localhost:3000/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error('Failed to update contact');
      }

      alert('Contact updated!');
      window.location.href = `/contacts/${id}`;
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h2>Edit Contact</h2>

          <div className="form-group">
            <label>Name</label>
            <input name="name" value={values.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" value={values.email} onChange={handleChange} />
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

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditContact;
