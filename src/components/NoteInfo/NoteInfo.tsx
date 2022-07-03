// Import library
import classNames from 'classnames/bind';
import { FC } from 'react';
// Import src
import { Note } from 'src/types/Note';
import styles from './NoteInfo.module.scss';
import ButtonDelete from '../CardNote/ButtonDelete';
import ButtonEdit from '../CardNote/ButtonEdit';

interface Props {
  data: Note;
}

const cx = classNames.bind(styles);

const NoteInfo: FC<Props> = ({ data }) => {
  // ********** Declaration **********
  const { title, content, createdAt } = data;
  // ********** use Hooks (useState, useRef, useCallback, useMemo,... Custom Hook,.... )**********

  // ********** useEffect (Side Effect) **********

  // ********** Handle Event **********

  // ********** Logic and render UI **********

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>{content}</div>
      <div className={cx('footer')}>
        <p className={cx('time')}>{createdAt}</p>
        <div className={cx('buttons')}>
          <ButtonDelete />
          <ButtonEdit />
        </div>
      </div>
    </div>
  );
};
export default NoteInfo;
