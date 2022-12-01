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
              label: 'As informações sigilosas estão resguardadas de forma segura',
              // nota
              score: 1,
              peso: 1,
            },
            {
              label: 'Os acessos aos softwares são controlados e organizados de mofo que somente as pessoas certas recebem as autorizações necessárias',
              score: 1,
            },
          ],
        },
      ],
    },
    {
      label: 'relação interpessoal',
      children: [
        {
          label: 'feedback',
          children: [
            {
              label: 'Eu dou feedbacks construtivos rotineiramente',
              score: 1,
            },
            {
              label: 'Tenho recebido feedbacks de meus colegas de trabalho com regularidade',
              score: 1,
            },
            {
              label: 'Troco feedbacks com meu superior com frequência',
              score: 1,
            },
          ],
        },
        {
          label: 'pontualidade',
          children: [
            {
              label: 'Sempre chego no horário',
              score: 1,
            },
            {
              label: 'Não tenho feito horas extras',
              score: 1,
            },
            {
              label: 'As entregas são realizadas dentro dos prazos estipulados',
              score: 1,
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
              label: 'As tarefas sempre são escritas de forma clara',
              score: 1,
            },
            {
              label: 'A comunicação com outros integrantes da equipe é objetiva e esclarecedora',
              score: 1,
            },
          ],
        },
        {
          label: 'motivação',
          children: [
            {
              label: 'Sinto-me motivado a trabalhar nesta empresa',
              score: 1,
            },
            {
              label: 'Aqui há desafios que me mantém interessado em continuar me desenvolvendo',
              score: 1,
            },
          ],
        },
      ],
    },
  ],
};
