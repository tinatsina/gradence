import './ExamCard.module.css';
import PropTypes from 'prop-types';

const ExamCard = ({ examName, creationDate }) => (
  <div className="div">
    <h1>{examName}</h1>
    <h2>{creationDate}</h2>
  </div>
);

ExamCard.propTypes = {
  examName: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
};

export default ExamCard;
