import { Button, Card, DatePicker, Form, Input, Select } from 'antd';

export function ParticipantForm() {
  return (
    <Card>
      <Form onFinish={(values) => console.log(values)}>
        <Form.Item label="Nome do Participante" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select>
            <Select.Option value={true}>Ativo</Select.Option>
            <Select.Option value={false}>Inativo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Data de início" name="startDate">
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item label="Data de fim" name="endDate">
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Time" name="team">
          <Input />
        </Form.Item>
        <Form.Item label="Função" name="role">
          <Input />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Enviar
        </Button>
      </Form>
    </Card>
  );
}
