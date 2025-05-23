import React, { useState } from 'react';
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
    label: 'Question Panel',
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
  // Set initial state to 'exam_center' so Exam Center is selected by default
  const [current, setCurrent] = useState('exam_center');

  const onClick = (e) => {
    setCurrent(e.key);
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
      <>{renderDiv()}</>
    </>
  );
};
export default NavBar;
