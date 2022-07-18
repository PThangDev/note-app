// Import library
import classNames from 'classnames/bind';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormNote from 'src/components/FormNote';
import Modal from 'src/components/Modal';
import { Button } from 'src/layouts/UI';
import { Note } from 'src/types/Note';
// Import src
import styles from './ButtonEdit.module.scss';

interface Props {
  note?: Note;
}

const cx = classNames.bind(styles);

const ButtonEdit: FC<Props> = ({ note }) => {
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenModalEdit = () => {
    setIsOpenEdit(true);
  };
  const handleFinishUpdate = (note?: Note) => {
    setIsOpenEdit(false);
    navigate(`/notes/${note?.slug}`);
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
        <FormNote data={note} onFinishSubmit={handleFinishUpdate} />
      </Modal>
    </>
  );
};
export default ButtonEdit;
