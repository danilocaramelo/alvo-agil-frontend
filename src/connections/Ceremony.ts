import api from '../config/httRequest';

export type Ceremony = {
  cdCerimonia: number;
  nmCerimonia: string;
  flCerimonia: string;
};

export type NewCeremony = {
  nmCerimonia: string;
  flCerimonia: string;
}

export async function getCeremonies(): Promise<any> {
  try {
    const response = await api.get('/cerimonia/todos');
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function createCeremony(newCeremony : NewCeremony) {
  try {
    const response = await api.post('/cerimonia/add', newCeremony);
  } catch (e) {
    console.log(e);
  }
}
