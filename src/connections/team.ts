import { notification } from 'antd';
import api from '../config/httRequest';
import { Ceremony } from './ceremony';
import { Framework } from './framework';
import { Participant } from './particpant';
import { Technology } from './technology';

export type Team = {
  cdTime: number;
  cerimonias: Ceremony[];
  dtInicioTime: string;
  dtFinalizacaoTime: string | undefined;
  flTime: 'S' | 'N';
  framework: Framework;
  nmTime: string;
  perguntas: [];
  tecnologias: Technology[];
  participantes: Participant[];
};

export type NewTeam = {
  cdTime?: number;
  nmTime?: string;
  flTime?: 'S' | 'N';
  dtInicioTime?: string;
  dtFinalizacaoTime?: string;
  framework?: string | null;
  cerimonias?: string[];
  tecnologias?: string[];
  participantes?: string[];
};

export async function getTeams(): Promise<Team[] | undefined> {
  try {
    const response = await api.get('/time/todos');
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

export async function getTeam(teamId: number): Promise<Team | undefined> {
  try {
    const response = await api.get(`/time/busca/${teamId}`);
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

export async function createTeam(body: NewTeam) {
  try {
    await api.post('/time/v2/add', body);
    notification.success({ message: 'Sucesso ao criar o time :)' });
  } catch (e) {
    notification.error({ message: 'erro ao criar o time :(' });
    console.log(e);
  }
}

export async function deleteTeam(teamId: number) {
  try {
    await api.delete(`/time/deleta/${teamId}`);
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}

export async function updateTeam(team: NewTeam) {
  try {
    await api.put('/time/atualiza/', team);
    notification.success({ message: 'Sucesso ao atualizar o time :)' });

  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}
