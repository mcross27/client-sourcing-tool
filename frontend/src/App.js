import React from 'react';
import './App.css';
// import LoginButton from './components/LoginButton';
// import LogoutButton from './components/LogoutButton';
// import { useAuth0 } from '@auth0/auth0-react';
import { CompanyProvider } from './contexts/CompanyContext';
import { ContactProvider } from './contexts/ContactContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddCompany from './components/AddCompany';
import ContactTable from './components/ContactTable';
import AddContact from './components/AddContact';
import CompanyTable from './components/CompanyTable';
import ContactList from './components/ContactList';

function App() {
  // const { isAuthenticated } = useAuth0();
  return (
    <Router>
      <CompanyProvider>
        <ContactProvider>
          <div className="App">
            <header className="App-header">
              <h1>Client Sourcing Tool</h1>
              {/* {isAuthenticated ? <LogoutButton /> : <LoginButton />} */}
            </header>
            <main>
              <AddCompany />
              <AddContact />
              <Routes>
                <Route exact path="/" element={<CompanyTable />} />
                <Route path="/company/:companyId/contacts" element={ <ContactTable />} />
              </Routes>
            </main>
          </div>
        </ContactProvider>
      </CompanyProvider>
    </Router>
  );
}

export default App;