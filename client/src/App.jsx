import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/add" element={<AddItem/>} />
          <Route path="/edit/:id" element={<EditItem/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
