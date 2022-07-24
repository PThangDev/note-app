import classNames from 'classnames/bind';
import styles from './PinsPage.module.scss';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import useGetNotesPinned from 'src/hooks/useGetNotesPinned';
import CardNoteContainer from 'src/containers/CardNoteContainer';

interface Props {}

const cx = classNames.bind(styles);

const PinsPage: FC<Props> = (props) => {
  const { isLoading, notesPinned } = useGetNotesPinned();

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
