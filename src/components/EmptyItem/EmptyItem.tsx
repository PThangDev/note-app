import classNames from 'classnames/bind';
import { FC } from 'react';

import styles from './EmptyItem.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const EmptyItem: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>Empty Item</div>;
};
export default EmptyItem;
