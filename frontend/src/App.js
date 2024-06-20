import React from 'react';
import './App.css';
// import LoginButton from './components/LoginButton';
// import LogoutButton from './components/LogoutButton';
// import { useAuth0 } from '@auth0/auth0-react';
import { CompanyProvider } from './contexts/CompanyContext';
import { ContactProvider } from './contexts/ContactContext';
import CompanyList from './components/CompanyList';
import AddCompany from './components/AddCompany';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import EditableTable from './components/EditableTable';

function App() {
  // const { isAuthenticated } = useAuth0();
  return (
    <CompanyProvider>
      <ContactProvider>
        <div className="App">
          <header className="App-header">
            <h1>Client Sourcing Tool</h1>
            {/* {isAuthenticated ? <LogoutButton /> : <LoginButton />} */}
          </header>
          <main>
            <AddCompany />
            <EditableTable />
            <AddContact />
            <ContactList />
          </main>
        </div>
      </ContactProvider>
    </CompanyProvider>
  );
}

export default App;