import './App.css';
import React, { useState, useEffect } from 'react';
import { CategorieFetcher } from './fetcher';
import Layout from './Components/Layout';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ProductDetails from './Components/ProductDetails';
import Basket from './Components/Basket';
import Checkout from './Components/Checkout';
import Categories from './Components/Categories';
import Home from './Components/Home';
import ConfirmOrder from './Components/ConfirmOrder';
import SearchResult from './Components/SearchResult';

function App() {
  const [Categorie, setCategories] = useState({ errMessage: '', Data: [] });

  useEffect(() => {
    const WaitFetch = async () => {
      const data = await CategorieFetcher();
      setCategories({ errMessage: data.errMessage, Data: data.Data });
    }
    WaitFetch();
  }, [])

  // function CategoryHandler(id) {
  //   const fetch = async () => {
  //     const responseObject = await ProductFetcher(id)
  //     setProducts(responseObject)
  //   }
  //   fetch()
  // }

  

  // function ProductHandler(i) {
  //   alert(i);
  // }

  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout Categorie={Categorie} />}>
      <Route index element={<Home />}/>
      <Route path='/basket' element={<Basket />}/>
      <Route path='/checkout' element={<Checkout />}/>
      <Route path='/product/:productId' element={<ProductDetails />}/>
      <Route path='/ConfimOrder' element={<ConfirmOrder/>}/>
      <Route path='/SearchResult' element={<SearchResult/>}/>
      <Route path='/categorie/:categoryId' element={<Categories />}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
