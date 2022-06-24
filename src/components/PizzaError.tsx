import { FC } from 'react';

const PizzaError: FC = () => {
  return (
    <div className="content__error-info">
      <h2>Произошла ошибка 😕</h2>
      <p>
        К сожалению, не удалось получить пиццы.
      <br />
        Попробуйте повторить попытку позже.
      </p>
    </div>
  );

};

export default PizzaError;
