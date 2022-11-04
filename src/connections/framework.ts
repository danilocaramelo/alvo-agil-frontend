import { notification } from 'antd';
import api from '../config/httRequest';

export type Framework = {
  cdFramework: number;
  nmFramework: string;
  flFramework: 'S' | 'N';
};

export type NewFramework = {
  nmFramework: string;
  flFramework: 'S' | 'N';
};

export async function getFrameworks(): Promise<Framework[] | undefined> {
  try {
    const response = await api.get('/framework/todos');
    return response.data;
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}

export async function createFramework(newFramework: NewFramework) {
  try {
    await api.post('/framework/add', newFramework);
    notification.success({ message: 'sucesso ao criar o framework :)' });
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}

export async function deleteFramework(frameworkId: number) {
  try {
    await api.delete(`/framework/deleta/${frameworkId}`);
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}

export async function updateFramework(framework: Framework) {
  try {
    await api.put('/framework/atualiza/', framework);
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}
