// Import library
import classNames from 'classnames/bind';
import { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import ButtonCreate from 'src/components/CardNote/ButtonCreate';
import ButtonDeleteMany from 'src/components/CardNote/ButtonDeleteMany';
import ButtonSelect from 'src/components/CardNote/ButtonSelect';
import Pagination from 'src/components/Pagination';
import CardNoteContainer from 'src/containers/CardNoteContainer';
// Import src
import styles from './TopicDetailPage.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const TopicDetailPageRender: FC<Props> = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isShowSelect, setIsShowSelect] = useState<boolean>(false);
  const [notesChecked, setNotesChecked] = useState<string[]>([]);

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

  const handleToggleCheckbox = (id: string) => {
    setNotesChecked((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((noteId) => noteId !== id);
      } else {
        return [...prevState, id];
      }
    });
  };
  const handleToggleSelect = () => {
    setIsShowSelect((prevState) => {
      if (prevState) {
        setNotesChecked([]);
      }
      return !prevState;
    });
  };

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>{topicDetail.data?.name}</title>
      </Helmet>
      {/* Body  */}
      <div className={cx('wrapper')}>
        <div className={cx('actions')}>
          <ButtonCreate />
          <ButtonDeleteMany noteIds={notesChecked} />
          <ButtonSelect isActive={isShowSelect} onClick={handleToggleSelect} />
        </div>
        <div className={cx('header')}>
          <h2 className={cx('heading')}>
            {topicDetail.data?.name}
            <span
              className={cx('line-bottom')}
              style={{ backgroundColor: topicDetail.data?.background }}
            ></span>
          </h2>
        </div>
        <CardNoteContainer
          data={notesOfTopicData}
          isLoading={notesOfTopic.isLoading}
          isShowSelect={isShowSelect}
          onToggleCheckbox={handleToggleCheckbox}
        />
        <Pagination pagination={notesOfTopic.pagination} />
      </div>
    </>
  );
};
export default TopicDetailPageRender;
