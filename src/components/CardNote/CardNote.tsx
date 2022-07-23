// Import library
import MDEditor from '@uiw/react-md-editor';
import classNames from 'classnames/bind';
import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'src/app/hooks';

// Import src
import icons from 'src/assets/icons';
import { Checkbox } from 'src/layouts/UI/Form';
import { fetchUpdateNote } from 'src/pages/notes/noteSlice';
import { fetchGetNotesPinned } from 'src/pages/pins/notesPinnedSlice';
import { fetchGetTopics } from 'src/pages/topics/topicSlice';
import { Note } from 'src/types/Note';
import Modal from '../Modal';
import NoteInfo from '../NoteInfo';
import ButtonDelete from './ButtonDelete';
import ButtonEdit from './ButtonEdit';
import ButtonHardDelete from './ButtonHardDelete';
import ButtonRestore from './ButtonRestore';
import styles from './CardNote.module.scss';

interface Props {
  note: Note;
  isTrash?: boolean;
}

const cx = classNames.bind(styles);

const CardNote: FC<Props> = ({ note, isTrash = false }) => {
  const { _id, content, title, topics, background, user, createdAt, slug, type } = note;

  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);

  const handlePinNote = async () => {
    try {
      const response = await dispatch(
        fetchUpdateNote({ id: _id, data: { type: type === 'default' ? 'pin' : 'default' } })
      ).unwrap();
      if (response.data?.type === 'pin') {
        toast.success('Pin note successfully!');
      } else if (response.data?.type === 'default') {
        toast.error('Unpin note successfully!');
      }

      if (location.pathname === '/') {
        await dispatch(fetchGetTopics()).unwrap();
        await dispatch(fetchGetNotesPinned({ limit: '8', 'type[regex]': 'pin' }));
      }
    } catch (error) {}
  };

  const renderActionButtons = () => {
    if (isTrash) {
      return (
        <>
          <ButtonHardDelete id={_id} />
          <ButtonRestore id={_id} />
        </>
      );
    } else {
      return (
        <>
          <ButtonDelete id={_id} />
          <ButtonEdit note={note} />
        </>
      );
    }
  };

  return (
    <>
      <div className={cx('wrapper')} style={{ background }}>
        <div className={cx('header')}>
          <div className={cx('header-inner')}>
            <Checkbox id={_id} name="card" />
            <div className={cx('title')}>
              <label htmlFor={_id}>{title}</label>
            </div>
            {!isTrash && (
              <div className={cx('actions')}>
                <span className={cx('btn-info')}>
                  {/* <i className="fa-solid fa-heart"></i> */}
                  {/* <i className="fa-solid fa-heart-circle-check"></i> */}
                </span>
                <img
                  className={cx('btn-pin')}
                  src={type === 'pin' ? icons.iconPinnedActive : icons.iconPinned}
                  alt=""
                  onClick={handlePinNote}
                />
              </div>
            )}
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
          <div className={cx('buttons')}>{renderActionButtons()}</div>
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
