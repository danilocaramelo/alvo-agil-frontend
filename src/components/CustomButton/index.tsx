import './style.scss';
import { Button } from 'antd';

type CustomButtonProps = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick: () => void;
  label?: string;
};

export function CustomButton({ onClick, label }: CustomButtonProps) {
  return (
    <Button
      className='customize-button'
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
