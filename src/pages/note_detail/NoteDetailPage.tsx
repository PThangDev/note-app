// Import library
import classNames from 'classnames/bind';

import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
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

  const { noteDetail } = useGetNoteDetail({});
  // // ********** useEffect (Side Effect) **********
  useEffect(() => {
    if (noteDetail) {
      (async () => {
        await delay(200);
        navigate(`/notes/${noteDetail._id}/${noteDetail.slug}`, {
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
        <title>{`${noteDetail?.title || 'Note App'}`}</title>
      </Helmet>
      {/* Main */}
    </>
  );
};
export default NoteDetailPage;
