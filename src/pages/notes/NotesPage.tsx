import classNames from 'classnames/bind';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import ButtonCreate from 'src/components/CardNote/ButtonCreate';
import CardNoteContainer from 'src/containers/CardNoteContainer';
import { fetchGetNotes } from './noteSlice';
import styles from './NotesPage.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const NotesPage: FC<Props> = (props) => {
  // ********** Declaration **********
  const dispatch = useAppDispatch();
  // ********** use Hooks (useState, useRef, useCallback, useMemo,... Custom Hook,.... )**********
  const notes = useAppSelector((state) => state.notes);
  // ********** useEffect (Side Effect) **********
  useEffect(() => {
    dispatch(fetchGetNotes());
  }, [dispatch]);

  // ********** Handle Event **********

  // ********** Logic and render UI **********

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <h3 className={cx('heading')}>All Notes</h3>
        <ButtonCreate />
      </div>
      <CardNoteContainer isLoading={notes.isLoading} data={notes.data} />
    </div>
  );
};
export default NotesPage;
