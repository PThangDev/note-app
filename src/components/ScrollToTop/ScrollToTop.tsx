import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {}

const ScrollToTop: FC<Props> = (props) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};
export default ScrollToTop;
