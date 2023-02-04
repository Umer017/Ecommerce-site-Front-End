import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductSearch } from '../fetcher'
import CategoryProducts from './CategoryProducts'
const SearchResult = () => {
    const [Search, setSearch] = React.useState({ errMessage: '', Data: [], })
    const [useparams] = useSearchParams();
    const query = useparams.get('q');
    React.useEffect(() => {
        const fetchIt = async () => {
            const responseObject = await ProductSearch(query);
            setSearch(responseObject);
            console.log();
        }
        fetchIt()
    }, [query])

    const renderProducts = () => {
      if(Search.Data.length>0)
      {
        return (
          Search.Data.map(p =>
            <CategoryProducts key={p.id} {...p}>{p.title}</CategoryProducts>
          )
        )
      }else{
        return <div>No results found</div>
      }
        
    }
    

    return (
        <div>
        {Search.errMessage && <div>Error :- {Search.errMessage}</div>}
        {Search.Data && renderProducts()}
      </div>
    )
}

export default SearchResult