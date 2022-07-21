// Import library
import classNames from 'classnames/bind';
import React, { FC } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { Button } from 'src/layouts/UI';
import { fetchUpdateNoteToTrash } from 'src/pages/notes/noteSlice';
import sweetalert from 'src/utils/sweetalert';
// Import src
import styles from './ButtonRestore.module.scss';

interface Props {
  id: string;
}

const cx = classNames.bind(styles);

const ButtonRestore: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const handleRestoreNote = async () => {
    try {
      const result = await sweetalert.confirm({ text: 'Do you want to restore this note ?' });
      if (result.isConfirmed) {
        await dispatch(fetchUpdateNoteToTrash({ data: { type: 'default' }, id })).unwrap();
        sweetalert.success('Restore note successfully');
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
