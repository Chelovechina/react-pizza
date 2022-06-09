import { useContext, useEffect, useState } from 'react';

import Skeleton from './../components/PizzaBlock/Skeleton';
import PizzaBlock from './../components/PizzaBlock/PizzaBlock';
import Categories from './../components/Categories';
import Sort from './../components/Sort';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const { searchValue } = useContext(SearchContext);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'популярности (Убыв.)',
    sortProperty: 'category&order=desc',
  });

  useEffect(() => {
    setIsLoading(true);

    const categoryQuery = categoryId > 0 ? 'category=' + categoryId : '';
    const sortQuery = '&sortBy=' + sortType.sortProperty;
    const searchQuery = searchValue ? '&search=' + searchValue : '';

    fetch(
      `https://629f1cee8b939d3dc28f8b94.mockapi.io/items?${categoryQuery}&page=${currentPage}&limit=4${sortQuery}${searchQuery}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, id) => <Skeleton key={id} />);

  const items = pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={setCategoryId} />
        <Sort sortType={sortType} setSortType={setSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : items}</div>
      <Pagination setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;
