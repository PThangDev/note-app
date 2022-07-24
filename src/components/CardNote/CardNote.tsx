// Import library
import MDEditor from '@uiw/react-md-editor';
import classNames from 'classnames/bind';
import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';

// Import src
import icons from 'src/assets/icons';
import { Checkbox } from 'src/layouts/UI/Form';
import Spin from 'src/layouts/UI/Loading/Spin';
import { fetchTogglePinNote } from 'src/pages/pins/notesPinnedSlice';
import { fetchGetTopics } from 'src/pages/topics/topicSlice';
import { Note } from 'src/types/Note';
import { formatDate } from 'src/utils';
import Modal from '../Modal';
import NoteInfo from '../NoteInfo';
import ButtonDelete from './ButtonDelete';
import ButtonEdit from './ButtonEdit';
import ButtonHardDelete from './ButtonHardDelete';
import ButtonRestore from './ButtonRestore';
import styles from './CardNote.module.scss';

interface Props {
  note: Note;
  is_trash?: boolean;
}

const cx = classNames.bind(styles);

const CardNote: FC<Props> = ({ note, is_trash = false }) => {
  const { _id, content, title, topics, background, user, createdAt, slug, is_pin } = note;

  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePinNote = async () => {
    try {
      setIsLoading(true);
      await dispatch(
        fetchTogglePinNote({ id: _id, data: { is_pin: is_pin ? false : true } })
      ).unwrap();
      setIsLoading(false);
      if (location.pathname === '/') {
        await dispatch(fetchGetTopics()).unwrap();
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const renderActionButtons = () => {
    if (is_trash) {
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
            {!is_trash && (
              <div className={cx('actions')}>
                <span className={cx('btn-info')}>
                  {/* <i className="fa-solid fa-heart"></i> */}
                  {/* <i className="fa-solid fa-heart-circle-check"></i> */}
                </span>
                {isLoading ? (
                  <Spin />
                ) : (
                  <img
                    className={cx('btn-pin')}
                    src={is_pin ? icons.iconPinnedActive : icons.iconPinned}
                    alt=""
                    onClick={handlePinNote}
                  />
                )}
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
          <div className={cx('time')}>{formatDate(createdAt)}</div>
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
