
const Storage = (CartItems) =>{
    localStorage.setItem('Cart',JSON.stringify(CartItems.length > 0 ? CartItems : [] ))
}

export const CartReducer = (state,action) =>{
    let index = -1
    if(action.payload)
        index = state.cartItems.findIndex(x => x.id === action.payload.id )
    
    let newArray = [...state.cartItems]
    switch(action.type){
    case "ADD":
    case "INCQTY":
        if(index === -1){
            //state.cartItems.push({...action.payload,quantity:1}) Badway
            newArray.push({...action.payload,quantity:1}) //GOOD WAY
        }
        else{
            newArray[index].quantity++
            //state.cartItems[index].quantity++;
        }
    break
    case "REMOVE":
        if(index > -1){
            //state.cartItems.splice(index,1) //Bad way cause splice mutate the state
            newArray = state.cartItems.filter(x => x.id !== action.payload.id)
        }
       break
    
    case "DECQTY":
        if(index > -1){
            // if(newArray[index]>1)
            // {
            newArray[index].quantity--
            //}
            //state.cartItems[index].quantity--
        }
         break
    case "CLEAR":
            newArray = []
        break
    default:
        break
    }

    state.cartItems = newArray
    Storage(newArray)
    return state


}