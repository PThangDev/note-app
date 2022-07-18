// Import library
import classNames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import Button from 'src/layouts/UI/Button';
import { fetchVerifyAccount } from '../authSlice';
// Import src
import styles from './ActiveAccountPage.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const ActiveAccountPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { activeToken } = useParams();

  const handleVerifyAccount = async () => {
    if (!activeToken) return;
    dispatch(fetchVerifyAccount(activeToken));
  };

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>Active Account</title>
        <meta name="description" content="Home page note app - PThangDev"></meta>
      </Helmet>
      {/* Body */}
      <div className={cx('wrapper')}>
        <h1 className={cx('heading')}>Active Account</h1>
        <p className={cx('icon-check')}>
          <i className="fa-solid fa-circle-question"></i>
        </p>
        <Button className={cx('btn-verify')} onClick={handleVerifyAccount}>
          Verify your Email
        </Button>
        <p className={cx('note')}>(*) Click to button to verify your email</p>
      </div>
    </>
  );
};
export default ActiveAccountPage;
