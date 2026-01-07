import {lazy, Suspense} from 'react';
import './App.css';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import {BrowserRouter, Outlet, Route, Routes }  from 'react-router-dom'
import Home from './components/home/Home';
import Loader from './components/Loader/Loader';

const RegisterForm = lazy(()=>import('./components/RegisterForm/RegisterForm'))
const LoginForm = lazy(()=>import('./components/LoginForm/LoginForm'))
const SearchPage  = lazy(()=> import ( './components/search/search'))
const ProductDetails  = lazy(()=> import ( './components/product_details/ProductDetails'))
const Cart  = lazy(()=> import ( './components/cart/cart'))
const ViewAll  = lazy(()=> import ( './components/home/viewAll'))
const AboutUs  = lazy(()=> import ( './components/about/about'))
const Product  = lazy(()=> import ( './components/ProductPage/product'));

function App() {
  return (
      <BrowserRouter >
          <div className="App">
               <div>
              <Header />
                  <div className='wrapper'>
                <Routes >
                  <Route path='/' element={<Home/>} />

                  <Route element= {<Suspense fallback= {<Loader />} >
                        <Outlet  />
                    </Suspense>
                  }>
                    <Route path='/product_details/:_id' element={<ProductDetails />}  />
                    <Route path='/search/:key' element={<SearchPage />}  />
                    <Route path='/all' element={<ViewAll />}  />
                    <Route path='/cart' element={<Cart />}  />
                    <Route path='/products' element={<Product />}  />
                    <Route path='/about' element={<AboutUs />}  />
                    <Route path='/register' element={<RegisterForm />}  />
                    <Route path='/login' element={<LoginForm />}  />
                  </Route>
                </Routes>
                 </div> 
              </div>

               <Footer />

          </div>
      </BrowserRouter>
  );
}
export default App;
