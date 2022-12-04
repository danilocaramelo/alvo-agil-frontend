import { notification } from 'antd';
import api from '../config/httRequest';

export type AplicationElement = {
  label: string;
  children?: AplicationElement[];
  score?: number;
  peso?: number;
};

export type Aplication = {
  cdAplicacao: string;
  label: string;
  dtAplicacao?: string;
  children: AplicationElement[];
};

export type NewAplication = {
  label: string;
  dtAplicacao?: string;
  children: AplicationElement[];
};

export async function getAplicationsList(): Promise<Aplication[] | undefined> {
  try {
    const response = await api.get('/agil/aplicacao/todos');
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}

export async function getAplication(id: string): Promise<Aplication | undefined> {
  try {
    const response = await api.get(`/agil/aplicacao/${id}`);
    if (response.data) {
      return response.data;
    } else {
      return undefined;
    }
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}

export async function createAplication(aplication: NewAplication) {
  try {
    await api.post('/agil/aplicacao/add', aplication);
    notification.success({ message: 'sucesso ao criar a aplicação :)' });
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}
