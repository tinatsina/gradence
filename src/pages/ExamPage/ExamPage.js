import React, { useState } from 'react';
import {
  List, Card, Button, Input, Modal, Form, Radio, Typography,
} from 'antd';

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

const ExamPage = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setIsModalVisible(true);
  };

  const handleDelete = (questionId) => {
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
    </div>
  );
};

export default ExamPage;
