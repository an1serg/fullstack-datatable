import React from 'react';
// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import ChangeRowModal from 'components/Modals/ChangeRowModal';
import AddRowModal from 'components/Modals/AddRowModal';
import theme from 'assets/theme';
import Layout from 'components/Layout';
import Homepage from 'pages/Homepage';
import PersonTable from 'pages/PersonTable';
import BookTable from 'pages/BookTable';
import Notfoundpage from 'pages/Notfoundpage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />
      <AddRowModal />
      <ChangeRowModal />
      {/* <Sidenav brandName='Мои таблицы' routes={routes} /> */}

      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path='persons' element={<PersonTable />} />
          <Route path='books' element={<BookTable />} />
          <Route path='*' element={<Notfoundpage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
