import PropTypes from 'prop-types';
import { Card } from 'antd';
import styles from './ExamCard.module.css';

const ExamCard = ({ examName, creationDate }) => (
  <>
    <Card title={examName} variant="borderless" className={styles.card} hoverable="true">
      <p>Card content</p>
      <p>{creationDate}</p>
    </Card>
  </>
);

ExamCard.propTypes = {
  examName: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
};

export default ExamCard;
