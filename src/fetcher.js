const BASE_URL = "http://localhost:3002";
export const fetcher = async(url)=>{
    const responseObject = {
        errMessage:'',
        Data:[]
    }
    try{
    const reponse = await fetch(BASE_URL + url)
    if(!reponse.ok){
        throw new Error(`HTTP Error ${reponse.status}`)
    }
    const responseData = await reponse.json();
    responseObject.errMessage ='';
    responseObject.Data = responseData
    }
    catch(err){
        responseObject.errMessage = err.message;
    }
    return responseObject;
    
}

// const fetcher = async(url)=>{
//     await fetch(BASE_URL + url)
//     .then(response => response.json())
//     .then(data => {
//       return data;

export const CategorieFetcher = () =>{
    return fetcher('/Categories');
}

export const ProductFetcher = (id) =>{
    return fetcher('/Products?catid='+id)
}

export const ProductFetcherById = (id) =>{
    return fetcher(`/Products/${id}`)
}

export const ProductSearch = (query) =>{
    return fetcher('/Products?q='+query)
}