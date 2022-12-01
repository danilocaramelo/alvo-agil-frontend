import { notification } from 'antd';
import api from '../config/httRequest';

export type Technology = {
  cdTecnologia: number;
  nmTecnologia: string;
  flTecnologia: 'S' | 'N';
};

export type NewTechnology = {
  nmTecnologia: string;
  flTecnologia: 'S' | 'N';
};

export async function getTechnologies(): Promise<Technology[] | undefined> {
  try {
    const response = await api.get('/tecnologia/todos');
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

export async function createTechnology(newTechnology: NewTechnology) {
  try {
    await api.post('/tecnologia/add', newTechnology);
    notification.success({ message: 'sucesso ao criar a Tecnologia :)' });
  } catch (e) {
    console.log(e);
  }
}

export async function deleteTechnology(technologyId: number) {
  try {
    await api.delete(`/tecnologia/deleta/${technologyId}`);
    notification.success({ message: 'sucesso ao deletar a Tecnologia :)' });
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}

export async function updateTechnology(technology: Technology) {
  try {
    await api.put('/tecnologia/atualiza/', technology);
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}
