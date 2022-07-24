// Import library
import classNames from 'classnames/bind';

import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import useGetNoteDetail from 'src/hooks/useGetNoteDetail';
import { delay } from 'src/utils';
// Import src
import styles from './NoteDetailPage.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const NoteDetailPage: FC<Props> = (props) => {
  // ********** Declaration **********
  // ********** use Hooks (useState, useRef, useCallback, useMemo,... Custom Hook,.... )**********
  const navigate = useNavigate();
  const { id } = useParams();

  const { noteDetail } = useGetNoteDetail({});
  // // ********** useEffect (Side Effect) **********
  useEffect(() => {
    if (noteDetail) {
      (async () => {
        navigate(`/notes/${id}/${noteDetail.slug}`, {
          replace: true,
        });
      })();
    }
  }, [navigate, noteDetail]);
  // ********** Handle Event **********

  // ********** Logic and render UI **********

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>{`${noteDetail?.title || 'Loading...'}`}</title>
      </Helmet>
      {/* Main */}
    </>
  );
};
export default NoteDetailPage;
