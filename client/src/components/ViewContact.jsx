import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ViewContact() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await fetch(`http://localhost:3000/api/contacts/${id}`);
      const data = await res.json();
      setContact(data);
    };
    fetchContacts();
  }, [id]);
  if (!contact) return <p>loading..</p>;
  return (
    <div className="container">
      <div className="card">
        <h2>{contact.name}</h2>

        <p>
          <strong>Email:</strong> {contact.email}
        </p>
        <p>
          <strong>Phone:</strong> {contact.phone}
        </p>
        <p>
          <strong>Notes:</strong> {contact.notes}
        </p>

        <h3>Tags</h3>
        <ul>
          {contact.tags?.map((tag) => (
            <li key={tag.id}>{tag.label}</li>
          ))}
        </ul>

        <button
          className="secondary"
          onClick={async () => {
            await fetch(`http://localhost:3000/api/contacts/${id}`, {
              method: 'DELETE',
            });
            alert('Contact deleted');
            window.location.href = '/';
          }}>
          Delete Contact
        </button>

        <button onClick={() => (window.location.href = `/edit/${id}`)}>
          Edit Contact
        </button>
      </div>
    </div>
  );
}

export default ViewContact;
