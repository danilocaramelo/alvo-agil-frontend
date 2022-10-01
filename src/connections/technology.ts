import api from '../config/httRequest';

export type Technology = {
  cdTecnologia: number;
  nmTecnologia: string;
  flTecnologia: 'S' | 'N'; 
};

export async function getTechnologies(): Promise<any> {
  try {
    const response = await api.get('/tecnologia/todos');
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
