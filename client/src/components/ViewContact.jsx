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
    <div>
      <h2>{contact.name}</h2>
      <p>Email: {contact.email}</p>
      <p>phone: {contact.phone}</p>
      <p>Notes: {contact.notes}</p>

      <h3>tags:</h3>
      <ul>
        {contact.tags?.map((tag) => (
          <li key={tag.id}>tag.label</li>
        ))}
      </ul>
      <button
        onClick={async () => {
          await fetch(`http://localhost:4000/api/contacts/${id}`, {
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
  );
}

export default ViewContact;
