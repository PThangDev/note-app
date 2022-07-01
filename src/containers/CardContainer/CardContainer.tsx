import classNames from 'classnames/bind';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { dataNotes } from 'src/api/dataFake';

import CardNote from 'src/components/CardNote';
import { Col, Container, Row } from 'src/layouts/UI/Grid';
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
      <Container>
        <Row>
          {dataNotes.map((note) => (
            <Col key={note.id} col={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 3 }}>
              <CardNote key={note.id} note={note} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default CardContainer;
