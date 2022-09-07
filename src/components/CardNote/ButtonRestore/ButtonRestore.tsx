import classNames from 'classnames/bind';
import { FC } from 'react';

import { useAppDispatch } from 'src/app/hooks';
import { Button } from 'src/layouts/UI';
import { fetchUpdateNoteToTrash } from 'src/pages/notes/noteSlice';
import sweetAlert from 'src/utils/sweetAlert';
import styles from './ButtonRestore.module.scss';

interface Props {
  id: string;
}

const cx = classNames.bind(styles);

const ButtonRestore: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const handleRestoreNote = async () => {
    try {
      const result = await sweetAlert.confirm({ text: 'Do you want to restore this note ?' });
      if (result.isConfirmed) {
        await dispatch(fetchUpdateNoteToTrash({ data: { is_trash: false }, id })).unwrap();
        sweetAlert.success('Restore note successfully', 500);
      }
    } catch (error) {}
  };

  return (
    <Button
      className={cx('wrapper')}
      icon={() => <i className="fa-solid fa-trash-arrow-up"></i>}
      onClick={handleRestoreNote}
    >
      Restore
    </Button>
  );
};
export default ButtonRestore;
