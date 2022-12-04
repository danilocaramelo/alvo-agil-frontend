import { notification } from 'antd';
import api from '../config/httRequest';

export type Ceremony = {
  cdCerimonia: number;
  nmCerimonia: string;
  flCerimonia: 'S' | 'N';
};

export type NewCeremony = {
  nmCerimonia: string;
  flCerimonia: 'S' | 'N';
};

export async function getCeremonies(): Promise<Ceremony[] | undefined> {
  try {
    const response = await api.get('/cerimonia/todos');
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

export async function createCeremony(newCeremony: NewCeremony) {
  try {
    await api.post('/cerimonia/add', newCeremony);
    notification.success({ message: 'sucesso ao criar a Cerimônia :)' });
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}

export async function deleteCeremony(ceremonyId: number) {
  try {
    await api.delete(`/cerimonia/deleta/${ceremonyId}`);
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}

export async function updateCeremony(ceremony: Ceremony) {
  try {
    await api.put('/cerimonia/atualiza/', ceremony);
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}
