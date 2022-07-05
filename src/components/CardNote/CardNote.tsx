// Import library
import classNames from 'classnames/bind';
import { FC, useId, useState } from 'react';
import icons from 'src/assets/icons';
import Button from 'src/layouts/UI/Button';
import { Checkbox } from 'src/layouts/UI/Form';
import { Note } from 'src/types/Note';
import FormEditNote from '../FormEditNote';
import Modal from '../Modal';
import NoteInfo from '../NoteInfo';
// Import src
import styles from './CardNote.module.scss';

interface Props {
  note: Note;
}

const cx = classNames.bind(styles);

const CardNote: FC<Props> = ({ note }) => {
  const idUnique = useId();
  const { _id, content, title, topics, background, user, createdAt } = note;

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState<boolean>(false);
  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <div className={cx('header-inner')}>
            <div className={cx('title')}>
              <Checkbox id={_id.toString()} name="card" />
              <label htmlFor={_id.toString()}>{title}</label>
            </div>
            <div className={cx('actions')}>
              <span className={cx('btn-info')}>
                {/* <i className="fa-solid fa-heart"></i> */}
                <i className="fa-solid fa-heart-circle-check"></i>
              </span>
              <img className={cx('btn-pin')} src={icons.iconPinned} alt="" />
            </div>
          </div>
        </div>
        <div className={cx('content')} onClick={() => setIsOpenModal(true)}>
          {content}
        </div>
        <div className={cx('options')}>
          <div className={cx('time')}>{createdAt}</div>
          <div className={cx('buttons')}>
            <Button
              className={cx('btn-delete')}
              icon={() => <i className="fa-solid fa-trash"></i>}
              onClick={() => setIsOpenModalConfirm(true)}
            >
              Delete
            </Button>
            <Button
              className={cx('btn-edit')}
              icon={() => <i className="fa-solid fa-screwdriver-wrench"></i>}
              onClick={() => setIsOpenModalEdit(true)}
            >
              Edit
            </Button>
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
      <Modal
        className={cx('custom-modal-edit-note')}
        isOpen={isOpenModalEdit}
        // closeWhenClickOnOverlay
        animate="zoom"
        onClose={() => setIsOpenModalEdit(false)}
        heading="Edit Note"
      >
        <FormEditNote data={note} />
      </Modal>
      <Modal
        isOpen={isOpenModalConfirm}
        closeWhenClickOnOverlay
        animate="drop"
        onClose={() => setIsOpenModalConfirm(false)}
      >
        <>Delete</>
      </Modal>
    </>
  );
};
export default CardNote;
