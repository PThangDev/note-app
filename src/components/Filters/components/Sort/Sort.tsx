// Import library
import classNames from 'classnames/bind';
import { ChangeEvent, FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

// Import src
import styles from './Sort.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const Sort: FC<Props> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const sort = queryString.parse(location.search);

  const handleChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value.trim() || null;

    const sortable = queryString.stringify({ ...sort, sort: sortValue }, { skipNull: true });

    navigate(`${location.pathname}?${sortable}`);
  };

  return (
    <div className={cx('wrapper')}>
      <select onChange={handleChangeSort}>
        <option value="">----- Filters -----</option>
        <option value="title">----- Title A-Z -----</option>
        <option value="-title">----- Title Z-A -----</option>
        <option value="-createdAt">----- Newest -----</option>
        <option value="createdAt">----- Oldest -----</option>
      </select>
    </div>
  );
};
export default Sort;
