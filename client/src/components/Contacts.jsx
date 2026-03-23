import { Link } from 'react-router-dom';

function Contacts({ contacts }) {
  return (
    <div>
      <h2>All Contacts</h2>
      <ul>
        {contacts.map((c) => (
          <li key={c.id}>
            <Link to={`/contacts/${c.id}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
