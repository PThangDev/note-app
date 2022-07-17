// Import library
import classNames from 'classnames/bind';
import React, { FC, useState } from 'react';
import Modal from 'src/components/Modal';
import { Button } from 'src/layouts/UI';
// Import src
import styles from './ButtonDelete.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const ButtonDelete: FC<Props> = (props) => {
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  return (
    <>
      <Button
        className={cx('wrapper')}
        icon={() => <i className="fa-solid fa-trash"></i>}
        onClick={() => setIsOpenDelete(true)}
      >
        Delete
      </Button>
      <Modal isOpen={isOpenDelete} animate="drop" onClose={() => setIsOpenDelete(false)}>
        <>Delete</>
      </Modal>
    </>
  );
};
export default ButtonDelete;
