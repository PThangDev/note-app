import classNames from 'classnames/bind';
import queryString from 'query-string';
import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'src/app/hooks';
import { Input } from 'src/layouts/UI/Form';
import styles from './Search.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const Search: FC<Props> = (props) => {
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();

  const { isLoading } = useAppSelector((state) => state.notes);

  const handleChangeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchNotes = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    const searchStringify = queryString.stringify({ q: search });
    navigate(`/search?${searchStringify}`);
  };
  return (
    <form className={cx('wrapper')} onSubmit={handleSearchNotes}>
      <Input
        className={cx('input')}
        type="text"
        id="search"
        name="search"
        placeholder="Search your title or content..."
        icon={<i className="fa-solid fa-magnifying-glass"></i>}
        value={search}
        onChange={handleChangeInputSearch}
        disabled={isLoading}
      />
    </form>
  );
};
export default Search;
