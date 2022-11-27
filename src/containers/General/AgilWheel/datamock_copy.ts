import { AgilWheelData } from './types';

export const data2: AgilWheelData = {
  // nome avaliação || data da aplicação
  label: '',
  data: 'YYYY-MM-DD',
  children: [
    {
      // camada
      label: 'segurança',
      children: [
        {
          // tema
          label: 'confidenciabilidade',
          children: [
            {
              // descrição pergunta
              label: 'pergunta A',
              // nota
              score: 5,
              peso: 1,
            },
            {
              label: 'pergunta B',
              score: 2,
            },
          ],
        },
        {
          label: 'proteção',
          children: [
            {
              label: 'pergunta C',
              score: 1,
            },
            {
              label: 'pergunta D',
              score: 1,
            },
          ],
        },
      ],
    },
    {
      label: 'cliente',
      children: [
        {
          label: 'feedback',
          children: [
            {
              label: 'pergunta 1',
              score: 3,
            },
            {
              label: 'pergunta 2',
              score: 3,
            },
          ],
        },
        {
          label: 'pontualidade',
          children: [
            {
              label: 'pergunta 3',
              score: 3,
            },
            {
              label: 'pergunta 4',
              score: 3,
            },
          ],
        },
      ],
    },
    {
      label: 'habilidades',
      children: [
        {
          label: 'comunicação',
          children: [
            {
              label: 'pergunta 1',
              score: 3,
            },
            {
              label: 'pergunta 2',
              score: 3,
            },
          ],
        },
        {
          label: 'motivação',
          children: [
            {
              label: 'pergunta 3',
              score: 3,
            },
            {
              label: 'pergunta 4',
              score: 3,
            },
          ],
        },
      ],
    },
    {
      label: 'teste',
      children: [
        {
          label: 'comunicação',
          children: [
            {
              label: 'pergunta 1',
              score: 3,
            },
            {
              label: 'pergunta 2',
              score: 3,
            },
          ],
        },
        {
          label: 'motivação',
          children: [
            {
              label: 'pergunta 3',
              score: 6,
            },
            {
              label: 'pergunta 4',
              score: 3,
            },
          ],
        },
      ],
    },
  ],
};
