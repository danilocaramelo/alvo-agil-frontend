import api from '../config/httRequest';
import { Ceremony } from './Ceremony';
import { Framework } from './framework';
import { Technology } from './technology';

export type Team = {
  cdTime: number;
  cerimonias: Ceremony[];
  dtInicioTime: string;
  flTime: 'S' | 'N';
  framework: Framework;
  nmTime: string;
  perguntas: [];
  tecnologias: Technology[];
};

export async function getTeams(): Promise<Team[] | undefined> {
  try {
    const response = await api.get('/time/todos');
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
