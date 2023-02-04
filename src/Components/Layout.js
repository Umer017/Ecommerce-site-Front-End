import React from 'react'
import { Outlet,Link,useNavigate } from 'react-router-dom'
import { HomeIcon,CartIcon } from './icons'
import Search from './Search'
const Layout = ({Categorie}) => {

  const navigate = useNavigate()

    const renderCategories = () => {
        let categoriesList = [];
        for (let i = 0; i < Categorie.Data.length; i++) {
             categoriesList.push(<li key={Categorie.Data[i].id}><Link to={`/categorie/${Categorie.Data[i].id}`}>{Categorie.Data[i].title}</Link></li>)
          // categoriesList.push(<Categories OncategoryClick={() => (CategoryHandler(Categorie.Data[i].id))} key={Categorie.Data[i].id} id={Categorie.Data[i].id} title={Categorie.Data[i].title} />)
        }
        return (
          categoriesList
          // results.map(d => (
          //   <Categories key={d.id} id={d.id} title={d.title} />
          // ))
        )
      }

  return (
    <>
      <header>
        <div id="HeaderHomeicon">
          <HomeIcon  width={40} onClick={()=> navigate('/')}  />
        </div>
        <Search />
        <div id="HeaderTitle"> My store</div>
        <div id="HeaderCartIcon" >
          <CartIcon width={40}  onClick={()=> navigate('/basket')}  />
        </div>
      </header>
      <section>
        <nav>
          {Categorie.errMessage && <div>Error :- {Categorie.errMessage}</div>}
          <ul>
            {Categorie.Data && renderCategories()}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </section>
      <footer><Link to="/">Home</Link> || <Link to="/basket">Basket</Link></footer>

    </>
  )
}

export default Layout