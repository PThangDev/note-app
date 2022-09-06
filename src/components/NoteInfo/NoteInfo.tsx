import MDEditor from '@uiw/react-md-editor';
import classNames from 'classnames/bind';
import { FC } from 'react';

import { Note } from 'src/types/Note';
import ButtonDelete from '../CardNote/ButtonDelete';
import ButtonEdit from '../CardNote/ButtonEdit';
import styles from './NoteInfo.module.scss';

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
      <div className={cx('content')}>
        <MDEditor.Markdown
          className="md-editor-preview"
          source={content}
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </div>
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
