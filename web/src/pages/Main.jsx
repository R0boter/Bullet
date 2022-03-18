import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import logo from '../assets/img/logo.png';

const { Header, Content, Footer, Sider } = Layout;

export default function Main() {
  const [menuKey, setMenuKey] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.__web_token) {
      navigate('/login');
    }
    setMenuKey(pathname);
  }, [pathname]);
  const Logout = () => {
    localStorage.removeItem('__web_token');
    navigate('/login');
  };
  return (
    <Layout>
      <Sider style={{ height: '100vh' }} breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            height: '32px',
            margin: '16px',
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        ></div>
        <Menu theme="dark" mode="inline" selectedKeys={[menuKey]}>
          <Menu.Item key="/admin">
            <Link to="/admin">主页</Link>
          </Menu.Item>
          <Menu.Item key="/admin/user">
            <Link to="user">用户中心</Link>
          </Menu.Item>
          <Menu.Item
            key="logout"
            style={{ marginLeft: 'auto', color: '#ffffff' }}
          >
            <p onClick={Logout}>退出登录</p>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ padding: '10px 30px', background: '#fff' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
