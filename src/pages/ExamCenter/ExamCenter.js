/* eslint-disable */

import React from 'react';
import {
  Card, Typography, Row, Col, Tag,
} from 'antd';
import {
  BookOutlined, PrinterOutlined, UserOutlined, CloudDownloadOutlined,
} from '@ant-design/icons';
import './ExamCenter.module.css';

const { Title, Paragraph, Text } = Typography;

const features = [
  {
    icon: <BookOutlined style={{ fontSize: 36, color: '#6366f1' }} />,
    title: 'Dynamic Exam Bank',
    description: 'Access a growing collection of exam questions, always up-to-date from the cloud.',
    color: 'geekblue',
  },
  {
    icon: <PrinterOutlined style={{ fontSize: 36, color: '#38bdf8' }} />,
    title: 'One-Click PDF Exams',
    description: 'Generate beautifully formatted, randomized exam PDFs with answer sheets in seconds.',
    color: 'cyan',
  },
  {
    icon: <UserOutlined style={{ fontSize: 36, color: '#22c55e' }} />,
    title: 'Personal Dashboard',
    description: 'Secure login and personalized experience for every educator and student.',
    color: 'green',
  },
  {
    icon: <CloudDownloadOutlined style={{ fontSize: 36, color: '#f59e42' }} />,
    title: 'Cloud Powered',
    description: 'All your data is safely stored and instantly accessible from anywhere.',
    color: 'orange',
  },
];

const ExamCenter = () => (
  <div
    style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 0',
    }}
  >
    <Card
      style={{
        maxWidth: 900,
        width: '100%',
        borderRadius: 24,
        boxShadow: '0 8px 32px rgba(30,41,59,0.10)',
        background: 'rgba(255,255,255,0.97)',
        padding: 40,
      }}
      bodyStyle={{ padding: 0 }}
    >
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <Title
          level={1}
          style={{
            color: '#1e293b', marginBottom: 0, fontWeight: 800, letterSpacing: 1,
          }}
        >
          Welcome to
          {' '}
          <span style={{ color: '#6366f1' }}>Gradence</span>
        </Title>
        <Paragraph style={{ fontSize: 18, color: '#64748b', marginTop: 8 }}>
          <Tag color="blue" style={{ fontSize: 16, borderRadius: 8, padding: '2px 16px' }}>
            The Ultimate Exam Management Platform
          </Tag>
        </Paragraph>
        <Paragraph style={{
          fontSize: 17, color: '#334155', marginTop: 12, maxWidth: 700, margin: '0 auto',
        }}
        >
          <b>Gradence</b>
          {' '}
          
          empowers educators and students with a seamless, modern platform for managing, generating,
           and printing exams.
          Enjoy a secure, cloud-based experience with instant access to a 
          dynamic question bank, easy editing, and beautiful PDF exports.
        </Paragraph>
      </div>
      <Row gutter={[32, 32]} justify="center">
        {features.map((feature) => (
          <Col xs={24} sm={12} md={12} lg={6} key={feature.title}>
            <Card
              bordered={false}
              style={{
                borderRadius: 18,
                background: 'linear-gradient(120deg, #f0fdfa 80%, #e0e7ff 100%)',
                minHeight: 220,
                textAlign: 'center',
                boxShadow: '0 2px 12px rgba(22,119,255,0.08)',
              }}
            >
              <div style={{ marginBottom: 16 }}>{feature.icon}</div>
              <Title level={4} style={{ color: '#1e293b', marginBottom: 8 }}>{feature.title}</Title>
              <Text style={{ color: '#64748b', fontSize: 15 }}>{feature.description}</Text>
            </Card>
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <Text type="secondary" style={{ fontSize: 16 }}>
          Ready to get started?
          {' '}
          <a href="/login" style={{ color: '#6366f1', fontWeight: 600 }}>Sign in</a>
          {' '}
          or
          {' '}
          <a href="/signup" style={{ color: '#38bdf8', fontWeight: 600 }}>Register</a>
          {' '}
          now!
        </Text>
      </div>
    </Card>
  </div>
);

export default ExamCenter;
