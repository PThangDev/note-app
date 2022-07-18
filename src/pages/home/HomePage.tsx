import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import React, { FC, useContext, useState } from 'react';
import CardContainer from 'src/containers/CardNoteContainer';
import Button from 'src/layouts/UI/Button';
import Modal from 'src/components/Modal';
import { ModalContext } from 'src/components/ModalProvider/ModalProvider';
import { Helmet } from 'react-helmet';

interface Props {}

const cx = classNames.bind(styles);

const HomePage: FC<Props> = (props) => {
  const [isOpenCreateNote, setIsOpenCreateNode] = useState<boolean>(false);
  const { setIsOpenNote } = useContext(ModalContext);
  const handleOpenCreateNote = () => {
    setIsOpenNote(true);
  };

  return (
    <>
      <Helmet>
        <title>Note app - home</title>
        <meta name="description" content="Home page note app - PThangDev"></meta>
      </Helmet>

      <div className={cx('wrapper')}>
        <Button
          className={cx('btn-create-note')}
          icon={() => <i className="fa-solid fa-circle-plus"></i>}
          // onClick={() => setIsOpenCreateNode(true)}
          onClick={handleOpenCreateNote}
        >
          Create new note
        </Button>
      </div>
      <Modal
        isOpen={isOpenCreateNote}
        closeWhenClickOnOverlay
        animate="drop"
        onClose={() => setIsOpenCreateNode(false)}
      >
        Create new note
      </Modal>
    </>
  );
};
export default HomePage;
