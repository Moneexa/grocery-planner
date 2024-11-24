import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { OdaMenu } from '../../shared/Menu';
import { Layout } from 'antd';
import { AuthContext } from '../../store/AuthProvider';
const { Content, Sider } = Layout;
export function Dashboard() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <OdaMenu />
      </Sider>
      <Content style={{ margin: '16px', overflow: 'auto' }}>
        <Outlet />
      </Content>
    </Layout>
  );
}
