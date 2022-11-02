/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, FormInstance, Modal, ModalProps, Row } from 'antd';
import { ReactElement } from 'react';
import './style.scss';

type CustomModalProps = {
  okButtonText: string;
  cancelButtonText?: string;
  props?: ModalProps;
  children: ReactElement;
  closeModal: () => void;
  onFinish: (arg: any) => void;
  visible: boolean;
  form: FormInstance;
  onFormValuesChange?: ((changedValues: any, values: any) => void) | undefined;
};

export function CustomModal({
  okButtonText,
  cancelButtonText,
  props,
  children,
  closeModal,
  visible,
  form,
  onFinish,
  onFormValuesChange,
}: CustomModalProps) {
  return (
    <Modal
      footer={null}
      closable={false}
      onCancel={closeModal}
      visible={visible}
      {...props}
      centered
      className='custom-modal'
    >
      <Form form={form} onFinish={onFinish} onValuesChange={onFormValuesChange}>
        {children}
        <Row justify='center'>
          <Button onClick={closeModal} className='cancel-button'>
            {cancelButtonText ? cancelButtonText : 'Cancelar'}
          </Button>
          <Button htmlType='submit' type='primary' className='ok-button'>
            {okButtonText}
          </Button>
        </Row>
      </Form>
    </Modal>
  );
}
