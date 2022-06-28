import classNames from 'classnames/bind';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { dataNotes } from 'src/api/dataFake';

import CardNote from 'src/components/CardNote';
import styles from './CardContainer.module.scss';

interface Props {
  heading: string;
  isLoading?: boolean;
  to?: string;
}

const cx = classNames.bind(styles);

const CardContainer: FC<Props> = ({ heading = '', to, isLoading = false }) => {
  const renderHeading = () => {
    if (to) {
      return (
        <Link
          className={cx('heading', 'heading--link')}
          to={to}
          onClick={(e) => (isLoading ? e.preventDefault() : null)}
        >
          {isLoading ? 'Loading...' : heading}
        </Link>
      );
    } else {
      return <h3 className={cx('heading')}>{isLoading ? 'Loading...' : heading}</h3>;
    }
  };
  return (
    <div className={cx('wrapper')}>
      {renderHeading()}
      <div className={cx('container')}>
        {dataNotes.map((note) => (
          <CardNote key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};
export default CardContainer;
