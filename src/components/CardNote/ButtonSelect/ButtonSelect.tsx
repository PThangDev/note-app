import classNames from 'classnames/bind';
import { FC } from 'react';
import { Button } from 'src/layouts/UI';

import styles from './ButtonSelect.module.scss';

interface Props {
  onClick: () => void;
  isActive: boolean;
}

const cx = classNames.bind(styles);

const ButtonSelect: FC<Props> = ({ onClick, isActive }) => {
  const handleToggleSelect = () => {
    onClick();
  };

  return (
    <Button
      icon={() => <i className="fa-solid fa-calendar-check"></i>}
      onClick={handleToggleSelect}
    >
      {isActive ? 'Cancel' : 'Select'}
    </Button>
  );
};
export default ButtonSelect;
