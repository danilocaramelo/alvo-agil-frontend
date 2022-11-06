import { notification } from 'antd';
import api from '../config/httRequest';
import { Ceremony } from './ceremony';
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

export type NewTeam = {
  nmTime: string;
  flTime: 'S' | 'N';
  dtInicioTime: string;
  cerimonias: [
    {
      cdCerimonia: number;
    },
  ];
  framework: {
    cdFramework: number;
  };
  tecnologias: [
    {
      cdTecnologia: number;
    },
  ];
  perguntas: null;
};

export async function getTeams(): Promise<Team[] | undefined> {
  try {
    const response = await api.get('/time/todos');
    return response.data;
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

export async function updateTeam(team: Team) {
  try {
    await api.put('/time/atualiza/', team);
  } catch (e) {
    notification.error({ message: 'erro ao conectar a api :(' });
    console.log(e);
  }
}
