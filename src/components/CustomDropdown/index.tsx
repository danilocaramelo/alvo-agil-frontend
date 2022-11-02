import { Button, Dropdown, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './style.scss';

type MenuItem = {
  label: string;
  onClick: () => void;
};

type CustomDropdownProps = {
  menuItems: MenuItem[];
};

export function CustomDropdown({ menuItems }: CustomDropdownProps) {
  const menu = (
    <Menu>
      {menuItems.map((menuItem: MenuItem) => (
        <Menu.Item key={menuItem.label} onClick={menuItem.onClick}>
          {menuItem.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} className='custom-dropdown'>
      <Button icon={<PlusOutlined />} size='large' />
    </Dropdown>
  );
}
