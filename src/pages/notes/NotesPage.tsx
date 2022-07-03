import classNames from 'classnames/bind';
import styles from './NotesPage.module.scss';
import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetNotes } from './noteSlice';
import CardNoteContainer from 'src/containers/CardNoteContainer';

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
      <CardNoteContainer heading="All notes" isLoading={notes.isLoading} data={notes.data} />
    </div>
  );
};
export default NotesPage;
