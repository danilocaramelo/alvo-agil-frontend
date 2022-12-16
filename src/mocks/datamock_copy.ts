import { Aplication } from '../connections/aplication';

export const data2: Aplication = {
  cdAplicacao: 1,
  cdAvaliacao: 9999,
  label: '',
  dtAvaliacao: 'YYYY-MM-DD',
  children: [
    {
      // camada
      label: 'segurança',
      score: 1,
      children: [
        {
          label: 'confidenciabilidade',
          nota: 72,
          children: [
            {
              label: 'As informações sigilosas estão resguardadas de forma segura',
              score: 1,
              peso: 1,
            },
            {
              label:
                'Os acessos aos softwares são controlados e organizados de modo que somente as pessoas certas recebem as autorizações necessárias',
              score: 1,
              peso: 1,
            },
          ],
        },
        {
          label: 'teste',
          nota: 7,
          children: [
            {
              label: 'As informações sigilosas estão resguardadas de forma segura',
              score: 1,
              peso: 1,
            },
            {
              label:
                'Os acessos aos softwares são controlados e organizados de modo que somente as pessoas certas recebem as autorizações necessárias',
              score: 1,
              peso: 1,
            },
          ],
        },
      ],
    },
  ],
};
