// Import library
import classNames from 'classnames/bind';
import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import ButtonCreate from 'src/components/CardNote/ButtonCreate';
import Pagination from 'src/components/Pagination';
import CardNoteContainer from 'src/containers/CardNoteContainer';
// Import src
import styles from './TopicDetailPage.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const TopicDetailPageRender: FC<Props> = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const topicDetail = useAppSelector((state) => state.topicDetail);
  const notesOfTopic = useAppSelector((state) => state.notes);

  const notesOfTopicData = notesOfTopic.data.filter((note) => {
    const topicIds = note.topics?.map((topic) => topic._id);
    return topicIds?.includes(topicDetail.data?._id as string);
  });

  useEffect(() => {
    if (!topicDetail.data) {
      navigate(`/topics/${id}`, { replace: true });
    }
  }, [id, navigate, topicDetail]);

  return (
    <div className={cx('wrapper')}>
      <ButtonCreate />
      <div className={cx('header')}>
        <h2 className={cx('heading')}>
          {topicDetail.data?.name}
          <span
            className={cx('line-bottom')}
            style={{ backgroundColor: topicDetail.data?.background }}
          ></span>
        </h2>
      </div>
      <CardNoteContainer data={notesOfTopicData} isLoading={notesOfTopic.isLoading} />
      <Pagination pagination={notesOfTopic.pagination} />
    </div>
  );
};
export default TopicDetailPageRender;
