/* eslint-disable object-curly-newline */
/* eslint no-use-before-define: 0 */ // --> OFF

import React, { useState } from 'react';
import {
  Form, Input, Button, Typography, Card,
} from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Prepare payload
      const payload = {
        username: values.username,
        password: values.password,
        email: values.email,
        name: values.name,
      };

      // Send POST request to signup endpoint
      const response = await fetch('https://gradence-trial-deploy.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      // On success, show alert and redirect to /login
      navigate('/');
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0abfc 0%, #a5b4fc 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 1.2s',
      }}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .signup-card {
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
            border-radius: 20px;
            background: rgba(255,255,255,0.85);
            backdrop-filter: blur(6px);
            border: 1px solid #e0e7ff;
            transition: box-shadow 0.3s;
          }
          .signup-card:hover {
            box-shadow: 0 12px 40px 0 rgba(139, 92, 246, 0.18);
          }
          .ant-input, .ant-input-password {
            background: #f3f4f6 !important;
            border-radius: 8px !important;
          }
          .ant-btn-primary {
            background: linear-gradient(90deg, #6366f1 0%, #f472b6 100%);
            border: none;
            font-weight: bold;
            letter-spacing: 1px;
            transition: background 0.3s;
          }
          .ant-btn-primary:hover {
            background: linear-gradient(90deg, #f472b6 0%, #6366f1 100%);
          }
        `}
      </style>
      <Card className="signup-card" style={{ maxWidth: 420, width: '100%', padding: 36 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ color: '#7c3aed', marginBottom: 0, fontWeight: 800, letterSpacing: 1 }}>
            Create Account
          </Title>
          <Text type="secondary" style={{ fontSize: 16 }}>
            Join Gradence and start your journey!
          </Text>
        </div>
        <Form
          name="signup"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          style={{ animation: 'fadeIn 1.2s' }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size="large" placeholder="Choose a username" />
          </Form.Item>

          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input size="large" placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input size="large" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size="large" placeholder="Create a password" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              style={{ borderRadius: 10, marginTop: 8 }}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <Text type="secondary">
            Already have an account?
            {' '}
            <a href="/" style={{ color: '#6366f1', fontWeight: 600 }}>
              Sign In
            </a>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
