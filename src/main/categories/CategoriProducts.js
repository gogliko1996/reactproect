import { Sort } from "../../aplicationtools/Sort";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Paginate } from "../../aplicationtools/Paginate";
import { useQveriparams } from "../../hooks/useQveriparams";
import { categoriesProduct } from "../../redux/product";

export const CategoriProducts = () => {
  const user = useSelector((state) => state.user.userData);

  const {
    value: page,
    changePage,
    sortValue:sort,
    changeSort,
  } = useQveriparams("page", "sort");

  const categoriProducts = useSelector(
    (state) => state.products.categoriesProductData
  );
  const totalpPages = useSelector((state) => state.products.totalPage);

  const dispatch = useDispatch();

  const { categoriName } = useParams();

  useEffect(() => {
    dispatch(
      categoriesProduct(`${categoriName}?page=${page}&size=1&sort=${sort}`)
    );
  }, [categoriName,page,sort]);

  return (
    <div>
      <Sort
        className="sort"
        sort={sort}
        changePage={changePage}
        changeSort={changeSort}
      />
      {categoriProducts.map((item) => {
        return (
          <div className="product" key={item._id}>
            <div className="imge" name={item._id}>
              {" "}
            </div>
            <div className="">
              <h2>{item.name}</h2>
              <h3>{item.price} $</h3>
            </div>
            {user?.role.includes("admin") ? "" : <button> card </button>}
          </div>
        );
      })}
      <Paginate
        currentPage={page}
        totalPage={totalpPages}
        changePage={changePage}
        querKey="page"
      />
    </div>
  );
};
