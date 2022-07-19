// Import library
import MDEditor from '@uiw/react-md-editor';
import classNames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import ButtonDelete from 'src/components/CardNote/ButtonDelete';
import ButtonEdit from 'src/components/CardNote/ButtonEdit';
import useGetNoteDetail from 'src/hooks/useGetNoteDetail';
// Import src
import styles from './NoteDetailPage.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const NoteDetailPage: FC<Props> = (props) => {
  // ********** Declaration **********
  // ********** use Hooks (useState, useRef, useCallback, useMemo,... Custom Hook,.... )**********
  const navigate = useNavigate();

  const { isLoading, noteDetail } = useGetNoteDetail({});

  // // ********** useEffect (Side Effect) **********

  // ********** Handle Event **********
  const handleFinishDelete = () => {
    navigate('/notes');
  };
  // ********** Logic and render UI **********

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>{`${noteDetail?.title}`}</title>
      </Helmet>
      {/* Main */}
      <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <h1 className={cx('heading')}>{noteDetail?.title}</h1>
          <div className={cx('actions')}>
            <ButtonDelete slug={noteDetail?.slug} onFinishDelete={handleFinishDelete} />
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
export default NoteDetailPage;
