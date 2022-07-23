// Import library
import classNames from 'classnames/bind';
import { FC } from 'react';

// Import src
import { useAppDispatch } from 'src/app/hooks';
import { Button } from 'src/layouts/UI';
import { fetchUpdateNoteToTrash } from 'src/pages/notes/noteSlice';
import sweetAlert from 'src/utils/sweetAlert';
import styles from './ButtonDelete.module.scss';

interface Props {
  id?: string;
  onFinishDelete?: () => void;
}

const cx = classNames.bind(styles);

const ButtonDelete: FC<Props> = ({ id = '', onFinishDelete }) => {
  const dispatch = useAppDispatch();

  const handleDeleteNote = async () => {
    try {
      const result = await sweetAlert.confirm({ text: 'Your note will be moved to trash' });
      if (result.isConfirmed) {
        await dispatch(fetchUpdateNoteToTrash({ data: { type: 'trash' }, id })).unwrap();
        sweetAlert.success('Your note was moved to trash');
        if (onFinishDelete) {
          onFinishDelete();
        }
      }
    } catch (error) {}
  };
  return (
    <Button
      className={cx('wrapper')}
      icon={() => <i className="fa-solid fa-trash"></i>}
      onClick={handleDeleteNote}
      status="error"
    >
      Delete
    </Button>
  );
};
export default ButtonDelete;
