import {
  CalendarOutlined,
  ContainerOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { GetProp, MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';

type MenuItem = GetProp<MenuProps, 'items'>[number];

const items: MenuItem[] = [
  {
    key: '',
    icon: <HomeOutlined />,
    label: <Link to="/app/">Home</Link>,
  },

  {
    key: 'meal-schedule',
    icon: <CalendarOutlined />,
    label: <Link to="/app/meal-schedule">Meal Schedule</Link>,
  },

  {
    key: 'pantry',
    icon: <ContainerOutlined />,
    label: <Link to="/app/pantry">Pantry</Link>,
  },
];

export function OdaMenu() {
  const location = useLocation();
  const selectedKey = location.pathname.split('/')[2];

  return (
    <Menu
      theme="dark"
      selectedKeys={[selectedKey]}
      defaultSelectedKeys={[selectedKey]}
      items={items}
      mode="inline"
    />
  );
}
