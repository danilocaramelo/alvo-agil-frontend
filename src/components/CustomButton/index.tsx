/* eslint-disable @typescript-eslint/no-explicit-any */
import './style.scss';
import { Button } from 'antd';

type CustomButtonProps = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: () => void;
  label?: string;
  icon?: any;
  style?: React.CSSProperties;
};

export function CustomButton({ onClick, label, icon, style }: CustomButtonProps) {
  return (
    <Button className='customize-button' onClick={onClick} icon={icon} style={style}>
      {label}
    </Button>
  );
}
