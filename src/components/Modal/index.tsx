import React, { FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { createPortal } from 'react-dom';
import Backdrop from './Backdrop';
import * as options from './options';

interface Props {
  isOpen: boolean;
  closeWhenClickOnOverlay?: boolean;
  closeWhenPressEsc?: boolean;
  children: ReactNode;
  animate?: 'zoom' | 'drop';
  heading?: string;
  className?: string;
  overlayClassName?: string;

  onClose: () => void;
}

const Modal: FC<Props> = ({
  children,
  isOpen,
  closeWhenClickOnOverlay = false,
  closeWhenPressEsc = true,
  animate = 'zoom',
  heading = '',
  className = '',
  overlayClassName = '',
  onClose,
}) => {
  return createPortal(
    <AnimatePresence initial={false} exitBeforeEnter onExitComplete={() => null}>
      {isOpen && (
        <Backdrop
          className={overlayClassName}
          closeWhenPressEsc={closeWhenPressEsc}
          onClick={() => (closeWhenClickOnOverlay ? onClose() : null)}
        >
          {/* Prevent clicks on modal from bubbling to backdrop */}
          <motion.div
            className={`modal ${Boolean(className) ? className : ''}`}
            variants={options[animate]}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="modal-btn-close" onClick={onClose}></span>
            <h3 className="modal-heading">{heading}</h3>
            {children}
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>,
    document.querySelector('body') as HTMLBodyElement
  );
};
export default Modal;
