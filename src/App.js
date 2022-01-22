import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Header from './features/header/Header';
import WeatherTable from './features/weatherTable/WeatherTable';

function App() {
  return (
    <div className="App">
      <Header />
      <WeatherTable />
    </div>
  );
}

export default App;
