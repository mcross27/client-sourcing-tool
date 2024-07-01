// import React from 'react';
// import './App.css';
// import { CompanyProvider } from './contexts/CompanyContext';
// import { ContactProvider } from './contexts/ContactContext';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ContactTable from './components/ContactTable';
// import CompanyTable from './components/CompanyTable';

// function App() {
//   return (
//     <Router>
//       <CompanyProvider>
//         <ContactProvider>
//           <div className="App">
//             <header className="App-header">
//               <h1>Client Sourcing Tool</h1>
//             </header>
//             <main>
//               <Routes>
//                 <Route exact path="/" element={<CompanyTable />} />
//                 <Route path="/company/:companyId/contacts" element={ <ContactTable />} />
//               </Routes>
//             </main>
//           </div>
//         </ContactProvider>
//       </CompanyProvider>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import { CompanyProvider } from './contexts/CompanyContext';
import { ContactProvider } from './contexts/ContactContext';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import ContactTable from './components/ContactTable';
import CompanyTable from './components/CompanyTable';
import AddCompany from './components/AddCompany';
import AddContact from './components/AddContact';
import EmailTemplate from './components/EmailTemplate';

function App() {
  return (
    <Router>
      <CompanyProvider>
        <ContactProvider>
          <div className="App">
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Client Sourcing Tool
                </Typography>
                <Button color="inherit" component={Link} to="/">Companies</Button>
                <Button color="inherit" component={Link} to="/add-company">Add Company</Button>
                <Button color="inherit" component={Link} to="/add-contact">Add Contact</Button>
                <Button color="inherit" component={Link} to="/email-template">Email Templates</Button>
              </Toolbar>
            </AppBar>
            <Container>
              <Routes>
                <Route exact path="/" element={<CompanyTable />} />
                <Route path="/company/:companyId/contacts" element={<ContactTable />} />
                <Route path="/add-company" element={<AddCompany />} />
                <Route path="/add-contact" element={<AddContact />} />
                <Route path="/email-template" element={<EmailTemplate />} />
              </Routes>
            </Container>
          </div>
        </ContactProvider>
      </CompanyProvider>
    </Router>
  );
}

export default App;