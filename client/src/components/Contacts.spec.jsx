import { expect, test, vi } from 'vitest';
import { render, fireEvent } from 'vitest-browser-react';
import { MemoryRouter } from 'react-router-dom';
import Contacts from './Contacts';

test('Contacts List renders', async () => {
  expect(true).toBe(true);
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const contacts = [
  { id: 1, name: 'Maki Wolde' },
  { id: 2, name: 'Sam Davison' },
];

test('renders contacts list', async () => {
  const { getByText } = await render(
    <MemoryRouter>
      <Contacts contacts={contacts} />
    </MemoryRouter>
  );

  await expect.element(getByText('Contacts')).toBeInTheDocument();
  await expect.element(getByText('Maki Wolde')).toBeInTheDocument();
  await expect.element(getByText('Sam Davison')).toBeInTheDocument();
});
