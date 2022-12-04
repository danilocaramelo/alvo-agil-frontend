import { notification } from 'antd';
import api from '../config/httRequest';

export type ParticipantFunction = {
  cdFuncao: number;
  nmFuncao: string;
  flFuncao: string;
};

export async function getParticipantFunctions(): Promise<ParticipantFunction[] | undefined> {
  try {
    const response = await api.get('/funcao/todos');
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

export async function createParticipantFunction(body: ParticipantFunction) {
  try {
    await api.post('/funcao/add', body);
    notification.success({ message: 'Sucesso ao criar a função :)' });
  } catch (e) {
    notification.error({ message: 'erro ao criar o participante :(' });
    console.log(e);
  }
}
