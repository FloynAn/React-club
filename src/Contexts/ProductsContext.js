import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import {API} from '../Helpers/Constants'
import {API2} from '../Helpers/Constants'
import {calcSubPrice, calcTotalPrice} from '../Helpers/CalcPrice'
import { auth } from '../Firebase';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"

export const productContext = createContext()
const INIT_STATE = {
    products: null,
    edit: null,
    paginatedPages: 1,
    cart: {},
    cartLength: 0,
    favorite: {},
    favoriteLength: 0,
    detail:{},
    comments: null,    

}

const reducer = (state = INIT_STATE, action) => {
    switch(action.type){
        case "GET_PRODUCTS":
            return {
                ...state, products: action.payload.data,
                paginatedPages: Math.ceil(action.payload.headers ["x-total-count"] / 3)
            }
        case "GET_EDIT_PRODUCT":
            return {...state, edit: action.payload}
        case "CHANGE_CART_COUNT":
            return {...state, cart: action.payload}
        case "GET_CART":
            return {...state, cart: action.payload}
        case "CHANGE_FAVORITE_COUNT":
                return {...state, favorite: action.payload}
        case "GET_FAVORITE":
                return {...state, favorite: action.payload}
        case "GET_DETAIL_PRODUCT":
            return {...state, detail: action.payload}
        case "GET_COMMENTS":
            return {
                ...state, comments: action.payload
            }
        case "GET_EDIT_COMMENTS":
            return {...state, edit: action.payload}
        default: return state   
    }
}

const ProductsContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    // todo CREATE
    const addProduct = async(newProduct) =>{
        try {
            let res = await axios.post(API, newProduct)
            getProducts()
            return res
        } catch (error) {
            console.log(error);
        }
    }

    // todo READ
    const getProducts = async ()=> {
        try {
            let res = await axios(`${API}${window.location.search}`)
            let action = {
                type: "GET_PRODUCTS",
                payload: res
            }
            dispatch(action)
        } catch (error) {
            console.log(error);
        }
    }


    // todo UPDATE
    const editProduct = async(id) => {
       try {
            let res = await axios(`${API}/${id}`)
            let action ={
                type: "GET_EDIT_PRODUCT",
                payload:res.data
            }
        dispatch(action)
       } catch (error) {
        console.log(error);
       }
    }


    // todo SAVE EDITED PRODUCT
    const saveEditedProduct = async (updatedProduct) => {
        try {
            await axios.patch(`${API}/${updatedProduct.id}`, updatedProduct)
        } catch (error) {
            console.log(error);
        }
    }


    // todo DELETE
    const deleteProduct = async(id) => {
        await axios.delete(`${API}/${id}`)
        getProducts()
    }


    // todo CART
    const addProductInCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }

        let newProduct = {
            item: product,
            count: 1,
            subPrice: 0
        }

        let filteredCart = cart.products.filter(elem => elem.item.id === product.id)
        if (filteredCart.length > 0){
            cart.products = cart.products.filter(elem => elem.item.id !== product.id)
        }else {
            cart.products.push(newProduct)
        }
        newProduct.subPrice = calcSubPrice(newProduct)
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "CHANGE_CART_COUNT",
            payload: cart.products.length
        })
    }

    const getCartLength = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart){
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "CHANGE_CART_COUNT",
            payload: cart.products.length
        })
    }

    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart){
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "GET_CART",
            payload: cart
        })
    }

    const changeProductCount = (count, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.products = cart.products.map(elem => {
            if(elem.item.id == id){
                elem.count = count
                elem.subPrice = calcSubPrice(elem)
            }
            return elem
        })
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }

    const checkProductInCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart){
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newCart = cart.products.filter(elem => elem.item.id === id)
        return newCart.length>0 ? true : false
    } 


    // todo DELETE FROM CART
 
    const deleteFromCart =(id, price)=>{ 
        let items = JSON.parse(localStorage.getItem('cart')) 
        for (let i =0; i< items.products.length; i++) { 
          let targetItem = JSON.parse(items.products[i].item.id); 
          let targetItemPrice = JSON.parse(items.products[i].item.price); 
           
          if (targetItem == id) { 
              items.products.splice(i, 1); 
          } 
          if (targetItemPrice == price){ 
            items.totalPrice = items.totalPrice - price 
          } 
    } 
      items = JSON.stringify(items); 
      console.log(items) 
      localStorage.setItem("cart", items); 
      getCart() 
    }


    // todo DETAIL 


    const getDetail = async(id) => {
        const res = await axios(`${API}/${id}`)
        let action = {
            type: "GET_DETAIL_PRODUCT",
            payload: res.data
        }
        dispatch(action)
    }


     // todo FAVORITE
     const addProductInFavorite = (product) => {
        let favorite = JSON.parse(localStorage.getItem('favorite'))
        if (!favorite) {
            favorite = {
                products: [],
                totalPrice: 0
            }
        }

        let newProduct = {
            item: product,
            count: 1,
            subPrice: 0
        }

        let filteredFavorite = favorite.products.filter(elem => elem.item.id === product.id)
        if (filteredFavorite.length > 0){
            favorite.products = favorite.products.filter(elem => elem.item.id !== product.id)
        }else {
            favorite.products.push(newProduct)
        }
        newProduct.subPrice = calcSubPrice(newProduct)
        favorite.totalPrice = calcTotalPrice(favorite.products)
        localStorage.setItem('favorite', JSON.stringify(favorite))
        dispatch({
            type: "CHANGE_FAVORITE_COUNT",
            payload: favorite.products.length
        })
    }

    const getFavoriteLength = () => {
        let favorite = JSON.parse(localStorage.getItem('favorite'))
        if(!favorite){
            favorite = {
                products: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "CHANGE_FAVORITE_COUNT",
            payload: favorite.products.length
        })
    }

    const getFavorite = () => {
        let favorite = JSON.parse(localStorage.getItem('favorite'))
        if(!favorite){
            favorite = {
                products: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "GET_FAVORITE",
            payload: favorite
        })
    }

    const changeFavoriteCount = (count, id) => {
        let favorite = JSON.parse(localStorage.getItem('favorite'))
        favorite.products = favorite.products.map(elem => {
            if(elem.item.id == id){
                elem.count = count
                elem.subPrice = calcSubPrice(elem)
            }
            return elem
        })
        favorite.totalPrice = calcTotalPrice(favorite.products)
        localStorage.setItem('favorite', JSON.stringify(favorite))
        getFavorite()
    }

    const checkProductInFavorite = (id) => {
        let favorite = JSON.parse(localStorage.getItem('favorite'))
        if(!favorite){
            favorite = {
                products: [],
                totalPrice: 0
            }
        }
        let newFavorite = favorite.products.filter(elem => elem.item.id === id)
        return newFavorite.length>0 ? true : false
    } 


    // todo DELETE FROM FAVORITE
 
    const deleteFromFavorite =(id, price)=>{ 
        let items = JSON.parse(localStorage.getItem('favorite')) 
        for (let i =0; i< items.products.length; i++) { 
          let targetItem = JSON.parse(items.products[i].item.id); 
          let targetItemPrice = JSON.parse(items.products[i].item.price); 
           
          if (targetItem == id) { 
              items.products.splice(i, 1); 
          } 
          if (targetItemPrice == price){ 
            items.totalPrice = items.totalPrice - price 
          } 
    } 
      items = JSON.stringify(items); 
      console.log(items) 
      localStorage.setItem("favorite", items); 
      getFavorite() 
    }



    // todo SIGN IN / SIGN UP
    function signUp(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function signIn (email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout () {
        return signOut(auth)
    }


    function useAuth () {
        const [currentUser, setCurrentUser] = React.useState()

        React.useEffect(() => {
            const unsub = onAuthStateChanged(auth, user  =>
                setCurrentUser(user))
                return unsub
        }, [])
        
        return currentUser
    }

    // todo CREATE COMMENT
        const addComment = async(newComment) =>{
            console.log(newComment,"123");
            try {
                let res = await axios.post(API2, newComment)
                getComments()
                return res
            } catch (error) {
                console.log(error);
            }
        }
    
    // todo READ COMMENT
        const getComments = async ()=> {
            try {
                let res = await axios(`${API2}`)
                let action = {
                    type: "GET_COMMENTS",
                    payload: res.data
                }
                dispatch(action)
            } catch (error) {
                console.log(error);
            }
        }
    
    
    // todo DELETE COMMENT
        const deleteComment = async(id) => {
            await axios.delete(`${API2}/${id}`)
            getComments()
        }


    return (
        <productContext.Provider value={{
            addProduct,
            getProducts,
            editProduct,
            saveEditedProduct,
            deleteProduct,
            addProductInCart,
            getCartLength,
            getCart,
            changeProductCount,
            checkProductInCart,
            deleteFromCart,
            addProductInFavorite,
            getFavoriteLength,
            getFavorite,
            changeFavoriteCount,
            checkProductInFavorite,
            deleteFromFavorite,
            getDetail,
            signUp,
            signIn,
            useAuth,
            logout,
            addComment,
            getComments,
            deleteComment,
            products: state.products,
            edit: state.edit,
            paginatedPages: state.paginatedPages,
            cart: state.cart,
            cartLength: state.cartLength,
            favorite: state.favorite,
            favoriteLength: state.favoriteLength,
            detail: state.detail,
            comments: state.comments
        }}>

            {children}
        </productContext.Provider>
    );
};

export default ProductsContextProvider;