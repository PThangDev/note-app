// Import library
import classNames from 'classnames/bind';
import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
// Import src
import styles from './TopicPage.module.scss';
import { fetchGetTopics } from './topicSlice';

interface Props {}

const cx = classNames.bind(styles);

const TopicPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const topics = useAppSelector((state) => state.topics);
  console.log(topics);
  useEffect(() => {
    dispatch(fetchGetTopics());
  }, [dispatch]);
  return <div className={cx('wrapper')}>TopicPage</div>;
};
export default TopicPage;
