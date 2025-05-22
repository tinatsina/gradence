import { Col, Row } from 'antd';
import ExamCard from '../../components/examcard/ExamCard';
import styles from './HomePage.module.css';

const HomePage = () => (
  <Row gutter={[16, 16]} className={styles.homepage}>
    <Col span={8}>
      <ExamCard
        title="Mathematics - Final Exam"
        courseCode="MATH101"
        timeLimitMinutes={90}
      />
    </Col>
    <Col span={8}>
      <ExamCard
        title="Physics - Midterm Exam"
        courseCode="PHYS201"
        timeLimitMinutes={120}
      />
    </Col>
    <Col span={8}>
      <ExamCard
        title="Chemistry - Quiz 1"
        courseCode="CHEM301"
        timeLimitMinutes={60}
      />
    </Col>
    <Col span={8}>
      <ExamCard
        title="Biology - Final Exam"
        courseCode="BIO101"
        timeLimitMinutes={75}
      />
    </Col>
    <Col span={8}>
      <ExamCard
        title="History - Midterm Exam"
        courseCode="HIST201"
        timeLimitMinutes={90}
      />
    </Col>
  </Row>
);

export default HomePage;
