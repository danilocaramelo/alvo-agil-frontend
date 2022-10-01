import { Button, Card, Form, Input, Select } from 'antd';

export function FunctionForm() {
  return (
    <Card>
      <Form onFinish={(values) => console.log(values)}>
        <Form.Item label='Nome da função' name='name'>
          <Input />
        </Form.Item>
        <Form.Item label='Status' name='status'>
          <Select>
            <Select.Option value={true}>Ativo</Select.Option>
            <Select.Option value={false}>Inativo</Select.Option>
          </Select>
        </Form.Item>
        <Button htmlType='submit' type='primary'>
          Enviar
        </Button>
      </Form>
    </Card>
  );
}
