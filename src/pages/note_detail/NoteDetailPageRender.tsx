// Import library
import MDEditor from '@uiw/react-md-editor';
import classNames from 'classnames/bind';
import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import ButtonDelete from 'src/components/CardNote/ButtonDelete';
import ButtonEdit from 'src/components/CardNote/ButtonEdit';
// Import src
import styles from './NoteDetailPage.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const NoteDetailPageRender: FC<Props> = (props) => {
  // ********** Declaration **********
  // ********** use Hooks (useState, useRef, useCallback, useMemo,... Custom Hook,.... )**********
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, data: noteDetail } = useAppSelector((state) => state.noteDetail);

  // // ********** useEffect (Side Effect) **********
  useEffect(() => {
    if (!noteDetail) {
      navigate(`/notes/${id}`, { replace: true });
    }
  }, [id, navigate, noteDetail]);
  // ********** Handle Event **********
  const handleFinishDelete = () => {
    navigate('/notes');
  };
  // ********** Logic and render UI **********

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>{`${noteDetail?.title || 'Note App'}`}</title>
      </Helmet>
      {/* Main */}
      <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <h1 className={cx('heading')}>{noteDetail?.title}</h1>
          <div className={cx('actions')}>
            <ButtonDelete id={noteDetail?._id} onFinishDelete={handleFinishDelete} />
            <ButtonEdit note={noteDetail} redirect />
          </div>
        </div>
        <div className={cx('info')}>{noteDetail?.createdAt}</div>
        <div className={cx('content')} data-color-mode="dark">
          <MDEditor.Markdown
            className="md-editor-preview"
            source={noteDetail?.content}
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </div>
      </div>
    </>
  );
};
export default NoteDetailPageRender;
