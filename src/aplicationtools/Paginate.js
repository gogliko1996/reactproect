import React from 'react'
import Pagination from '@mui/material/Pagination';

export const Paginate = ({totalPage, currentPage,changePage,querKey}) => {
  return ( 
    <Pagination 
    count={totalPage}
    page={+currentPage}
    onChange={ (_,value) => { 
      changePage(querKey,value)
    }}
    />
  )
}
