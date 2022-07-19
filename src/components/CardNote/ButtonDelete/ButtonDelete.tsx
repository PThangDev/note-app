// Import library
import classNames from 'classnames/bind';
import { FC } from 'react';
import Swal from 'sweetalert2';

// Import src
import styles from './ButtonDelete.module.scss';
import { useAppDispatch } from 'src/app/hooks';
import { Button } from 'src/layouts/UI';
import { fetchDeleteNote } from 'src/pages/notes/noteSlice';

interface Props {
  id?: string;
  onFinishDelete?: () => void;
}

const cx = classNames.bind(styles);

const ButtonDelete: FC<Props> = ({ id = '', onFinishDelete }) => {
  const dispatch = useAppDispatch();
  const handleDeleteNote = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Loading...',
          didOpen: () => {
            Swal.showLoading();
          },
          allowEscapeKey: false,
          allowOutsideClick: false,
        });
        const response = await dispatch(fetchDeleteNote(id)).unwrap();
        if (onFinishDelete) {
          onFinishDelete();
        }
        await Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${response.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
        Swal.close();
      }
    } catch (error) {
      // Swal.close();
    }
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
