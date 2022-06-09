import ReactPaginate from 'react-paginate';

import style from './Pagination.module.scss';

const Pagination = ({ setCurrentPage }) => {
  return (
    <ReactPaginate
      containerClassName={style.root}
      activeLinkClassName={style.active}
      pageLinkClassName={style.page}
      previousLinkClassName={style.previous}
      nextLinkClassName={style.next}
      disabledLinkClassName={style.disabled}
      nextLabel="След"
      onPageChange={(value) => setCurrentPage(value.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="Пред"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
