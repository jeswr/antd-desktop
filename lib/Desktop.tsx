/**
 * Specific template layout that has menu buttons at the top and bottom
 * and a resizable sidebar
 */

import { Menu, Switch } from 'antd';
import Layout, { Header, Content, Footer } from 'antd/lib/layout/layout';
import { AntdResizeableSidebar } from 'antd-resizeable-sider';
import { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import Cookie from 'js-cookie';
import { DesktopLayoutProps } from './types/props';
import 'antd/dist/antd.css';
import '../static/Desktop.css';

// TODO: Test and package
export default function DesktopLayoutConstructor({
  menuTop,
  menuBottom,
  sider,
  children,
}: DesktopLayoutProps) {
  // Maintain theme across browser sessions
  // TODO: Fix - seems buggy in firefox but may be due to clearing cookies
  let thm = Cookie.get('theme');
  if (thm !== 'light' && thm !== 'dark') {
    thm = 'dark';
    Cookie.set('theme', 'dark', { sameSite: 'strict' });
  }

  let collapsedCookie = Cookie.get('sidebar-collapsed');

  if (collapsedCookie !== 'true' && collapsedCookie !== 'false') {
    collapsedCookie = 'true';
    Cookie.set('sidebar-collapsed', 'true', { sameSite: 'strict' });
  }

  const [collapsed, setCollapsed] = useState<boolean>(collapsedCookie === 'true');
  // TODO: Make use reducer
  const [theme, setTheme] = useState<'light' | 'dark'>(thm as 'light' | 'dark');
  // Note https://github.com/ant-design/ant-design/issues/26136
  return (
    <Layout className="site-layout">
      <Header className="site-header">
        <Menu className="site-menu-top" key="menu-type" theme={theme} mode="horizontal" selectedKeys={[]}>
          {sider && (
            <Menu.Item
              key="toggle-menu"
              icon={<MenuOutlined />}
              onClick={() => {
                setCollapsed(!collapsed);
                Cookie.set('sidebar-collapsed', String(!collapsed), { sameSite: 'strict' });
              }}
            >
              Menu
            </Menu.Item>
          )}

          {menuTop}

          <Menu.Item
            style={{ float: 'right' }}
            key="toggle-theme"
            icon={<Switch checked={theme === 'dark'} />}
            onClick={() => {
              const switchedTheme = theme === 'light' ? 'dark' : 'light';
              setTheme(switchedTheme);
              Cookie.set('theme', switchedTheme, { sameSite: 'strict' });
            }}
          >
            Dark Mode
          </Menu.Item>
        </Menu>
      </Header>

      <Content>
        <Layout className="site-content-layout">
          {sider && (
            <AntdResizeableSidebar
              className="site-sidebar"
              theme={theme}
              collapsed={collapsed}
              collapsedWidth={0}
              children={sider}
            />
          )}
          <Content
            className="site-content"
            children={children}
          />
        </Layout>
      </Content>

      {menuBottom && (
        <Footer className="site-footer">
          <Menu
            theme={theme}
            className="site-menu-bottom"
            mode="horizontal"
            key="menu-bottom"
            // So that keys do not remain selected once they are pressed on
            selectedKeys={[]}
          >
            {menuBottom}
          </Menu>
        </Footer>
      )}
    </Layout>
  );
}
