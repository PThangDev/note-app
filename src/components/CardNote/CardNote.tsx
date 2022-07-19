// Import library
import MDEditor from '@uiw/react-md-editor';
import classNames from 'classnames/bind';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

// Import src
import icons from 'src/assets/icons';
import { Checkbox } from 'src/layouts/UI/Form';
import { Note } from 'src/types/Note';
import Modal from '../Modal';
import NoteInfo from '../NoteInfo';
import ButtonDelete from './ButtonDelete';
import ButtonEdit from './ButtonEdit';
import styles from './CardNote.module.scss';

interface Props {
  note: Note;
}

const cx = classNames.bind(styles);

const CardNote: FC<Props> = ({ note }) => {
  const { _id, content, title, topics, background, user, createdAt, slug } = note;

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  return (
    <>
      <div className={cx('wrapper')} style={{ background }}>
        <div className={cx('header')}>
          <div className={cx('header-inner')}>
            <Checkbox id={_id} name="card" />
            <div className={cx('title')}>
              <label htmlFor={_id}>{title}</label>
            </div>
            <div className={cx('actions')}>
              <span className={cx('btn-info')}>
                {/* <i className="fa-solid fa-heart"></i> */}
                {/* <i className="fa-solid fa-heart-circle-check"></i> */}
              </span>
              <img className={cx('btn-pin')} src={icons.iconPinned} alt="" />
            </div>
          </div>
        </div>
        <div className={cx('content')} data-color-mode="dark">
          <MDEditor.Markdown
            className="md-editor-preview"
            source={content}
            style={{ whiteSpace: 'pre-wrap' }}
          />
          <Link to={`/notes/${_id}`} />
        </div>
        <div className={cx('options')}>
          <div className={cx('time')}>{createdAt}</div>
          <div className={cx('buttons')}>
            <ButtonDelete id={_id} />
            <ButtonEdit note={note} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        className={cx('custom-modal')}
        overlayClassName={cx('custom-overlay')}
        isOpen={isOpenModal}
        closeWhenClickOnOverlay
        onClose={() => setIsOpenModal(false)}
        closeWhenPressEsc={!isOpenModalEdit}
        heading={title}
      >
        <NoteInfo data={note} />
      </Modal>
    </>
  );
};
export default CardNote;
