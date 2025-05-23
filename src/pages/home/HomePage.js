/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Col, Row, Typography, Card, Button, Popconfirm, Modal, Form, Input, InputNumber } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ExamCard from '../../components/examcard/ExamCard';
import styles from './HomePage.module.css';

const { Title, Text } = Typography;

const initialExams = [
  {
    id: 1,
    title: 'Mathematics - Final Exam',
    courseCode: 'MATH101',
    timeLimitMinutes: 90,
  },
  {
    id: 2,
    title: 'Physics - Midterm Exam',
    courseCode: 'PHYS201',
    timeLimitMinutes: 120,
  },
  {
    id: 3,
    title: 'Chemistry - Quiz 1',
    courseCode: 'CHEM301',
    timeLimitMinutes: 60,
  },
  {
    id: 4,
    title: 'Biology - Final Exam',
    courseCode: 'BIO101',
    timeLimitMinutes: 75,
  },
  {
    id: 5,
    title: 'History - Midterm Exam',
    courseCode: 'HIST201',
    timeLimitMinutes: 90,
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState(initialExams);

  // Modal state for adding/editing exam
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null); // null for add, exam object for edit
  const [form] = Form.useForm();

  // Navigate to exam page (could pass exam id if needed)
  // eslint-disable-next-line no-unused-vars
  const handleCardClick = (id) => {
    navigate('/exam');
  };

  // Show modal for adding
  const handleAddExam = () => {
    setEditingExam(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // Show modal for editing
  const handleEditExam = (id) => {
    const exam = exams.find((e) => e.id === id);
    if (!exam) return;
    setEditingExam(exam);
    form.setFieldsValue({
      title: exam.title,
      courseCode: exam.courseCode,
      timeLimitMinutes: exam.timeLimitMinutes,
    });
    setIsModalOpen(true);
  };

  // Handle form submit for add/edit
  const handleFormFinish = (values) => {
    if (editingExam) {
      // Edit mode
      setExams(
        exams.map((e) =>
          e.id === editingExam.id
            ? { ...e, ...values }
            : e
        )
      );
    } else {
      // Add mode
      setExams([
        ...exams,
        {
          id: Date.now(),
          ...values,
        },
      ]);
    }
    setIsModalOpen(false);
    setEditingExam(null);
    form.resetFields();
  };

  // Cancel modal
  const handleModalCancel = () => {
    setIsModalOpen(false);
    setEditingExam(null);
    form.resetFields();
  };

  // Remove exam
  const handleRemoveExam = (id) => {
    setExams(exams.filter((e) => e.id !== id));
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
          {exams.map((exam) => (
            <Col xs={24} sm={12} md={8} key={exam.id}>
              <div
                onClick={() => handleCardClick(exam.id)}
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
                  position: 'relative',
                  flexDirection: 'column',
                }}
                className={styles.examCardHover}
              >
                <ExamCard
                  title={exam.title}
                  courseCode={exam.courseCode}
                  timeLimitMinutes={exam.timeLimitMinutes}
                />
                <div style={{ position: 'absolute', top: 10, right: 16, display: 'flex', gap: 8 }}>
                  <Button
                    icon={<EditOutlined />}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditExam(exam.id);
                    }}
                  />
                  <Popconfirm
                    title="Delete this exam?"
                    onConfirm={(e) => {
                      e.stopPropagation();
                      handleRemoveExam(exam.id);
                    }}
                    onCancel={(e) => e.stopPropagation()}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      icon={<DeleteOutlined />}
                      size="small"
                      danger
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Popconfirm>
                </div>
              </div>
            </Col>
          ))}
          {/* Plus icon card for adding new exam */}
          <Col xs={24} sm={12} md={8}>
            <div
              onClick={handleAddExam}
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
                flexDirection: 'column',
              }}
              className={styles.examCardHover}
            >
              <Button
                type="dashed"
                shape="circle"
                icon={<PlusOutlined style={{ fontSize: 32 }} />}
                size="large"
                style={{ marginBottom: 12, borderColor: '#bae6fd', background: '#f0fdfa' }}
              />
              <span style={{ color: '#1677ff', fontWeight: 500, fontSize: 16 }}>
                Create New Exam
              </span>
            </div>
          </Col>
        </Row>
      </Card>
      {/* Modal for adding/editing exam */}
      <Modal
        title={editingExam ? 'Edit Exam' : 'Create New Exam'}
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormFinish}
        >
          <Form.Item
            label="Exam Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the exam title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Course Code"
            name="courseCode"
            rules={[{ required: true, message: 'Please enter the course code' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Time Limit (minutes)"
            name="timeLimitMinutes"
            rules={[
              { required: true, message: 'Please enter the time limit' },
              { type: 'number', min: 1, message: 'Must be at least 1 minute' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={1} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingExam ? 'Save Changes' : 'Add Exam'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HomePage;
