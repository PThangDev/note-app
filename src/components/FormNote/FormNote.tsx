// Import library
import MDEditor from '@uiw/react-md-editor';
import classNames from 'classnames/bind';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import Swal from 'sweetalert2';

// Import src
import { Button } from 'src/layouts/UI';
import { Input } from 'src/layouts/UI/Form';
import { fetchCreateNote, fetchUpdateNote } from 'src/pages/notes/noteSlice';
import { fetchGetTopics } from 'src/pages/topics/topicSlice';
import { Note } from 'src/types/Note';
import backgrounds from './backgrounds';
import styles from './FormNote.module.scss';
import { Helmet } from 'react-helmet';
import ButtonCreate from '../CardTopic/ButtonCreate';
interface Props {
  data?: Note;
  onFinishSubmit?: (note?: Note) => void;
  onCloseModal?: () => void;
}

const cx = classNames.bind(styles);

const FormNote: FC<Props> = ({ data, onFinishSubmit, onCloseModal = () => {} }) => {
  // ********** Declaration **********
  const dispatch = useAppDispatch();
  // ********** use Hooks (useState, useRef, useCallback, useMemo,... Custom Hook,.... )***** *****

  const [title, setTitle] = useState<string>(data?.title || '');

  const [content, setContent] = useState<string>(data?.content || '');

  const [background, setBackground] = useState<string>(() => data?.background || backgrounds[0]);
  const [topicIds, setTopicIds] = useState<string[]>(() => {
    if (data) {
      return data.topics?.map((topic) => topic?._id) || [];
    } else {
      return [];
    }
  });

  const topics = useAppSelector((state) => state.topics);

  // ********** useEffect (Side Effect) **********
  useEffect(() => {
    dispatch(fetchGetTopics());
  }, [dispatch]);

  // ********** Handle Event **********

  const handleChangeInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmitNote = async () => {
    try {
      // if (!title.trim() || !content.trim()) return;
      let message: string = '';
      // Update note
      Swal.fire({
        title: 'Loading...',
        didOpen: () => {
          Swal.showLoading();
        },
        allowEscapeKey: false,
        allowOutsideClick: false,
      });

      if (data) {
        const response = await dispatch(
          fetchUpdateNote({
            slug: data?.slug || '',
            data: { title, content, background, topics: topicIds },
          })
        ).unwrap();
        Swal.close();
        if (onFinishSubmit) {
          onFinishSubmit(response.data);
        }
        message = response.message;
      }
      // Create Note
      else {
        const response = await dispatch(
          fetchCreateNote({ title, topics: topicIds, background, content })
        ).unwrap();
        Swal.close();
        if (onFinishSubmit) {
          onFinishSubmit();
        }
        if (onFinishSubmit) {
          onFinishSubmit(response.data);
        }
        message = response.message;
      }
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${message}`,
        showConfirmButton: false,
        timer: 900,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleSetBackground = (bg: string) => {
    setBackground(bg);
  };
  const handleChooseTopics = (id: string) => {
    setTopicIds((prevTopicIds) => {
      if (prevTopicIds.includes(id)) {
        return prevTopicIds.filter((topicId) => topicId !== id);
      } else {
        return [...prevTopicIds, id];
      }
    });
  };

  // ********** Logic and render UI **********
  return (
    <>
      {/* Head */}
      <Helmet>
        <title>{`${title || data?.title || 'Note App'}`}</title>
        <meta name="description" content="Home page note app - PThangDev"></meta>
      </Helmet>
      {/* Body */}
      <div className={cx('wrapper')}>
        <h2 className={cx('heading')}>{data ? 'Edit Note' : 'Create Note'}</h2>
        <div className={cx('form')}>
          <Input
            className={cx('title')}
            value={title}
            name="title"
            placeholder="Your title..."
            onChange={handleChangeInputTitle}
            icon={<i className="fa-solid fa-heading"></i>}
          />
          <div className={cx('editor')} data-color-mode="dark">
            <MDEditor
              height={300}
              value={content}
              onChange={(value?: string) => setContent(value as string)}
            />
          </div>
          <div className={cx('background')}>
            <h3 className={cx('background-heading')}>
              Choose background card :{/* <input type="text" value={data?.background} /> */}
            </h3>
            <div className={cx('background-options')}>
              {backgrounds.map((bg, index) => (
                <p
                  className={cx('background-color', { active: bg === background })}
                  key={bg}
                  style={{ backgroundColor: bg }}
                  onClick={() => handleSetBackground(bg)}
                >
                  <span className={cx('icon')}>
                    <i className="fa-solid fa-check"></i>
                  </span>
                </p>
              ))}
            </div>
          </div>
          <div className={cx('topics')}>
            <h3 className={cx('topics-heading')}>
              Topics
              <ButtonCreate className={cx('button-create-topic')} text="Add topic" />
            </h3>

            <div className={cx('topic-group')}>
              {topics.data.map((topic) => (
                <div className={cx('topic')} key={topic._id}>
                  <input
                    type="checkbox"
                    id={topic._id}
                    checked={topicIds.includes(topic._id)}
                    onChange={() => handleChooseTopics(topic._id)}
                  />
                  <label htmlFor={topic._id}>{topic.name}</label>
                </div>
              ))}
            </div>
          </div>

          <div
            className={cx('preview')}
            style={{ backgroundColor: background }}
            data-color-mode="dark"
          >
            <h3>Preview</h3>
            <div className={cx('content')}>
              <MDEditor.Markdown
                className="md-editor-preview"
                source={content}
                style={{ whiteSpace: 'pre-wrap' }}
              />
            </div>
          </div>

          <div className={cx('actions')}>
            <Button status="error" onClick={onCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmitNote}>Save</Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default FormNote;
