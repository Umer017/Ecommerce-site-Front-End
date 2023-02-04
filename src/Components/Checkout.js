import React,{useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const [fields,setFiels] = useState({
    name:'',
    email:'',
    shippingAddress1:''
  })

  const errors = {
    name:fields.name.length === 0,
    email:fields.email.length === 0,
    shippingAddress1: fields.shippingAddress1.length === 0,
  };
  const disabled = Object.keys(errors).some((x) => errors[x])
  debugger;

  const onchangeHandler = ev =>{
    const {name,value} = ev.target;
    setFiels((prevState)=> {
      return{
        ...prevState,
        [name] : value
      }
    })
  }

  const navigate = useNavigate();

  const handleSubmit =(ev)=>{
    if(disabled){
      ev.preventDefault();
      return;
    }
    navigate('/ConfimOrder')
  }
  return (
    <form onSubmit={handleSubmit}>
    <CheckoutContainer>
      <CheckoutTitle>Shopping Checkout</CheckoutTitle>
      <CheckoutHeader>
        <h4>Your details</h4>
      </CheckoutHeader>
      <CheckoutHeaderLine />
      <CheckoutTable>
        <CheckoutFormLabel>name</CheckoutFormLabel>
        <input type="text" name="name" onChange={onchangeHandler} placeholder=" enter your Name" />
        <CheckoutFormLabel>Email</CheckoutFormLabel>
        <input type="text" name="email" onChange={onchangeHandler} placeholder="enter your email"/>
      </CheckoutTable>
      <CheckoutHeader>
       <h2>Address Details</h2> 
      </CheckoutHeader>
      <CheckoutHeaderLine />
      <CheckoutTable>
        <CheckoutFormLabel>Copy to shipping</CheckoutFormLabel>
        <CheckoutFormCheckbox type="checkbox"/>
        <CheckoutFormLabel> billing Address</CheckoutFormLabel>
        <CheckoutAddress>
          <input type="text" name="billing-address1" />
          <input type="text" name="billing-address2"/>
          <input type="text" name="billing-city"/>
        </CheckoutAddress>
        <CheckoutFormLabel>Shipping address</CheckoutFormLabel>
        <CheckoutAddress>
          <input type="text" name="shippingAddress1" onChange={onchangeHandler} placeholder="Enter line 1" />
          <input type="text" name="shippingaddress2"/>
          <input type="text" name="shipping-city"/>
        </CheckoutAddress>
      </CheckoutTable>
      <CancelButton onClick={() => navigate("/basket")}>
        Cancel
      </CancelButton>
      <CheckoutButton type='submit' disabled={disabled}>
        confirm order
      </CheckoutButton>
    </CheckoutContainer>
    </form>
  )
}

export default Checkout





const CheckoutContainer = styled.div`
display:grid;
padding:20px;
grid-template-rows:0.25fr 1fr 0.25fr 0.25fr 0.25fr 0.5fr;
grid-template-columns:0.1fr 1fr 0.1fr ;
`

const CheckoutTable = styled.div`
grid-column:1 / span 3;
display: grid;
grid-template-rows:0.25fr 1fr 0.25fr 0.25fr 0.5fr;
grid-template-columns:0.1fr 0.4fr 0.1fr 0.4fr;
column-gap:20px;
padding-left:10px;

`

const CheckoutHeader = styled.div`
grid-column: 1 / span 3;
padding-top:20px;
`

const CheckoutHeaderLine = styled.hr`
grid-column: 1/span 3;
margin-bottom:20px;
border: 1px solid gray;
`


const CheckoutTitle = styled.h2`
grid-column: 1 / span 2;
padding-bottom:20px;
`


const CheckoutAddress = styled.div`
display:grid;
grid-template-rows:0.25fr 0.25fr 0.25fr 0.25fr;
grid-template-column:1fr;
grid-row-gap:10px;
`

const CheckoutFormLabel = styled.label`
justify-self:end`;


const CheckoutFormCheckbox = styled.input`
grid-column:2 / span 3;
justify-self:start;
margin-bottom:20px;
`

const CheckoutButton = styled.button`
border-radius:8px
height:40px;
grid-column:3;
`

const CancelButton = styled.button`
border-radius : 8px;
height:40px;
grid-column:1;
`