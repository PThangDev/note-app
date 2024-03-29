import classNames from 'classnames/bind';
import { FC } from 'react';

import { useAppDispatch } from 'src/app/hooks';
import { Button } from 'src/layouts/UI';
import { fetchDeleteNote } from 'src/pages/notes/noteSlice';
import sweetAlert from 'src/utils/sweetAlert';
import styles from './ButtonHardDelete.module.scss';

interface Props {
  id?: string;
  onFinishDelete?: () => void;
}

const cx = classNames.bind(styles);

const ButtonHardDelete: FC<Props> = ({ id = '', onFinishDelete }) => {
  const dispatch = useAppDispatch();

  const handleHardDelete = async () => {
    try {
      const result = await sweetAlert.confirm();
      if (result.isConfirmed) {
        await dispatch(fetchDeleteNote(id)).unwrap();
      }

      if (onFinishDelete) {
        onFinishDelete();
      }
    } catch (error) {}
  };
  return (
    <Button
      className={cx('wrapper')}
      icon={() => <i className="fa-solid fa-trash-can"></i>}
      onClick={handleHardDelete}
      status="error"
    >
      Delete
    </Button>
  );
};
export default ButtonHardDelete;
