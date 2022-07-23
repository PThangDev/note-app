import classNames from 'classnames/bind';
import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import CardNoteContainer from 'src/containers/CardNoteContainer';
import { fetchGetNotes } from '../notes/noteSlice';
import { fetchGetNotesPinned } from '../pins/notesPinnedSlice';
import { fetchGetTopics } from '../topics/topicSlice';
import styles from './HomePage.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const HomePage: FC<Props> = (props) => {
  // ********** Declaration **********

  // ********** use Hooks (useState, useRef, useCallback, useMemo,... Custom Hook,.... )**********
  const dispatch = useAppDispatch();
  const topics = useAppSelector((state) => state.topics);
  const notesPinned = useAppSelector((state) => state.notesPinned);

  // ********** useEffect (Side Effect) **********
  useEffect(() => {
    dispatch(fetchGetTopics());
    dispatch(fetchGetNotesPinned({ limit: '8', 'type[regex]': 'pin' }));
  }, [dispatch]);

  // ********** Handle Event **********

  // ********** Logic and render UI **********

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home page note app - PThangDev"></meta>
      </Helmet>
      {/* Body */}
      <div className={cx('wrapper')}>
        <div className={cx('notes')}>
          {/* Notes Pinned */}
          {notesPinned.data.length > 0 && (
            <CardNoteContainer heading="Pins" data={notesPinned.data} />
          )}
          {topics.data.map((topic) => {
            if (topic.notes.length) {
              return <CardNoteContainer key={topic._id} heading={topic.name} data={topic.notes} />;
            }
          })}
        </div>
      </div>
    </>
  );
};
export default HomePage;
