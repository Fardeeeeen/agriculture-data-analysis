import React from 'react';
import { MantineProvider } from '@mantine/core';
import DataTable from './components/DataTable';
import './App.css';

const App = () => {
  return (
    <MantineProvider theme={{ colorScheme: 'light' }}>
      <div className="App">
        <DataTable />
      </div>
    </MantineProvider>
  );
};

export default App;