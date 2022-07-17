// Import library
import classNames from 'classnames/bind';
import { FC, useState } from 'react';
import FormTopic from 'src/components/FormTopic';
import Modal from 'src/components/Modal';
import { Button } from 'src/layouts/UI';
// Import src
import styles from './ButtonCreate.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const ButtonCreate: FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <div className={cx('wrapper')}>
      <Button
        icon={() => <i className="fa-solid fa-circle-plus"></i>}
        onClick={() => setIsOpen(true)}
      >
        Add new topic
      </Button>
      <Modal
        className={cx('custom-modal')}
        animate="zoom"
        isOpen={isOpen}
        onClose={handleCloseModal}
      >
        <FormTopic onCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
};
export default ButtonCreate;
