import classNames from 'classnames/bind';
import { FC } from 'react';

import { useAppDispatch } from 'src/app/hooks';
import { Button } from 'src/layouts/UI';
import { fetchUpdateNotes } from 'src/pages/notes/noteSlice';
import sweetAlert from 'src/utils/sweetAlert';
import styles from './ButtonDeleteMany.module.scss';

interface Props {
  noteIds: string[];
  hardDelete?: boolean;
}

const cx = classNames.bind(styles);

const ButtonDeleteMany: FC<Props> = ({ noteIds, hardDelete = false }) => {
  const count = noteIds.length;
  const dispatch = useAppDispatch();

  const handleDeleteNotes = async () => {
    try {
      if (!hardDelete) {
        const result = await sweetAlert.confirm({
          text: `Do you want to remove ${count} note to trash ?`,
        });
        if (result.isConfirmed) {
          sweetAlert.loading();
          await dispatch(fetchUpdateNotes({ noteIds, update: { is_trash: true } })).unwrap();
          sweetAlert.success(`Remove ${count} note to trash successfully`);
        }
      } else {
        const result = await sweetAlert.confirm({
          text: `Do you want to permanently delete ${count} note ?`,
        });
        if (result.isConfirmed) {
          await dispatch(fetchDeleteManyNotes({ notes: noteIds })).unwrap();
        }
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
      Delete {count > 0 && <span>({count})</span>}
    </Button>
  );
};
export default ButtonDeleteMany;
