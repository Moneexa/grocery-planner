import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { OdaMenu } from '../../shared-component/Menu';
import { Layout, theme } from 'antd';

const { Content, Sider } = Layout;
export function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <OdaMenu />
      </Sider>
      <Layout>
        <Content style={{ margin: '16px' }}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
