import { Col, Row } from 'antd';
import ExamCard from '../../components/examcard/ExamCard';
import styles from './HomePage.module.css';

const HomePage = () => (
  <>
    <Row gutter={16} className={styles.homepage}>
      <Col span={8}>
        <ExamCard examName="Maths" creationDate="Monda 12 Jan" />
      </Col>
      <Col span={8}>
        <ExamCard examName="Physics" creationDate="Tuesday 15 March" />
      </Col>
      <Col span={8}>
        <ExamCard examName="Chemistry" creationDate="Friday 12 April" />
      </Col>
    </Row>
  </>
);

export default HomePage;
