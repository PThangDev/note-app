// Import library
import classNames from 'classnames/bind';
import React, { FC, useState } from 'react';
import Modal from 'src/components/Modal';
import { Button } from 'src/layouts/UI';
// Import src
import styles from './ButtonEdit.module.scss';

interface Props {
  onClick?: () => void;
}

const cx = classNames.bind(styles);

const ButtonEdit: FC<Props> = ({ onClick }) => {
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setIsOpenEdit(true);
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
      <Modal isOpen={isOpenEdit} animate="zoom" onClose={() => setIsOpenEdit(false)}>
        <>Edit</>
      </Modal>
    </>
  );
};
export default ButtonEdit;
