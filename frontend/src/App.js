import { useEffect, useState } from 'react';
import './App.css';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import {BrowserRouter, Route, Routes }  from 'react-router-dom'
import Home from './components/home/Home';
import ProductDetails from './components/product_details/ProductDetails';
import { useDispatch, useSelector } from 'react-redux';
import { productListAction } from './redux/action/productAction';
import SearchPage from './components/search/search';
import Cart from './components/cart/cart';
import EmptyCart from './components/cart/EmptyCart';
import ViewAll from './components/home/viewAll';
import AboutUs from './components/about/about';
import Card from '../src/components/home/card'
import Product from './components/ProductPage/product';
function App() {


  return (
      <BrowserRouter >
          <div className="App">
            <div>
              <Header />
             <div className='wrapper'>
              <Routes >
                <Route path='/' element={<Home/>} />
                <Route path='/product_details/:_id' element={<ProductDetails />}  />
                <Route path='/search/:key' element={<SearchPage />}  />
                <Route path='/all' element={<ViewAll />}  />
                <Route path='/cart' element={<Cart />}  />
                <Route path='/products' element={<Product />}  />
                <Route path='/about' element={<AboutUs />}  />
              </Routes>
              </div> 
            </div>
            <div>
            <Footer />
            </div>
          </div>
      </BrowserRouter>
  );
}
export default App;
