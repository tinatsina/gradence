import PropTypes from 'prop-types';
import { Card } from 'antd';
import styles from './ExamCard.module.css';

const ExamCard = ({ title, courseCode, timeLimitMinutes }) => (
  <>
    <Card title={title} variant="borderless" className={styles.card} hoverable>
      <p>
        Course Code:
        {courseCode}
      </p>
      <p>
        Time Limit:
        {timeLimitMinutes}
        minutes
      </p>
    </Card>
  </>
);

ExamCard.propTypes = {
  title: PropTypes.string.isRequired,
  courseCode: PropTypes.string.isRequired,
  timeLimitMinutes: PropTypes.number.isRequired,
};

export default ExamCard;
