// Import library
import classNames from 'classnames/bind';
import React, { FC, useEffect, useState } from 'react';
import queryString from 'query-string';
// Import src
import styles from './Pagination.module.scss';
import { Pagination as IPagination } from 'src/types';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  pagination?: IPagination;
  pageRangeDisplay?: number;
}

const cx = classNames.bind(styles);

const Pagination: FC<Props> = ({ pagination, pageRangeDisplay = 5 }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [pageStart, setPageStart] = useState<number>(0);
  const [pageEnd, setPageEnd] = useState<number>(pageRangeDisplay);

  const paginationParams = queryString.parse(location.search);
  const page = Number(paginationParams.page) || 1;
  const pageCount = Number(pagination?.pageCount);
  const total = Number(pagination?.total);

  const [pageList, setPageList] = useState<number[]>([]);
  useEffect(() => {
    const pageList = [];
    for (let pageNumber = 1; pageNumber <= total; pageNumber++) {
      pageList.push(pageNumber);
    }
    setPageList(pageList);
  }, [total]);
  // console.log(pageList);
  useEffect(() => {
    let pageRange: number;
    if (pageRangeDisplay % 2 !== 0) {
      pageRange = Math.floor(pageRangeDisplay / 2) + 1;
    } else {
      pageRange = Math.floor(pageRangeDisplay / 2);
    }

    if (page >= pageRange) {
      if (page + pageRange - 1 < total) {
        setPageStart(page - pageRange);
        setPageEnd(page + pageRange - 1);
      } else {
        setPageStart(total - pageRangeDisplay);
        setPageEnd(total);
      }
    } else if (page <= pageRange) {
      setPageStart(0);
      setPageEnd(pageRangeDisplay);
    }
  }, [page, pageRangeDisplay, total]);
  const handleChangePage = (page: number) => {
    const params = queryString.stringify({ ...paginationParams, page });

    navigate(`${location.pathname}?${params}`);
  };

  return (
    <div className={cx('wrapper')}>
      <ul className={cx('list')}>
        <li className={cx('item')} onClick={() => handleChangePage(page > 1 ? page - 1 : 1)}>
          <i className="fa-solid fa-angle-left"></i>
        </li>
        {pageList.slice(pageStart, pageEnd).map((pageItem, index) => (
          <li
            className={cx('item', { active: page === pageItem })}
            key={pageItem + index}
            onClick={() => handleChangePage(pageItem)}
          >
            {pageItem}
          </li>
        ))}
        <li
          className={cx('item')}
          onClick={() => handleChangePage(page < pageCount ? page + 1 : pageCount)}
        >
          <i className="fa-solid fa-angle-right"></i>
        </li>
      </ul>
    </div>
  );
};
export default Pagination;
