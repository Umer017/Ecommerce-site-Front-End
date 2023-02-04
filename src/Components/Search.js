import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const [SearchTerm,setSearchTerm] = useState();
  const navigate = useNavigate();
  
  useEffect(()=>{
    const delay = setTimeout(()=>{
      if(SearchTerm){
        navigate('/SearchResult?q='+ SearchTerm)
      }
    },500)
    return () => clearTimeout(delay)
  },[SearchTerm])
  
    const SearchHandler =(ev) =>{
      setSearchTerm(ev.target.value)
    }
  return (
    <div id='search'>
        <label>search</label>
        <input type="text" onChange={(e) => SearchHandler(e)}></input>
    </div>
  )
}

export default Search