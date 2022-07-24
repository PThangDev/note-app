import classNames from 'classnames/bind';
import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import ButtonCreate from 'src/components/CardNote/ButtonCreate';
import CardNoteContainer from 'src/containers/CardNoteContainer';
import { fetchGetNotes } from './noteSlice';
import queryString from 'query-string';
import styles from './NotesPage.module.scss';
import Pagination from 'src/components/Pagination';

interface Props {}

const cx = classNames.bind(styles);

const NotesPage: FC<Props> = (props) => {
  // ********** Declaration **********
  const dispatch = useAppDispatch();

  const location = useLocation();
  const params = queryString.parse(location.search);
  // ********** use Hooks (useState, useRef, useCallback, useMemo,... Custom Hook,.... )**********
  const notes = useAppSelector((state) => state.notes);
  // ********** useEffect (Side Effect) **********
  useEffect(() => {
    dispatch(
      fetchGetNotes({
        'type[regex]': 'default',
        limit: (params.limit as string) || '8',
        page: params.page as string,
      })
    );
  }, [dispatch, params.limit, params.page]);

  // ********** Handle Event **********

  // ********** Logic and render UI **********
  return (
    <>
      {/* Head */}
      <Helmet>
        <title>All Notes</title>
        <meta name="description" content="Home page note app - PThangDev"></meta>
      </Helmet>

      {/* Body */}
      <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <h3 className={cx('heading')}>All Notes</h3>
          <ButtonCreate />
        </div>
        <CardNoteContainer isLoading={notes.isLoading} data={notes.data} />
        <Pagination pagination={notes.pagination} />
      </div>
    </>
  );
};
export default NotesPage;
