import React,{useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { CartContext } from '../Context/Context'

const CategoryProductTitle = styled.div`
grid-column: 1 / span 3;
color: darkslategrey;
font-weight: bold;
font-size: 1.5em;
padding-left: 10px;
`

const CategoryProductImageContainer = styled.div`
height: 10;
width: 60%;
`
const CategoryProductImage = styled.img`
width: 100%;
height: 100%
`

const CategoryProductInfo = styled.div`
display: flex;
flex-direction: column; 
`
const CategoryProductInfoH3 = styled.h3`
color: darkslategrey;
font-size: 1em;
font-weight: bold;
padding-top: 10px;
padding-bottom: 5px;
`

const CategoryProductInfoStockLabel = styled.label`
padding-bottom: 5px;
`

const CategoryProductInfoStock = styled.div`
padding-left: 10px;
margin-top: 20px;
padding-top: 10px;
background-color: lightgray;
height: 20%;
width: 40%;
border-radius: 5px;
font-weight: bold;
display: flex;
flex-direction: column;
`
const CategoryProducAction = styled.div`
display: flex;
flex-direction: column;
`

const CategoryProductActionButton = styled.button`
width: 160px;
height: 30px;
border-radius: 10px;
margin-top: 20px;
background-color: lightcyan;
border: solid 1px slategrey;
font-weight: bold;
border-radius: 5%;
`
const CategoryProductSecondButton = styled.button`
width: 160px;
height: 30px;
border-radius: 10px;
margin-top: 20px;
background-color: darkslategray;
border: solid 1px slategrey;
font-weight: bold;
border-radius: 5%;
`

const CategoryProductInfoPrice = styled.div`
color: darkslategray;
font-size: 2em;
font-weight: bold;
padding-top: 10px;
`

const CategoryProducts = ({id,title,image,specs,features,price,stock}) => {
  const cartContext = useContext(CartContext);
  const {addProduct} = cartContext;
  const navigate = useNavigate()
 
  return (
    <article>
        <CategoryProductTitle>
          <Link to={`/product/${id}`}>{title}</Link>
        </CategoryProductTitle>
        <figure>
            <CategoryProductImageContainer >
            <CategoryProductImage src={`/Resources/${image}`} alt={title} />
            </CategoryProductImageContainer>
        </figure>
        <aside>
            <CategoryProductInfo>
                <CategoryProductInfoH3>demensions :-</CategoryProductInfoH3>
                <label>{specs.demension}</label>
            </CategoryProductInfo>
            { specs.capacity &&
            <CategoryProductInfo>
                <CategoryProductInfoH3>capacity :-</CategoryProductInfoH3>
                <label>{specs.capacity}</label>
            </CategoryProductInfo>
            }
            <div className='category-product-info-features'>
                <CategoryProductInfoH3>features</CategoryProductInfoH3>
                <ul>
                {
                    features?.map((f,i) => {
                      return  <li key={`feature${i}`}>{f}</li>
                    })
                }
                </ul>
            </div>
        </aside>
        <aside className='category-product-finance'>
            <CategoryProductInfoPrice>
               &#8377;{price}
            </CategoryProductInfoPrice>
            
            <CategoryProductInfoStock>
              <CategoryProductInfoStockLabel>stock available :- {stock}</CategoryProductInfoStockLabel>
              <CategoryProductInfoStockLabel>FREE Delivery</CategoryProductInfoStockLabel>
            </CategoryProductInfoStock>
            <CategoryProducAction >
              <CategoryProductActionButton onClick={() => navigate(`/product/${id}`) }>view product</CategoryProductActionButton>
              <CategoryProductSecondButton onClick={() =>addProduct({id,title,price})}>Add to basket</CategoryProductSecondButton>
            </CategoryProducAction >
        </aside>
    </article>
  )
}

export default CategoryProducts