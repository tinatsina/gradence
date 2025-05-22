import React, { useState } from 'react';
import {
  List, Card, Button, Input, Modal, Form, Radio, Typography,
} from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import pdfMake from 'pdfmake/build/pdfmake';

// eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars
import pdfFonts from 'pdfmake/build/vfs_fonts';

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

function generateExamPdf(questions) {
  const content = [
    { text: 'Exam Questions', style: 'header', margin: [0, 0, 0, 20] },
    ...questions.map((q, idx) => ({
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
  ];

  const docDefinition = {
    content,
    styles: {
      header: { fontSize: 22, bold: true, alignment: 'center' },
      question: { fontSize: 14, bold: true, margin: [0, 8, 0, 4] },
      points: { fontSize: 12, italics: true, color: '#888' },
    },
    defaultStyle: {
      fontSize: 12,
    },
    pageMargins: [40, 60, 40, 60],
  };

  pdfMake.createPdf(docDefinition).open();
}

// eslint-disable-next-line react/prop-types
const ExamPage = ({ questions, setQuestions }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

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

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Exam Questions
      </Title>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={questions}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={(
                <Text strong style={{ fontSize: '16px' }}>
                  {item.questionText}
                </Text>
              )}
              extra={(
                <>
                  <Button type="link" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button type="link" danger onClick={() => handleDelete(item.questionId)}>
                    Delete
                  </Button>
                </>
              )}
              style={{
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <p>
                <Text strong>Topic:</Text>
                {' '}
                {item.topic}
              </p>
              <p>
                <Text strong>Difficulty:</Text>
                {' '}
                {item.difficulty}
              </p>
              <p>
                <Text strong>Options:</Text>
              </p>
              <ul style={{ paddingLeft: '20px' }}>
                {item.options.map((option) => (
                  <li key={option.id} style={{ marginBottom: '5px' }}>
                    <Text>
                      <Text strong>
                        {option.id}
                        :
                      </Text>
                      {option.text}
                    </Text>
                  </li>
                ))}
              </ul>
              <p>
                <Text strong>Correct Answer:</Text>
                {' '}
                {item.correctAnswerId}
              </p>
              <p>
                <Text strong>Points:</Text>
                {item.points}
              </p>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title="Edit Question"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
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
              <Input />
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

      {/* Add Question Section */}
      <Button
        type="dashed"
        style={{ marginTop: 32, width: '100%' }}
        onClick={() => setIsAddModalVisible(true)}
      >
        + Add New Question
      </Button>
      <Modal
        title="Add New Question"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
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
            <Input />
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
      icon={<PrinterOutlined style={{ fontSize: 40 }} />}
      size="large"
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 1000,
        width: 72,
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
