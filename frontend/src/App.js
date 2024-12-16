import React from 'react';
import ContactsIndex from './pages/ContactsIndex';
import AddContactPage from './pages/AddContactPage';
import ContactDetailsPage from './pages/ContactDetailsPage';
import { useRoutes } from 'react-router-dom';

const routes = [
  {
    path: "/",
    element: <ContactsIndex />,
  },
  {
    path: "/contacts/add",
    element: <AddContactPage />,
  },
  {
    path: "/contacts/:id",
    element: <ContactDetailsPage />,
  },
];

function App() {
  const routing = useRoutes(routes);
  return routing;
}

export default App;
