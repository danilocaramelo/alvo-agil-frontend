import api from '../config/httRequest';

export type Framework = {
  cdFramework: number;
  nmFramework: string;
  flFramework: 'S' | 'N';
};

export async function getFrameworks(): Promise<any> {
  try {
    const response = await api.get('/framework/todos');
    return response.data;
  } catch (e) {
    console.log(e);
  }
}