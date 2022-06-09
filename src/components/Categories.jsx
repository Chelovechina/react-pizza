const Categories = ({ categoryId, setCategoryId }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, id) => {
          return (
            <li
              key={id}
              onClick={() => setCategoryId(id)}
              className={categoryId === id ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
