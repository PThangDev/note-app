import classNames from 'classnames/bind';
import styles from './TrashsPage.module.scss';
import React, { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetNotes } from '../notes/noteSlice';
import CardNoteContainer from 'src/containers/CardNoteContainer';

interface Props {}

const cx = classNames.bind(styles);

const TrashsPage: FC<Props> = (props) => {
  // ********** Declaration **********
  const dispatch = useAppDispatch();
  // ********** use Hooks (useState, useRef, useCallback, useMemo,... Custom Hook,.... )**********
  const notes = useAppSelector((state) => state.notes);
  // ********** useEffect (Side Effect) **********
  useEffect(() => {
    dispatch(fetchGetNotes({ 'type[regex]': 'trash' }));
  }, [dispatch]);

  // ********** Handle Event **********

  // ********** Logic and render UI **********

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>Trash</title>
        <meta name="description" content="Home page note app - PThangDev"></meta>
      </Helmet>
      {/* Body */}
      <div className={cx('wrapper')}>
        <h2>Trash</h2>
        <CardNoteContainer
          heading="Note Trash"
          data={notes.data}
          isLoading={notes.isLoading}
          isTrash
        />
      </div>
    </>
  );
};
export default TrashsPage;
