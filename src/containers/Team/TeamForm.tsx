import { Button, Card, DatePicker, Form, Input, Select } from 'antd';

export function TeamForm() {
  return (
    <Card>
      <Form onFinish={(values) => console.log(values)}>
        <Form.Item label="Nome do Squad" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select>
            <Select.Option value={true}>Ativo</Select.Option>
            <Select.Option value={false}>Inativo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Data de início" name="startDate">
          <DatePicker format="DD/MM/YYYY"/>
        </Form.Item>
        <Form.Item label="Framework" name="framework">
          <Select>
            <Select.Option value="framework-1">Framework 1</Select.Option>
            <Select.Option value="framework-2">Framework 2</Select.Option>
          </Select>
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Enviar
        </Button>
      </Form>
    </Card>
  );
}
