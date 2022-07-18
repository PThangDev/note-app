// Import library
import classNames from 'classnames/bind';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

// Import src
import { useAppDispatch } from 'src/app/hooks';
import { Button } from 'src/layouts/UI';
import { fetchDeleteTopic } from 'src/pages/topics/topicSlice';
import { Topic } from 'src/types/Topic';
import ButtonEdit from './ButtonEdit';
import styles from './CardTopic.module.scss';

interface Props {
  data: Topic;
}

const cx = classNames.bind(styles);

const CardTopic: FC<Props> = ({ data }) => {
  const { name, createdAt, slug, background } = data;
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
        await dispatch(fetchDeleteTopic(data._id));
        Swal.close();
        await Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Delete topic successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.close();
    }
  };

  return (
    <div className={cx('wrapper')} style={{ backgroundColor: background }}>
      <div className={cx('left')}>
        <input type="checkbox" />
        <Link to={`/topics/${slug}`} className={cx('info')}>
          <div className={cx('name')}>{name}</div>
          <div className={cx('created-at')}>{createdAt}</div>
        </Link>
      </div>
      <div className={cx('right')}>
        <Button
          status="error"
          icon={() => <i className="fa-solid fa-trash"></i>}
          onClick={handleDeleteNote}
        >
          Delete
        </Button>
        <ButtonEdit />
      </div>
    </div>
  );
};
export default CardTopic;
