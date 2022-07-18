// Import library
import classNames from 'classnames/bind';
import React, { FC, useState } from 'react';

// Import src
import styles from './ButtonCreate.module.scss';
import FormNote from 'src/components/FormNote';
import Modal from 'src/components/Modal';
import { Button } from 'src/layouts/UI';
import { Helmet } from 'react-helmet';

interface Props {}

const cx = classNames.bind(styles);

const ButtonCreate: FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleFinishSubmit = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className={cx('wrapper')}>
        <Button
          icon={() => <i className="fa-solid fa-circle-plus"></i>}
          onClick={() => setIsOpen(true)}
        >
          Add new note
        </Button>
        <Modal className={cx('custom-modal')} isOpen={isOpen} onClose={handleCloseModal}>
          <FormNote onFinishSubmit={handleFinishSubmit} />
        </Modal>
      </div>
    </>
  );
};
export default ButtonCreate;
