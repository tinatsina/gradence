/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Col, Row, Typography, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import ExamCard from '../../components/examcard/ExamCard';
import styles from './HomePage.module.css';

const { Title, Text } = Typography;

const HomePage = () => {
  const navigate = useNavigate();

  // Helper to handle card click
  const handleCardClick = () => {
    navigate('/exam');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdfa 0%, #e0e7ff 100%)',
        padding: '40px 0',
      }}
    >
      <Card
        style={{
          maxWidth: 900,
          margin: '0 auto 32px auto',
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(30,41,59,0.10)',
          background: 'rgba(255,255,255,0.95)',
          padding: 32,
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2} style={{ color: '#1e293b', marginBottom: 0 }}>
            Welcome to Gradence Exams
          </Title>
          <Text type="secondary" style={{ fontSize: 18 }}>
            Select an exam to get started
          </Text>
        </div>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <div
              onClick={handleCardClick}
              style={{
                cursor: 'pointer',
                width: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                borderRadius: 16,
                boxShadow: '0 2px 12px rgba(22,119,255,0.08)',
                background: 'linear-gradient(120deg, #e0e7ff 60%, #f0fdfa 100%)',
                padding: 8,
                minHeight: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className={styles.examCardHover}
            >
              <ExamCard
                title="Mathematics - Final Exam"
                courseCode="MATH101"
                timeLimitMinutes={90}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div
              onClick={handleCardClick}
              style={{
                cursor: 'pointer',
                width: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                borderRadius: 16,
                boxShadow: '0 2px 12px rgba(22,119,255,0.08)',
                background: 'linear-gradient(120deg, #f0fdfa 60%, #e0e7ff 100%)',
                padding: 8,
                minHeight: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className={styles.examCardHover}
            >
              <ExamCard
                title="Physics - Midterm Exam"
                courseCode="PHYS201"
                timeLimitMinutes={120}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div
              onClick={handleCardClick}
              style={{
                cursor: 'pointer',
                width: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                borderRadius: 16,
                boxShadow: '0 2px 12px rgba(22,119,255,0.08)',
                background: 'linear-gradient(120deg, #e0e7ff 60%, #f0fdfa 100%)',
                padding: 8,
                minHeight: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className={styles.examCardHover}
            >
              <ExamCard
                title="Chemistry - Quiz 1"
                courseCode="CHEM301"
                timeLimitMinutes={60}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div
              onClick={handleCardClick}
              style={{
                cursor: 'pointer',
                width: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                borderRadius: 16,
                boxShadow: '0 2px 12px rgba(22,119,255,0.08)',
                background: 'linear-gradient(120deg, #f0fdfa 60%, #e0e7ff 100%)',
                padding: 8,
                minHeight: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className={styles.examCardHover}
            >
              <ExamCard
                title="Biology - Final Exam"
                courseCode="BIO101"
                timeLimitMinutes={75}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div
              onClick={handleCardClick}
              style={{
                cursor: 'pointer',
                width: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                borderRadius: 16,
                boxShadow: '0 2px 12px rgba(22,119,255,0.08)',
                background: 'linear-gradient(120deg, #e0e7ff 60%, #f0fdfa 100%)',
                padding: 8,
                minHeight: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className={styles.examCardHover}
            >
              <ExamCard
                title="History - Midterm Exam"
                courseCode="HIST201"
                timeLimitMinutes={90}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default HomePage;
