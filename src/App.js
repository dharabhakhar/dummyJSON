import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import Home from './Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Item1 from './item1';
import AddToCart from './AddToCart';

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<Item1/>} />
            <Route path='/cart' element={<AddToCart/>} />
          </Routes>
          {/* <Link to="/item" >click</Link> */}
        </BrowserRouter>
    </>
  );
}

export default App;
