// Import library
import classNames from 'classnames/bind';
import { FC } from 'react';
import { Link } from 'react-router-dom';

// Import src
import { Topic } from 'src/types/Topic';
import ButtonDelete from './ButtonDelete';
import ButtonEdit from './ButtonEdit';
import styles from './CardTopic.module.scss';

interface Props {
  data: Topic;
}

const cx = classNames.bind(styles);

const CardTopic: FC<Props> = ({ data }) => {
  const { name, createdAt, slug, background } = data;

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
        <ButtonDelete id={data._id} />
        <ButtonEdit />
      </div>
    </div>
  );
};
export default CardTopic;
