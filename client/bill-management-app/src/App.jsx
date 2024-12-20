import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoginForm from './components/Login'
import CustomerTable from './components/CustomerTable'
import BillGenerator from './components/BillGenerator'
import Sidenav from './components/SideNav';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = createTheme();

  const handleLogin = () => setIsLoggedIn(true);

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box sx={{ flex: 1, p: 3 }}>
          <Routes>
            <Route path="/customers" element={<CustomerTable />} />
            <Route path="/bill-generator" element={<BillGenerator />} />
            <Route path="*" element={<Navigate to="/customers" />} />
          </Routes>
        </Box>
      </Box>
    </Router>
    </ThemeProvider>
  );
};

export default App;