// Import library
import classNames from 'classnames/bind';
import React, { FC } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { Button } from 'src/layouts/UI';
import { fetchUpdateNotes } from 'src/pages/notes/noteSlice';
import { UpdateNotesRequest } from 'src/types/Note';
import sweetAlert from 'src/utils/sweetAlert';
// Import src
import styles from './ButtonDeleteMany.module.scss';

interface Props {
  noteIds: string[];
}

const cx = classNames.bind(styles);

const ButtonDeleteMany: FC<Props> = ({ noteIds }) => {
  const count = noteIds.length;
  const dispatch = useAppDispatch();

  const handleDeleteNotes = async () => {
    try {
      const result = await sweetAlert.confirm({
        text: `Do you want to remove ${count} note to trash ?`,
      });
      if (result.isConfirmed) {
        sweetAlert.loading();
        await dispatch(fetchUpdateNotes({ noteIds, update: { is_trash: true } })).unwrap();
        sweetAlert.success(`Remove ${count} note to trash successfully`);
      }
    } catch (error) {
      sweetAlert.close();
    }
  };

  if (!count) {
    return null;
  }
  return (
    <Button
      className={cx('wrapper')}
      icon={() => <i className="fa-solid fa-trash"></i>}
      onClick={handleDeleteNotes}
      status="error"
    >
      Delete Many {count > 0 && <span>({count})</span>}
    </Button>
  );
};
export default ButtonDeleteMany;
