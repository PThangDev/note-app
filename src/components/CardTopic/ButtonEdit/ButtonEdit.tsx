// Import library
import classNames from 'classnames/bind';
import { FC, useState } from 'react';
import FormTopic from 'src/components/FormTopic';
import Modal from 'src/components/Modal';
import { Button } from 'src/layouts/UI';
import { Topic } from 'src/types/Topic';
// Import src
import styles from './ButtonEdit.module.scss';

interface Props {
  onClick?: () => void;
  topic: Topic;
}

const cx = classNames.bind(styles);

const ButtonEdit: FC<Props> = ({ onClick, topic }) => {
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setIsOpenEdit(true);
  };
  const handleCloseModal = () => {
    setIsOpenEdit(false);
  };
  return (
    <>
      <Button
        className={cx('wrapper')}
        icon={() => <i className="fa-solid fa-screwdriver-wrench"></i>}
        onClick={handleClick}
      >
        Edit
      </Button>
      <Modal isOpen={isOpenEdit} animate="drop" onClose={() => setIsOpenEdit(false)}>
        <FormTopic onCloseModal={handleCloseModal} data={topic} />
      </Modal>
    </>
  );
};
export default ButtonEdit;
