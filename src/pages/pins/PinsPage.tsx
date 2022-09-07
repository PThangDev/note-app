import classNames from 'classnames/bind';
import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import CardNoteContainer from 'src/containers/CardNoteContainer';
import { fetchGetNotesPinned } from './notesPinnedSlice';
import styles from './PinsPage.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const PinsPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const { isLoading, data: notesPinned } = useAppSelector((state) => state.notesPinned);

  useEffect(() => {
    dispatch(fetchGetNotesPinned());
  }, [dispatch]);

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>Pinned</title>
        <meta name="description" content="Home page note app - PThangDev"></meta>
      </Helmet>
      {/* Body */}
      <div className={cx('wrapper')}>
        <CardNoteContainer heading="Pins" isLoading={isLoading} data={notesPinned} />
      </div>
    </>
  );
};
export default PinsPage;
