import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { categoriesProduct } from '../../redux/product';

export const CategoriProducts = () => {
  const categoriProducts = useSelector((state) => state.products.categoriesProductData);
    const dispatch = useDispatch();
    const {categoriName} = useParams()
    useEffect(() =>{
        dispatch(categoriesProduct(`${categoriName}?page=1&size=20&sort=name,asc`))
    },[categoriName])
  return (
    <div>
    {categoriProducts.map((item) => {
     return <div key={item._id}>
      <h2>{item.name}</h2>
     </div>
    })}
    </div>
  )
};
