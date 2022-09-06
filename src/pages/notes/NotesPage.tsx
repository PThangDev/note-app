import classNames from 'classnames/bind';
import queryString from 'query-string';
import { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import ButtonCreate from 'src/components/CardNote/ButtonCreate';
import ButtonDeleteMany from 'src/components/CardNote/ButtonDeleteMany';
import ButtonSelect from 'src/components/CardNote/ButtonSelect';
import Filters from 'src/components/Filters';
import Pagination from 'src/components/Pagination';
import CardNoteContainer from 'src/containers/CardNoteContainer';
import { fetchGetNotes } from './noteSlice';
import styles from './NotesPage.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const NotesPage: FC<Props> = (props) => {
  // ********** Declaration **********
  const dispatch = useAppDispatch();

  const location = useLocation();
  const params = queryString.parse(location.search);
  // ********** use Hooks (useState, useRef, useCallback, useMemo,... Custom Hook,.... )**********
  const notes = useAppSelector((state) => state.notes);
  const [notesChecked, setNotesChecked] = useState<string[]>([]);
  const [isShowSelect, setIsShowSelect] = useState<boolean>(false);

  // ********** useEffect (Side Effect) **********
  useEffect(() => {
    dispatch(
      fetchGetNotes({
        is_trash: false,
        limit: (params.limit as string) || '8',
        page: params.page as string,
        sort: params.sort as string,
      })
    );
  }, [dispatch, params.limit, params.page, params.sort]);

  // ********** Handle Event **********
  const handleToggleCheckbox = (id: string) => {
    setNotesChecked((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((noteId) => noteId !== id);
      } else {
        return [...prevState, id];
      }
    });
  };
  const handleToggleSelect = () => {
    setIsShowSelect((prevState) => {
      if (prevState) {
        setNotesChecked([]);
      }
      return !prevState;
    });
  };
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
          {/* <h3 className={cx('heading')}>All Notes</h3> */}
          <div className={cx('actions')}>
            <ButtonCreate />
            <Filters />
            <ButtonDeleteMany noteIds={notesChecked} />
            <ButtonSelect onClick={handleToggleSelect} isActive={isShowSelect} />
          </div>
        </div>
        <CardNoteContainer
          isLoading={notes.isLoading}
          data={notes.data}
          onToggleCheckbox={handleToggleCheckbox}
          isShowSelect={isShowSelect}
        />
        <Pagination pagination={notes.pagination} />
      </div>
    </>
  );
};
export default NotesPage;
