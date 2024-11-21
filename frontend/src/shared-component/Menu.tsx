import {
  CalendarOutlined,
  ShoppingCartOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { GetProp, MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';

type MenuItem = GetProp<MenuProps, 'items'>[number];

const items: MenuItem[] = [
  {
    key: '1',
    icon: <CalendarOutlined />,
    label: <Link to="/app/meal-schedule">Meal Schedule</Link>,
  },
  {
    key: '2',
    icon: <ShoppingCartOutlined />,
    label: <Link to="/app/groceries">Groceries</Link>,
  },
  {
    key: '3',
    icon: <ContainerOutlined />,
    label: <Link to="/app/pantry">Pantry</Link>,
  },
];

export function OdaMenu() {
  const location = useLocation();
  const selectedKey = location.pathname.split('/').pop() || 'meal-schedule';

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[selectedKey]}
      items={items}
      mode="inline"
    />
  );
}
