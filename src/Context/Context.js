import React,{ createContext,useReducer } from "react"
import { CartReducer } from "./CartReducer";

export const CartContext = createContext();

const Storage = localStorage.getItem('Cart') ? JSON.parse(localStorage.getItem('Cart')) : [];
const CartContextProvider =({children})=>{
    const initialState = { cartItems :Storage}
    const [state,dispatch] = useReducer(CartReducer,initialState)

    const addProduct = payload =>{
       dispatch({type:"ADD",payload})
       return state.cartItems
    }
    
    const removeProduct = payload=>{
        dispatch({type:'REMOVE',payload})
        return state.cartItems
    }

    const increaseQty =payload =>{
        dispatch({type:'INCQTY',payload})
        return state.cartItems
    }

    const decreaseQty = payload =>{
        dispatch({type:'DECQTY',payload})
        return state.cartItems
    }

    const clearBasket = () =>{
        dispatch({type:'CLEAR',payload:undefined})
        return state.cartItems
    }

    const getItems = () =>{
        return state.cartItems
    }

    const ContextValues = {
        addProduct,
        removeProduct,
        increaseQty,
        decreaseQty,
        clearBasket,
        getItems,
        ...state
    }

    
    return(
    <CartContext.Provider value= {ContextValues}>
        {children}
    </CartContext.Provider>
    )
}

export default CartContextProvider