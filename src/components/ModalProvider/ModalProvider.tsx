// Import library
import classNames from 'classnames/bind';
import React, { createContext, FC, ReactNode, useState } from 'react';
import Modal from '../Modal';
// Import src
import styles from './ModalProvider.module.scss';

interface Props {
  children: ReactNode;
}

const cx = classNames.bind(styles);

export const ModalContext = createContext<{ isOpenNote: boolean; setIsOpenNote: (value: boolean) => void }>({
  isOpenNote: false,
  setIsOpenNote: () => {},
});

const ModalProvider: FC<Props> = ({ children }) => {
  const [isOpenNote, setIsOpenNote] = useState<boolean>(false);

  const value = {
    isOpenNote,
    setIsOpenNote,
  };
  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <Modal isOpen={isOpenNote} onClose={() => setIsOpenNote(false)}>
        Content Node
      </Modal>
    </>
  );
};
export default ModalProvider;
