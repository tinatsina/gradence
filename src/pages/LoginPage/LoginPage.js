import React from 'react';
import {
  Button, Checkbox, Form, Input, Typography, Card,
} from 'antd';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import styles from './LoginPage.module.css';

const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const body = {
        username: values.username,
        password: values.password,
      };

      const response = await fetch(
        'https://gradence-trial-deploy.onrender.com/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      // Store both the authentication key and user id in localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userId', data.userId);
      navigate('/home');
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        style={{
          maxWidth: 400,
          width: '100%',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          borderRadius: 16,
          padding: 32,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 0, color: '#1e293b' }}>
            Welcome Back
          </Title>
          <Text type="secondary">Sign in to your account</Text>
        </div>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input size="large" placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password size="large" placeholder="Enter your password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: 8 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block size="large" style={{ borderRadius: 8 }}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Text type="secondary">
            Don&apos;t have an account?
            {' '}
            <a href="/signup" style={{ color: '#1677ff' }}>
              Register
            </a>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
