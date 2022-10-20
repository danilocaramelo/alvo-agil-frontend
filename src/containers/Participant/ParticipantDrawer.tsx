import { Drawer } from 'antd';

type ParticipantDrawerProps = {
  showDrawer: boolean;
  closeDrawer: () => void;
};

export function ParticipantDrawer({ showDrawer, closeDrawer }: ParticipantDrawerProps) {
  return (
    <Drawer title='Basic Drawer' placement='right' visible={showDrawer} onClose={closeDrawer}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
}
