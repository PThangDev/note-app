import classNames from 'classnames/bind';
import { ChangeEvent, FC, useState } from 'react';

import { useAppDispatch } from 'src/app/hooks';
import { Button } from 'src/layouts/UI';
import { Input } from 'src/layouts/UI/Form';
import { fetchCreateTopic, fetchUpdateTopic } from 'src/pages/topics/topicSlice';
import { Topic } from 'src/types/Topic';
import backgrounds from './backgrounds';
import styles from './FormTopic.module.scss';

interface Props {
  data?: Topic;
  onCloseModal?: () => void;
}

const cx = classNames.bind(styles);

const FormTopic: FC<Props> = ({ data, onCloseModal }) => {
  // ********** Declaration **********

  // ********** use Hooks (useState, useRef, useCallback, useMemo,... Custom Hook,.... )**********
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>(() => {
    if (data) {
      return data.name;
    }
    return '';
  });
  const [background, setBackground] = useState<string>(() => {
    if (data) {
      return data.background;
    } else {
      return backgrounds[0];
    }
  });
  // ********** useEffect (Side Effect) **********

  // ********** Handle Event **********

  const handleSetBackground = (bg: string) => {
    setBackground(bg);
  };
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSubmitFormTopic = async () => {
    if (data) {
      // Update Topic
      await dispatch(fetchUpdateTopic({ _id: data._id, name, background })).unwrap();
      if (onCloseModal) {
        onCloseModal();
      }
    } else {
      // Create Topic
      try {
        await dispatch(fetchCreateTopic({ name, background })).unwrap();
        if (onCloseModal) {
          onCloseModal();
        }
      } catch (error) {}
    }
  };
  // ********** Logic and render UI **********

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('heading')}>{data ? 'Update Topic' : 'Create Topic'}</h2>
      <form action="" className={cx('form')} onSubmit={handleSubmitFormTopic}>
        <Input
          type="text"
          name="name"
          placeholder="Enter your title..."
          value={name}
          onChange={handleChangeName}
        />
        <div className={cx('background')}>
          <h3 className={cx('background-heading')}>
            Choose background topic :
            <input type="text" value={data?.background} onChange={() => {}} />
          </h3>
          <div className={cx('background-options')}>
            {backgrounds.map((bg, index) => (
              <p
                className={cx('background-color', { active: bg === background })}
                key={bg + index}
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
      </form>
      <div className={cx('actions')}>
        <Button status="error" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button onClick={handleSubmitFormTopic}>Save</Button>
      </div>
    </div>
  );
};
export default FormTopic;
