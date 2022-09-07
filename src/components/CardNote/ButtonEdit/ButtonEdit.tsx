import classNames from 'classnames/bind';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormNote from 'src/components/FormNote';
import Modal from 'src/components/Modal';
import { Button } from 'src/layouts/UI';
import { Note } from 'src/types/Note';
import styles from './ButtonEdit.module.scss';

interface Props {
  note?: Note;
  redirect?: boolean;
}

const cx = classNames.bind(styles);

const ButtonEdit: FC<Props> = ({ note, redirect = false }) => {
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenModalEdit = () => {
    setIsOpenEdit(true);
  };
  const handleCloseModalEdit = () => {
    setIsOpenEdit(false);
  };
  const handleFinishUpdate = (note?: Note) => {
    setIsOpenEdit(false);

    if (!redirect) return;

    navigate(`/notes/${note?._id}/${note?.slug}`);
  };
  return (
    <>
      <Button
        className={cx('wrapper')}
        icon={() => <i className="fa-solid fa-screwdriver-wrench"></i>}
        onClick={handleOpenModalEdit}
      >
        Edit
      </Button>
      <Modal
        className={cx('modal-edit-note')}
        isOpen={isOpenEdit}
        animate="zoom"
        onClose={() => setIsOpenEdit(false)}
      >
        <FormNote
          data={note}
          onFinishSubmit={handleFinishUpdate}
          onCloseModal={handleCloseModalEdit}
        />
      </Modal>
    </>
  );
};
export default ButtonEdit;
