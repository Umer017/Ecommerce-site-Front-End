import React,{useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import {CartContext} from '../Context/Context'
import { useNavigate,Link } from 'react-router-dom';
import {DownIcon,UpIcon,TrashIcon} from './icons'



const BasketContainer = styled.div`
  display:grid;
  padding:20px;
  grid-template-rows: 0.25fr 1fr 0.25fr;
  grid-template-columns: 15fr 1fr 0.1fr;
`;

const BasketTable = styled.div`
grid-colum: 1 / span 3;
grid-template-rows: 0.25fr 1fr 0.25fr 0.25fr;
column-gap:20px;
padding-left:10px;
`;

const BasketHeader = styled.div`
 display:grid;
 grid-template-columns: 1fr 0.5fr 0.5fr
`;
const BasketHeaderLine = styled.hr `
 margin-bottom:20px;
 border:1px solid gray;
`;

const BasketTitle = styled.div `
grid-column:1 /span 2;
padding-bottom:20 px;
`;

const BasketQty = styled.h3`
font-size:18px
font-weight:bold;
display:grid;
grid-template-columns:0.1fr 0.05fr 0.1fr 0.1fr;
`;

const BasketPrice = styled.h3`
font-size:20px;
font-weight: bold;
`

const BasketTotal = styled.h2`
justify-self:end;
`
const BasketButton = styled.button`
border-radius:8px;
// height:4px;
`

const Basket = () => {
  const [cartItems,setCartItems] = useState([])
  const  navigate = useNavigate()
  const {getItems,clearBasket,increaseQty,decreaseQty,removeProduct} = useContext(CartContext)
  useEffect(()=>{
    setCartItems(getItems())
  },[getItems])
  
  const RenderCart =() =>{
    
    if(cartItems.length > 0){
    return cartItems.map((p)=>(
      <React.Fragment key={p.id}>
       <div>
        <Link to={`/product/${p.id}`}>{p.title}</Link>
       </div>
       <BasketQty>
          {p.quantity}
          <UpIcon width={20} onClick={() => setCartItems(increaseQty({id:p.id})) }/>
          <DownIcon width={20} onClick={() => setCartItems(decreaseQty({id:p.id}))}/>
          <TrashIcon width={20} onClick={() => setCartItems(removeProduct({id:p.id})) }/>
       </BasketQty>
       <BasketPrice>
       &#8377;{p.price}
       </BasketPrice>

       </React.Fragment>
    ));
  }else{
    return <div>{"Empty"}</div>
  }
  }

  const renderTotal = ()=>{
    const cartItems = getItems();
    const Total = cartItems.reduce((Total,item)=> (Total + item.price * item.quantity),0)
    return Total;
  }

  
  return (
    <BasketContainer>
      <BasketTitle>Shopping Basket</BasketTitle>
      <BasketButton onClick={() => navigate('/checkout')}>Checkout</BasketButton>
      <BasketTable>
        <BasketHeader>
          <h4>Item</h4>
          <h4>Quantatity</h4>
          <h4>Price</h4>
       </BasketHeader>
       <BasketHeaderLine />

       <BasketHeader>
        {RenderCart()}
       </BasketHeader>

       <BasketHeaderLine />

<BasketButton onClick={() => setCartItems(clearBasket())}>Clear</BasketButton>
<BasketTotal>{renderTotal()}</BasketTotal>
      </BasketTable>
      </BasketContainer>
  )
}

export default Basket