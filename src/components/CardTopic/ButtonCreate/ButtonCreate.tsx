// Import library
import classNames from 'classnames/bind';
import { FC, useState } from 'react';
import FormTopic from 'src/components/FormTopic';
import Modal from 'src/components/Modal';
import { Button } from 'src/layouts/UI';
// Import src
import styles from './ButtonCreate.module.scss';

interface Props {
  className?: string;
  text?: string;
}

const cx = classNames.bind(styles);

const ButtonCreate: FC<Props> = ({ className = '', text = 'Add new topic' }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <div className={cx('wrapper')}>
      <Button
        className={className}
        icon={() => <i className="fa-solid fa-circle-plus"></i>}
        onClick={() => setIsOpen(true)}
      >
        {text}
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
