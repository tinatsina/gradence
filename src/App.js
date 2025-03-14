/* eslint-disable linebreak-style */
import { Menu } from 'antd';
import {
  AppstoreAddOutlined, BookOutlined,
  SafetyOutlined, VideoCameraAddOutlined,
} from '@ant-design/icons';
import './App.css';
import ExamCard from './components/examcard/ExamCard';

const items = [
  {
    label: 'Gradence Logo',
    key: 'logo',
    icon: <SafetyOutlined />,
  },
  {
    label: 'Exam Central',
    key: 'mail',
    icon: <AppstoreAddOutlined />,
  },
  {
    label: 'Question Design',
    key: 'app',
    icon: <BookOutlined />,
  },
  {
    label: 'Studio',
    key: 'SubMenu',
    icon: <VideoCameraAddOutlined />,
  },
];

function App() {
  return (
    <>
      <Menu mode="horizontal" items={items} className="navbar" />
      <ExamCard examName="Linear Algebra" creationDate="12-03-1996" />
    </>
  );
}

export default App;
