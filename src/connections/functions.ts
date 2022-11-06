import { notification } from 'antd';
import api from '../config/httRequest';

export type FunctionElement = {
  cdFuncao: 0;
  nmFuncao: 'string';
  flFuncao: 'S' | 'N';
};

export type NewFunction = {
  nmFuncao: 'string';
  flFuncao: 'S' | 'N';
};

export async function getFunctions(): Promise<FunctionElement[] | undefined> {
  try {
    const response = await api.get('/funcao/todos');
    return response.data;
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}

export async function createFunction(newFunction: NewFunction) {
  try {
    await api.post('/funcao/add', newFunction);
    notification.success({ message: 'sucesso ao criar o FunctionElement :)' });
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}

export async function deleteFunction(FunctionId: number) {
  try {
    await api.delete(`/funcao/deleta/${FunctionId}`);
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}

export async function updateFunction(FunctionElement: FunctionElement) {
  try {
    await api.put('/funcao/atualiza/', FunctionElement);
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}
