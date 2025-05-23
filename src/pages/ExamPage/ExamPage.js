/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  List, Card, Button, Input, Modal, Form, Radio, Typography, Tag, Space,
} from 'antd';
import { PrinterOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import pdfMake from 'pdfmake/build/pdfmake';
// eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars
import pdfFonts from 'pdfmake/build/vfs_fonts';
import getRandomQuote from '../../scripts/Quotes';

const { Title, Text } = Typography;

const initialQuestions = [
  {
    questionId: 'GEO101',
    topic: 'Geography',
    difficulty: 'Easy',
    questionText: 'What is the capital of France?',
    options: [
      { id: 'A', text: 'London' },
      { id: 'B', text: 'Paris' },
      { id: 'C', text: 'Berlin' },
      { id: 'D', text: 'Madrid' },
    ],
    correctAnswerId: 'B',
    points: 1,
  },
  {
    questionId: 'MATH101',
    topic: 'Mathematics',
    difficulty: 'Medium',
    questionText: 'What is 2 + 2?',
    options: [
      { id: 'A', text: '3' },
      { id: 'B', text: '4' },
      { id: 'C', text: '5' },
      { id: 'D', text: '6' },
    ],
    correctAnswerId: 'B',
    points: 1,
  },
];

// Helper to shuffle an array (Fisher-Yates)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Update generateExamPdf to randomize options and add answers page
async function generateExamPdf(questions) {
  let quote = '';
  try {
    quote = getRandomQuote();
  } catch (e) {
    quote = '“Education is the most powerful weapon which you can use to change the world.”';
  }

  // Randomize the order of questions
  const shuffledQuestions = shuffleArray(questions);

  // Randomize options for each question and keep track of new correct answer IDs
  const randomizedQuestions = shuffledQuestions.map((q) => {
    const shuffledOptions = shuffleArray(q.options);
    const newCorrect = shuffledOptions.find((opt) => opt.id === q.correctAnswerId);
    const newCorrectIndex = shuffledOptions.indexOf(newCorrect);
    // Assign new IDs (A, B, C, D) after shuffling
    const relabeledOptions = shuffledOptions.map((opt, idx) => ({
      ...opt,
      id: String.fromCharCode(65 + idx),
    }));
    // Find the new correct answer ID after relabeling
    const newCorrectAnswerId = relabeledOptions[newCorrectIndex].id;
    return {
      ...q,
      options: relabeledOptions,
      correctAnswerId: newCorrectAnswerId,
      originalCorrectText: newCorrect.text,
    };
  });

  const content = [
    { text: 'Exam Questions', style: 'header', margin: [0, 0, 0, 20] },
    ...randomizedQuestions.map((q, idx) => ({
      stack: [
        { text: `${idx + 1}. ${q.questionText}`, style: 'question' },
        {
          ul: q.options.map((opt) => `${opt.id}. ${opt.text}`),
          margin: [0, 4, 0, 4],
        },
        { text: `Points: ${q.points}`, style: 'points', margin: [0, 0, 0, 10] },
      ],
      margin: [0, 0, 0, 10],
    })),
    // Add answers page
    { text: '', pageBreak: 'after' },
    { text: 'Answers', style: 'header', margin: [0, 0, 0, 20] },
    ...randomizedQuestions.map((q, idx) => ({
      text: `${idx + 1}. ${q.correctAnswerId} (${q.originalCorrectText})`,
      margin: [0, 0, 0, 8],
      style: 'answer',
    })),
  ];

  const docDefinition = {
    content,
    styles: {
      header: { fontSize: 22, bold: true, alignment: 'center' },
      question: { fontSize: 14, bold: true, margin: [0, 8, 0, 4] },
      points: { fontSize: 12, italics: true, color: '#888' },
      footerQuote: { fontSize: 10, italics: true, alignment: 'center', color: '#888' },
      answer: { fontSize: 13, color: '#0a0a0a' },
    },
    defaultStyle: {
      fontSize: 12,
    },
    pageMargins: [40, 60, 40, 60],
    // eslint-disable-next-line no-unused-vars
    footer(currentPage, pageCount) {
      return {
        columns: [
          { fontSize: 15, text: `"${quote}"`, style: 'footerQuote', width: '100%' },
        ],
        margin: [40, 0, 40, 20],
      };
    },
  };

  pdfMake.createPdf(docDefinition).open();
}

// eslint-disable-next-line react/prop-types
const ExamPage = ({ questions, setQuestions }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Access forbidden. Please log in.');
      navigate('/');
    }
  }, [navigate]);

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setIsModalVisible(true);
  };

  const handleDelete = (questionId) => {
    // eslint-disable-next-line react/prop-types
    setQuestions(questions.filter((q) => q.questionId !== questionId));
  };

  const handleSave = (values) => {
    const updatedOptions = values.options.map((text, index) => ({
      id: String.fromCharCode(65 + index), // Generate option IDs (A, B, C, D)
      text,
    }));

    // eslint-disable-next-line max-len
    setQuestions((prevQuestions) => prevQuestions.map((q) => (q.questionId === editingQuestion.questionId
      ? { ...q, ...values, options: updatedOptions }
      : q)));
    setIsModalVisible(false);
    setEditingQuestion(null);
  };

  // Tag color by difficulty
  const getDifficultyColor = (difficulty) => {
    switch ((difficulty || '').toLowerCase()) {
      case 'easy': return 'green';
      case 'medium': return 'gold';
      case 'hard': return 'red';
      case 'dark_souls': return 'black';
      default: return 'blue';
    }
  };

  return (
    <div
      style={{
        padding: '32px 0',
        maxWidth: '900px',
        margin: '0 auto',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdfa 0%, #e0e7ff 100%)',
      }}
    >
      <Card
        style={{
          borderRadius: 18,
          boxShadow: '0 8px 32px rgba(30,41,59,0.10)',
          background: 'rgba(255,255,255,0.97)',
          padding: 24,
          marginBottom: 32,
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24, color: '#1e293b' }}>
          Exam Questions
        </Title>
        <List
          grid={{ gutter: 20, column: 1 }}
          dataSource={questions}
          renderItem={(item, idx) => (
            <List.Item>
              <Card
                size="small"
                style={{
                  borderRadius: 12,
                  boxShadow: '0 2px 12px rgba(22,119,255,0.08)',
                  marginBottom: 0,
                  background: 'linear-gradient(120deg, #f0fdfa 80%, #e0e7ff 100%)',
                  border: 'none',
                  padding: 0,
                }}
                bodyStyle={{ padding: '16px 20px' }}
                title={(
                  <Space direction="horizontal" size="middle">
                    <Text strong style={{ fontSize: 15, color: '#1e293b' }}>
                      {idx + 1}. {item.questionText}
                    </Text>
                    <Tag color="blue">{item.topic}</Tag>
                    <Tag color={getDifficultyColor(item.difficulty)}>{item.difficulty}</Tag>
                    <Tag color="purple">Points: {item.points}</Tag>
                  </Space>
                )}
                extra={(
                  <Space>
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(item)}
                      style={{ color: '#1677ff' }}
                    />
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => handleDelete(item.questionId)}
                    />
                  </Space>
                )}
              >
                <div style={{ marginBottom: 8 }}>
                  <Text strong style={{ color: '#64748b' }}>Options:</Text>
                  <ul style={{ paddingLeft: 18, margin: 0 }}>
                    {item.options.map((option) => (
                      <li key={option.id} style={{ marginBottom: 2, listStyle: 'disc' }}>
                        <Text>
                          <span style={{
                            fontWeight: option.id === item.correctAnswerId ? 700 : 500,
                            color: option.id === item.correctAnswerId ? '#22c55e' : '#334155',
                          }}>
                            {option.id}.
                          </span>{' '}
                          {option.text}
                          {option.id === item.correctAnswerId && (
                            <Tag color="success" style={{ marginLeft: 8, fontSize: 11 }}>Correct</Tag>
                          )}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </List.Item>
          )}
        />
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          style={{
            marginTop: 28,
            width: '100%',
            borderRadius: 10,
            fontWeight: 500,
            fontSize: 16,
            background: '#f0fdfa',
            borderColor: '#bae6fd',
          }}
          onClick={() => setIsAddModalVisible(true)}
        >
          Add New Question
        </Button>
      </Card>
      {/* Edit Modal */}
      <Modal
        title="Edit Question"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        {editingQuestion && (
          <Form
            initialValues={{
              ...editingQuestion,
              options: editingQuestion.options.map((opt) => opt.text),
            }}
            onFinish={handleSave}
            layout="vertical"
          >
            <Form.Item
              label="Question Text"
              name="questionText"
              rules={[{ required: true, message: 'Please input the question text!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Topic"
              name="topic"
              rules={[{ required: true, message: 'Please input the topic!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Difficulty"
              name="difficulty"
              rules={[{ required: true, message: 'Please input the difficulty!' }]}
            >
              <Radio.Group>
                <Radio value="Easy">Easy</Radio>
                <Radio value="Medium">Medium</Radio>
                <Radio value="Hard">Hard</Radio>
                <Radio value="Dark_Souls">Dark_Souls</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Points"
              name="points"
              rules={[{ required: true, message: 'Please input the points!' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Options" name="options">
              <Input.Group>
                {editingQuestion.options.map((option, index) => (
                  <Form.Item
                    key={option.id}
                    name={['options', index]}
                    rules={[{ required: true, message: `Option ${option.id} is required!` }]}
                  >
                    <Input placeholder={`Option ${option.id}`} />
                  </Form.Item>
                ))}
              </Input.Group>
            </Form.Item>
            <Form.Item
              label="Correct Answer"
              name="correctAnswerId"
              rules={[{ required: true, message: 'Please select the correct answer!' }]}
            >
              <Radio.Group>
                {editingQuestion.options.map((option) => (
                  <Radio key={option.id} value={option.id}>
                    {option.id}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save
            </Button>
          </Form>
        )}
      </Modal>
      {/* Add Modal */}
      <Modal
        title="Add New Question"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          initialValues={{
            options: ['', '', '', ''],
            difficulty: 'Easy',
            points: 1,
          }}
          onFinish={(values) => {
            const newQuestion = {
              questionId: `${values.topic?.slice(0, 3).toUpperCase() || 'NEW'}${Math.floor(Math.random() * 1000)}`,
              ...values,
              options: values.options.map((text, index) => ({
                id: String.fromCharCode(65 + index),
                text,
              })),
            };
            setQuestions([...questions, newQuestion]);
            setIsAddModalVisible(false);
          }}
          layout="vertical"
        >
          <Form.Item
            label="Question Text"
            name="questionText"
            rules={[{ required: true, message: 'Please input the question text!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Topic"
            name="topic"
            rules={[{ required: true, message: 'Please input the topic!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Difficulty"
            name="difficulty"
            rules={[{ required: true, message: 'Please input the difficulty!' }]}
          >
            <Radio.Group>
              <Radio value="Easy">Easy</Radio>
              <Radio value="Medium">Medium</Radio>
              <Radio value="Hard">Hard</Radio>
              <Radio value="Dark_Souls">Dark Souls</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Points"
            name="points"
            rules={[{ required: true, message: 'Please input the points!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Options" name="options">
            <Input.Group>
              {[0, 1, 2, 3].map((index) => (
                <Form.Item
                  key={index}
                  name={['options', index]}
                  rules={[{ required: true, message: `Option ${String.fromCharCode(65 + index)} is required!` }]}
                >
                  <Input placeholder={`Option ${String.fromCharCode(65 + index)}`} />
                </Form.Item>
              ))}
            </Input.Group>
          </Form.Item>
          <Form.Item
            label="Correct Answer"
            name="correctAnswerId"
            rules={[{ required: true, message: 'Please select the correct answer!' }]}
          >
            <Radio.Group>
              {['A', 'B', 'C', 'D'].map((id) => (
                <Radio key={id} value={id}>
                  {id}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Question
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
function FloatingPrintButton({ questions }) {
  return (
    <Button
      type="primary"
      shape="circle"
      icon={<PrinterOutlined style={{ fontSize: 32 }} />}
      size="large"
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 1000,
        width: 64,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(22,119,255,0.18)',
        background: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)',
        border: 'none',
      }}
      onClick={() => generateExamPdf(questions)}
      title="Print Exam"
    />
  );
}

// Wrap ExamPage with the floating button
const ExamPageWithPrint = () => {
  const [questions, setQuestions] = useState(initialQuestions);

  return (
    <>
      <ExamPage questions={questions} setQuestions={setQuestions} />
      <FloatingPrintButton questions={questions} />
    </>
  );
};

export default ExamPageWithPrint;
