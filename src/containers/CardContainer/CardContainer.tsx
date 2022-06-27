import classNames from 'classnames/bind';
import styles from './CardContainer.module.scss';
import React, { FC } from 'react';
import Card from 'src/components/Card';
import { Link } from 'react-router-dom';

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
        <Card />
      </div>
    </div>
  );
};
export default CardContainer;
