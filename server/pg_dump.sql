--
-- PostgreSQL database dump
--

\restrict Hb1MArn4XOR810HlklUcW1yQQDCJhBgX1ozjsbfVcApQgezwNTWEFOtnylhUL7D

-- Dumped from database version 18.1 (Homebrew)
-- Dumped by pg_dump version 18.1 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: contact_tags; Type: TABLE; Schema: public; Owner: redu
--

CREATE TABLE public.contact_tags (
    contact_id integer NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE public.contact_tags OWNER TO redu;

--
-- Name: contacts; Type: TABLE; Schema: public; Owner: redu
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    notes text
);


ALTER TABLE public.contacts OWNER TO redu;

--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: redu
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contacts_id_seq OWNER TO redu;

--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: redu
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: redu
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    label text NOT NULL
);


ALTER TABLE public.tags OWNER TO redu;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: redu
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tags_id_seq OWNER TO redu;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: redu
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Data for Name: contact_tags; Type: TABLE DATA; Schema: public; Owner: redu
--

COPY public.contact_tags (contact_id, tag_id) FROM stdin;
1	2
4	1
2	1
3	1
\.


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: redu
--

COPY public.contacts (id, name, email, phone, notes) FROM stdin;
1	Andrew Harris	andrew@example.com	725-131-3422	Loves algorithms
2	Grace Davison	grace@example.com	555-333-2344	Loves to sing
3	Maki Wolde	maki@example.com	207-345-2344	Loves to learn
4	Pam Davison	pam@example.com	414-554-5666	Enjoys puzzles
5	Ruhama	ruhama@example.com	424-345-1234	Family
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: redu
--

COPY public.tags (id, label) FROM stdin;
1	Family
2	Work
3	Friend
\.


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: redu
--

SELECT pg_catalog.setval('public.contacts_id_seq', 9, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: redu
--

SELECT pg_catalog.setval('public.tags_id_seq', 3, true);


--
-- Name: contact_tags contact_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.contact_tags
    ADD CONSTRAINT contact_tags_pkey PRIMARY KEY (contact_id, tag_id);


--
-- Name: contacts contacts_email_key; Type: CONSTRAINT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_email_key UNIQUE (email);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: contact_tags contact_tags_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.contact_tags
    ADD CONSTRAINT contact_tags_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES public.contacts(id) ON DELETE CASCADE;


--
-- Name: contact_tags contact_tags_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.contact_tags
    ADD CONSTRAINT contact_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict Hb1MArn4XOR810HlklUcW1yQQDCJhBgX1ozjsbfVcApQgezwNTWEFOtnylhUL7D

