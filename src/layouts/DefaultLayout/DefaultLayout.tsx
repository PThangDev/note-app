// Import library
import classNames from 'classnames/bind';
import { FC, ReactNode, useState } from 'react';
// Import src
import Header from 'src/components/Header';
import ModalProvider from 'src/components/ModalProvider';
import Sidebar from 'src/components/Sidebar';
import styles from './DefaultLayout.module.scss';

interface Props {
  children: ReactNode;
}
const cx = classNames.bind(styles);
const DefaultLayout: FC<Props> = ({ children }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);

  const handleToggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };
  return (
    <ModalProvider>
      <div className={cx('wrapper', { 'close-sidebar': !isOpenSidebar })}>
        <Header isOpenSidebar={isOpenSidebar} onToggleSidebar={handleToggleSidebar} />
        <div className={cx('inner')}>
          <Sidebar isOpen={isOpenSidebar} />
          <main className={cx('main')}>{children}</main>
        </div>
        {/* <Menubar /> */}
      </div>
    </ModalProvider>
  );
};
export default DefaultLayout;
