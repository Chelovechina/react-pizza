import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import { useAppDispatch } from '../../redux/store';

import style from './Pagination.module.scss';

interface IPagination {
  currentPage: number 
}

const Pagination: FC<IPagination> = ({ currentPage }) => {
  const dispatch = useAppDispatch()

  return (
    <ReactPaginate
      containerClassName={style.root}
      activeLinkClassName={style.active}
      pageLinkClassName={style.page}
      previousLinkClassName={style.previous}
      nextLinkClassName={style.next}
      disabledLinkClassName={style.disabled}
      nextLabel="След"
      onPageChange={(value) => dispatch(setCurrentPage(value.selected))}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="Пред"
    />
  );
};

export default Pagination;
