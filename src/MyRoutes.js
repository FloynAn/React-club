import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddProduct from './Components/Admin/AddProduct/AddProduct';
import EditProduct from './Components/Admin/EditProduct/EditProduct';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';
import Cart from './Components/Cart/Cart';
import PaymentForm from './Components/Cart/PaymentForm';
import Favorites from './Components/Favorites/Favorites';
import MyNavbar from './Components/Header/MyNavbar';
import Home from './Components/Home/Home';
import Comments from './Components/Home/Sidebar/Comments/Comments';
import ProductDetail from './Components/Product/ProductDetail/ProductDetail';
import ProductsContextProvider from './Contexts/ProductsContext';

const MyRoutes = () => {

    return (
        <ProductsContextProvider>
            <BrowserRouter>
                <MyNavbar/>
                        <Routes>
                            <Route path='/add' element={<AddProduct/>} />
                            <Route path='/' element={<Home/>} />
                            <Route path='/cart' element={<Cart/>} />
                            <Route path='/favorites' element={<Favorites/>} />
                            <Route path='/edit/:id' element={<EditProduct/>} />
                            <Route path='/detail/:id' element={<ProductDetail/>} />
                            <Route path='/register' element={<Register/>} />
                            <Route path='/login' element={<Login/>} />
                            <Route path='/payment' element={<PaymentForm/>}/>
                            <Route path='/comments' element={<Comments/>}/>
                        </Routes>
            </BrowserRouter>
        </ProductsContextProvider>
    );
};

export default MyRoutes;