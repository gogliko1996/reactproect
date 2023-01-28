import { MenuItem, Select } from '@mui/material'
import React from 'react'

export const Sort = ({sort,changePage,changeSort}) => {
    const onchange = e => {
        changePage("page",1)
        changeSort("sort",e.target.value)
    }
  return (
    <Select className='sort'
    value={sort} 
    onChange={onchange}>
        <MenuItem value="price,desc"> {"ფასი კლებადობით"} </MenuItem>
        <MenuItem value="price,asc">{ "ფასი ზრდადობით" }</MenuItem>
        <MenuItem value="name,desc"> {"სახელი კლებადობიტ"} </MenuItem>
        <MenuItem value="name,asc"> {"სახელი ზდადობით"} </MenuItem>
    </Select>
  )
}
