import { notification } from 'antd';
import api from '../config/httRequest';

export type AplicationElement = {
  label: string;
  children?: AplicationElement[];
  score?: number;
  peso?: number;
  nota?: number;
};

export type Aplication = {
  cdAplicacao: number;
  label: string;
  dtAvaliacao?: string;
  cdAvaliacao?: number;
  cdTime?: number;
  notaTotal?: number;
  children: AplicationElement[];
};

export type NewAplication = {
  label: string;
  dtAvaliacao?: string | null;
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

export async function createAvaliation(aplication: Aplication) {
  try {
    await api.post('/agil/avaliacao/add', aplication);
    notification.success({ message: 'sucesso ao criar a avaliacao :)' });
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}

export async function getAvaliationListByTeam(teamId: number): Promise<Aplication[] | undefined> {
  try {
    const response = await api.get(`/agil/avaliacao/time/${teamId}`);
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
