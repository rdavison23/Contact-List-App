import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Contacts from './components/Contacts';
import ViewContact from './components/ViewContact';
import CreateContact from './components/CreateContact';
import { useState, useEffect } from 'react';

function App() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');

  // Fetch all contacts from backend
  const fetchContacts = async () => {
    try {
      setError('');
      const res = await fetch('http://localhost:3000/api/contacts');
      if (!res.ok) throw new Error('Failed to load contacts');
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Router>
      <header>
        <h1>Contact List</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/create">New Contact</Link>
        </nav>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <Routes>
        <Route path="/" element={<Contacts contacts={contacts} />} />
        <Route path="/contacts/:id" element={<ViewContact />} />
        <Route path="/create" element={<CreateContact />} />
      </Routes>
    </Router>
  );
}

export default App;
