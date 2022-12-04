/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './style.scss';
import { Button, ButtonProps } from 'antd';

type CustomButtonProps = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: () => void;
  label?: string;
  icon?: any;
  color?: 'blue' | 'orange';
  style?: React.CSSProperties;
  props?: ButtonProps;
};

export function CustomButton({
  onClick,
  props,
  label,
  icon,
  style,
  color = 'blue',
}: CustomButtonProps) {
  return (
    <Button
      className={color === 'blue' ? 'customize-button-blue' : 'customize-button-orange'}
      onClick={onClick}
      icon={icon}
      style={style}
      {...props}
    >
      {label}
    </Button>
  );
}
