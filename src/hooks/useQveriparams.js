import React from "react";
import { useSearchParams } from "react-router-dom";

export const useQveriparams = (page,sort) => {
  const [params, setparams] = useSearchParams();
  const [sortParams, setSortParams] = useSearchParams();

  const changePage = (page, value) => {
    // console.log("page",page,"value",value);/
    params.set(page, value);
    setparams(params);
  };
  const changeSort = (sort, value) => {
    console.log(sort,value);
    sortParams.set(sort, value);
    setSortParams(sortParams);
  };
  return {
    value: params.get(page),
    sortValue: sortParams.get(sort),
    changePage,
    changeSort,
  };
};
