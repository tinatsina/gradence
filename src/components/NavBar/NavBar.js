import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import ExamCenter from '../../pages/ExamCenter/ExamCenter';
import ControlPanel from '../../pages/ControlPanel/ControlPanel';
import HomePage from '../../pages/home/HomePage';

const items = [
  {
    label: 'Exam Center',
    key: 'exam_center',
    icon: <MailOutlined />,
  },
  {
    label: 'User Panel',
    key: 'question_panel',
    icon: <AppstoreOutlined />,
  },
  {
    key: 'nerd_stats',
    label: 'Stats for Nerds',
    icon: <SettingOutlined />,
  },
];

const NavBar = () => {
  const [current, setCurrent] = useState('exam_center');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      navigate('/');
    }
  }, [navigate]);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const renderDiv = () => {
    let solution = (<></>);
    switch (current) {
      case 'exam_center':
        solution = <HomePage />;
        break;
      case 'question_panel':
        solution = <ExamCenter />;
        break;
      case 'nerd_stats':
        solution = <ControlPanel />;
        break;
      default:
    }
    return (solution);
  };
  return (
    <>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      {/* Floating Logout Button */}
      <button
        type="button"
        onClick={handleLogout}
        style={{
          position: 'fixed',
          top: 24,
          right: 32,
          zIndex: 1000,
          background: '#1677ff',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        Logout
      </button>
      <>{renderDiv()}</>
    </>
  );
};
export default NavBar;
