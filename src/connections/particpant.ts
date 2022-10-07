import { notification } from 'antd';
import api from '../config/httRequest';
import { ParticipantFunction } from './participantFunction';
import { Team } from './team';

export type Participant = {
  cdParticipante: number;
  nmParticipante: string;
  flParticipante: 'S' | 'N';
  dtInicioParticipante: string;
  dtFimParticipante: string;
  emailParticipante: string;
  time: Team;
  funcao: ParticipantFunction;
};

export type NewParticipant = {
  cdParticipante: number;
  nmParticipante: string;
  flParticipante: 'S' | 'N';
  dtInicioParticipante: string;
  dtFimParticipante: string;
  emailParticipante: string;
};

export async function getParticipants(): Promise<Participant[] | undefined> {
  try {
    const response = await api.get('/participante/todos');
    return response.data;
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}

export async function createParticipant(body: NewParticipant) {
  try {
    await api.post('/participante/add', body);
    notification.success({ message: 'Sucesso ao criar o participante :)' });
  } catch (e) {
    notification.error({ message: 'erro ao criar o participante :(' });
    console.log(e);
  }
}
