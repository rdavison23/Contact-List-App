import { Link, useNavigate } from 'react-router-dom';

function Contacts({ contacts }) {
  const navigate = useNavigate(); 

  return (
    <div className="container">
      <h1 className="page-title">Contacts</h1>

      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="contact-item"
          onClick={() => navigate(`/contacts/${contact.id}`)}>
          {contact.name}
        </div>
      ))}
    </div>
  );
}

export default Contacts;
