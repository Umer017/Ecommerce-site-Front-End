import React,{useContext} from 'react'
import {useParams} from 'react-router-dom'
import {ProductFetcherById} from '../fetcher'
import styled from 'styled-components'
import {CartContext} from '../Context/Context'

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

const CategoryProductInfoPrice = styled.div`
color: darkslategray;
  font-size: 2em;
  font-weight: bold;
  padding-top: 10px;`

  const ProductDescription = styled.div`
  grid-column: 1 / span 3;
  `


const ProductDetails = () => {
  const cartContext = useContext(CartContext)
  const {addProduct} = cartContext
  const {productId} = useParams();
  const [product,setProducts] = React.useState({ errMessage: '', Data:{}} ) 

  React.useEffect(()=>{
    const fetchIt = async () =>{
      const responseObject = await ProductFetcherById(productId);
      setProducts(responseObject);
      console.log();
    }
    fetchIt()
  },[productId])

  const createMarkup =()=>{
    return{__html:product.Data.description}
  }



  

  return (
    <article>
    <CategoryProductTitle>
      {product.Data.title}
    </CategoryProductTitle>
    <figure>
        <CategoryProductImageContainer className='category-product-image-container'>
        <CategoryProductImage src={`../Resources/${product.Data.image}`} alt={product.Data.title} />
        </CategoryProductImageContainer>
    </figure>
    <aside>
        <CategoryProductInfo >
            <CategoryProductInfoH3>demensions :-</CategoryProductInfoH3>
            <label>{product.Data.specs?.demension || "data not loaded"}</label>
        </CategoryProductInfo >
        { product.Data.specs?.capacity&&
        <CategoryProductInfo >
            <CategoryProductInfoH3>capacity :-</CategoryProductInfoH3>
            <label>{product.Data.specs?.capacity}</label>
        </CategoryProductInfo >
        }
        <div className='category-product-info-features'>
            <CategoryProductInfoH3>features</CategoryProductInfoH3>
            <ul>
            {
                product.Data.features?.map((f,i) => {
                  return  <li key={`feature${i}`}>{f}</li>
                })
            }
            </ul>
        </div>
    </aside>
    <aside className='category-product-finance'>
        <CategoryProductInfoPrice>
           &#8377;{product.Data.price}
        </CategoryProductInfoPrice>
        
        <CategoryProductInfoStock>
          <CategoryProductInfoStockLabel>stock available :- {product.Data.stock}</CategoryProductInfoStockLabel>
          <label>FREE Delivery</label>
        </CategoryProductInfoStock>
        <CategoryProducAction>
          <CategoryProductActionButton onClick={() => addProduct({title:product.Data.title,price:product.Data.price})}>Add to basket</CategoryProductActionButton>
        </CategoryProducAction>
    </aside>
    <ProductDescription dangerouslySetInnerHTML={createMarkup()}>
    </ProductDescription>
</article>
  )
}

export default ProductDetails