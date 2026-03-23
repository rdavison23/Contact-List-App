
-- RESET DATABASE (drops old tables)
DROP TABLE IF EXISTS contact_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS contacts;

-- CREATE TABLES
-- Contacts table
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  notes TEXT
);

-- Tags table
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL
);

-- Join table (many-to-many)
CREATE TABLE contact_tags (
  contact_id INTEGER REFERENCES contacts(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (contact_id, tag_id)
);

-- INSERT YOUR CONTACTS
INSERT INTO contacts (name, email, phone, notes) VALUES
('Andrew Harris', 'andrew@example.com', '725-131-3422', 'Loves algorithms'),
('Grace Davison', 'grace@example.com', '555-333-2344', 'Loves to sing'),
('Maki Wolde', 'maki@example.com', '207-345-2344', 'Loves to learn'),
('Pam Davison', 'pam@example.com', '414-554-5666', 'Enjoys puzzles'),
('Ruhama Davison', 'ruhama@example.com', '424-345-1234', 'Family'),
('Paige Crooks', 'paige@example.com', '424-333-1234', 'Friend');




-- INSERT TAGS (you can change these anytime)
INSERT INTO tags (label) VALUES
('Family'),
('Work'),
('Friend'),
('School'),
('Other');


-- LINK CONTACTS TO TAGS
-- (You can customize these however you want)

-- Andrew → School
INSERT INTO contact_tags (contact_id, tag_id) VALUES (1, 4);

-- Grace → Family
INSERT INTO contact_tags (contact_id, tag_id) VALUES (2, 1);

-- Maki → Family
INSERT INTO contact_tags (contact_id, tag_id) VALUES (3, 1);

-- Pam → Family
INSERT INTO contact_tags (contact_id, tag_id) VALUES (4, 1);

-- Ruhama → Family
INSERT INTO contact_tags (contact_id, tag_id) VALUES (5, 1);

-- Paige → Friend
INSERT INTO contact_tags (contact_id, tag_id) VALUES (6, 3);
