/* eslint-disable linebreak-style */
import { Menu } from 'antd';
import {
  AppstoreAddOutlined, BookOutlined,
  SafetyOutlined, VideoCameraAddOutlined,
} from '@ant-design/icons';
import './App.css';
import AppRouter from './AppRouter';

const items = [
  {
    label: 'Gradence Logo',
    key: 'logo',
    icon: <SafetyOutlined />,
  },
  {
    label: (<a href="\exam">Helllo</a>),
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
      <AppRouter />
    </>
  );
}

export default App;
