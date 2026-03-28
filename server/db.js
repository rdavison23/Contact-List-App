import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: 'postgress://localhost:5432/contacts_db',
});

export default pool;
