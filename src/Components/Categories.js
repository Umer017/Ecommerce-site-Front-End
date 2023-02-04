import React from 'react'
import { useParams } from 'react-router-dom'
import CategoryProducts from './CategoryProducts'
import { ProductFetcher } from '../fetcher'
const Categories = () => {

  const [products, setProducts] = React.useState({ errMessage: '', Data: [], })
  const { categoryId } = useParams()

  React.useEffect(() => {
    const fetchIt = async () => {
      const responseObject = await ProductFetcher(categoryId);
      setProducts(responseObject);
      console.log();
    }
    fetchIt()
  }, [categoryId])

  const renderProducts = () => {
    // let ProductList = [];
    // for(let i = 0;i<products.Data.length;i++){
    //   ProductList.push(<Products OnProductsClick={() => (ProductHandler(products[i].Data.id))} key={products[i].Data.id} id={products[i].Data.id} title={products[i].Data.title} />)
    // }
    return (
      products.Data.map(p =>
        <CategoryProducts key={p.id} {...p}>{p.title}</CategoryProducts>
      )
    )
  }
  return (
    <div>
      {products.errMessage && <div>Error :- {products.errMessage}</div>}
      {products.Data && renderProducts()}
    </div>
  )
}

export default Categories