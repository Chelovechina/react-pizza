import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getFilterSelector, setCurrentCategory } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';

const Categories: FC = () => {
  const { categories, currentCategory } = useSelector(getFilterSelector);
  const dispatch = useAppDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((category: string, id: number) => {
          return (
            <li
              key={id}
              onClick={() => dispatch(setCurrentCategory(id))}
              className={categories[currentCategory] === category ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
