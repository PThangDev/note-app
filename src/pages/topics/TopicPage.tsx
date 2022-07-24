// Import library
import classNames from 'classnames/bind';
import React, { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import CardTopic from 'src/components/CardTopic';
import ButtonCreate from 'src/components/CardTopic/ButtonCreate';
import { Button } from 'src/layouts/UI';
// Import src
import styles from './TopicPage.module.scss';
import { fetchGetTopics } from './topicSlice';

interface Props {}

const cx = classNames.bind(styles);

const TopicPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const topics = useAppSelector((state) => state.topics);
  useEffect(() => {
    dispatch(fetchGetTopics());
  }, [dispatch]);
  return (
    <>
      {/* Head */}
      <Helmet>
        <title>Topics</title>
        <meta name="description" content="Home page note app - PThangDev"></meta>
      </Helmet>
      {/* Body */}
      <div className={cx('wrapper')}>
        <h2 className={cx('heading')}>All Topics</h2>
        <ButtonCreate />
        <div className={cx('list')}>
          {topics.data.map((topic) => (
            <CardTopic key={topic._id} data={topic} />
          ))}
        </div>
      </div>
    </>
  );
};
export default TopicPage;
