// Import library
import MDEditor from '@uiw/react-md-editor';
import classNames from 'classnames/bind';
import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import ButtonDelete from 'src/components/CardNote/ButtonDelete';
import ButtonEdit from 'src/components/CardNote/ButtonEdit';
// Import src
import styles from './NoteDetailPage.module.scss';
import { fetchGetNoteDetail } from './noteDetailSlice';

interface Props {}

const cx = classNames.bind(styles);

const NoteDetailPage: FC<Props> = (props) => {
  // ********** Declaration **********
  // ********** use Hooks (useState, useRef, useCallback, useMemo,... Custom Hook,.... )**********
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();

  const { isLoading, data: noteDetail } = useAppSelector((state) => state.noteDetail);

  // ********** useEffect (Side Effect) **********
  useEffect(() => {
    if (!slug?.trim()) return;
    dispatch(fetchGetNoteDetail(slug));
  }, [dispatch, slug]);
  // ********** Handle Event **********
  const handleFinishDelete = () => {
    navigate('/notes');
  };
  // ********** Logic and render UI **********

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <h1 className={cx('heading')}>{noteDetail?.title}</h1>
        <div className={cx('actions')}>
          <ButtonDelete slug={noteDetail?.slug} onFinishDelete={handleFinishDelete} />
          <ButtonEdit note={noteDetail} />
        </div>
      </div>
      <div className={cx('info')}>{noteDetail?.createdAt}</div>
      <div className={cx('content')} data-color-mode="light">
        <MDEditor.Markdown
          className="md-editor-preview"
          source={noteDetail?.content}
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </div>
    </div>
  );
};
export default NoteDetailPage;
