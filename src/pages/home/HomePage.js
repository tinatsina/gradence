/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import ExamCard from '../../components/examcard/ExamCard';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();

  // Helper to handle card click
  const handleCardClick = () => {
    navigate('/exam');
  };

  return (
    <Row gutter={[16, 16]} className={styles.homepage}>
      <Col xs={24} sm={12} md={8}>
        <div onClick={handleCardClick} style={{ cursor: 'pointer', width: '100%' }}>
          <ExamCard
            title="Mathematics - Final Exam"
            courseCode="MATH101"
            timeLimitMinutes={90}
          />
        </div>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <div onClick={handleCardClick} style={{ cursor: 'pointer', width: '100%' }}>
          <ExamCard
            title="Physics - Midterm Exam"
            courseCode="PHYS201"
            timeLimitMinutes={120}
          />
        </div>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <div onClick={handleCardClick} style={{ cursor: 'pointer', width: '100%' }}>
          <ExamCard
            title="Chemistry - Quiz 1"
            courseCode="CHEM301"
            timeLimitMinutes={60}
          />
        </div>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <div onClick={handleCardClick} style={{ cursor: 'pointer', width: '100%' }}>
          <ExamCard
            title="Biology - Final Exam"
            courseCode="BIO101"
            timeLimitMinutes={75}
          />
        </div>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <div onClick={handleCardClick} style={{ cursor: 'pointer', width: '100%' }}>
          <ExamCard
            title="History - Midterm Exam"
            courseCode="HIST201"
            timeLimitMinutes={90}
          />
        </div>
      </Col>
    </Row>
  );
};

export default HomePage;
