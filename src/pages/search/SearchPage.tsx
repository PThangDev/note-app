import classNames from 'classnames/bind';
import queryString from 'query-string';
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import CardNoteContainer from 'src/containers/CardNoteContainer';
import { fetchGetNotes } from '../notes/noteSlice';
import styles from './SearchPage.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const SearchPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const notesSearched = useAppSelector((state) => state.notes);

  const search = queryString.parse(location.search);

  useEffect(() => {
    dispatch(fetchGetNotes({ q: search.q as string }));
  }, [dispatch, search.q]);

  return (
    <div className={cx('wrapper')}>
      <CardNoteContainer
        heading="Results"
        data={notesSearched.data}
        isLoading={notesSearched.isLoading}
      />
    </div>
  );
};
export default SearchPage;
