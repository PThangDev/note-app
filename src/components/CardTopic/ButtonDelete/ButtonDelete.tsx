// Import library
import classNames from 'classnames/bind';
import { FC } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { Button } from 'src/layouts/UI';
import { fetchDeleteTopic } from 'src/pages/topics/topicSlice';
import Swal from 'sweetalert2';
// Import src
import styles from './ButtonDelete.module.scss';

interface Props {
  id: string;
}

const cx = classNames.bind(styles);

const ButtonDelete: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const handleDeleteTopic = async () => {
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
        await dispatch(fetchDeleteTopic(id)).unwrap();
      }
    } catch (error) {}
  };

  return (
    <>
      <Button
        className={cx('wrapper')}
        status="error"
        icon={() => <i className="fa-solid fa-trash"></i>}
        onClick={handleDeleteTopic}
      >
        Delete
      </Button>
    </>
  );
};
export default ButtonDelete;
