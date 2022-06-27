import React, { CSSProperties, FC, ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  closeWhenPressEsc?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick: () => void;
}

const Backdrop: FC<Props> = ({ children, className = '', closeWhenPressEsc = true, style = {}, onClick }) => {
  useEffect(() => {
    if (closeWhenPressEsc) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.keyCode === 27) {
          onClick();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [closeWhenPressEsc, onClick]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`backdrop ${Boolean(className) ? className : ''}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
export default Backdrop;
