import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';

import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination/Pagination';
import PizzaError from '../components/PizzaError';
import { fetchPizzas, getPizzaSelector } from '../redux/slices/pizzaSlice';
import { getFilterSelector, setFilters } from '../redux/slices/filterSlice';
import { PizzaType, SortType } from '../@types/types';
import { useAppDispatch } from '../redux/store';

const Home: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentCategory, activeType, searchValue, currentPage, sortTypes } =
    useSelector(getFilterSelector);
  const { pizzas, status } = useSelector(getPizzaSelector);
  const dispatch = useAppDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const getPizzas = async () => {
    const categoryQuery = currentCategory > 0 ? `category=${currentCategory}` : '';
    const sortQuery = activeType ? `&sortBy=${activeType.sortProperty}` : '';
    const searchQuery = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({ categoryQuery, sortQuery, searchQuery, currentPage }));
  };

  useEffect(() => {
    if (location.search !== '') {
      const params = qs.parse(location.search.substring(1));
      const at: SortType | undefined = sortTypes.find((obj: SortType) => obj.sortProperty === params.at);
      dispatch(
        setFilters({
          cc: Number(params.cc),
          cp: Number(params.cp),
          at,
        }),
      );

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [currentCategory, activeType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        cp: currentPage,
        cc: currentCategory,
        at: activeType ? activeType.sortProperty : '',
      });

      navigate(`?${queryString}`);
    } else {
      isMounted.current = true;
    }
  }, [currentCategory, activeType, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, id) => <Skeleton key={id} />);
  const items = pizzas.map((pizza: PizzaType) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' && <PizzaError />}
      <div className="content__items">{status === 'loading' ? skeletons : items}</div>
      <Pagination currentPage={currentPage} />
    </div>
  );
};

export default Home;
