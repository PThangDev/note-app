import classNames from 'classnames/bind';
import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import CardTopic from 'src/components/CardTopic';
import ButtonCreate from 'src/components/CardTopic/ButtonCreate';
import { Col, Row } from 'src/layouts/UI/Grid';
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
        {/* <h2 className={cx('heading')}>All Topics</h2> */}
        <ButtonCreate />
        <div className={cx('list')}>
          <Row>
            {topics.data.map((topic) => (
              <Col col={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6 }} key={topic._id}>
                <CardTopic data={topic} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};
export default TopicPage;
