// Import library
import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';

// Import src
import { fetchGetTopicDetail } from './topicDetailSlice';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetNotes } from '../notes/noteSlice';

interface Props {}

const TopicDetailPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const topicDetail = useAppSelector((state) => state.topicDetail);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchGetTopicDetail(id));
    dispatch(fetchGetNotes({ topics: id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (topicDetail.data) {
      navigate(`/topics/${id}/${topicDetail.data.slug}`, { replace: true });
    }
  }, [id, navigate, topicDetail.data]);

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>{`Loading...`}</title>
      </Helmet>
      {/* Main */}
    </>
  );
};
export default TopicDetailPage;
