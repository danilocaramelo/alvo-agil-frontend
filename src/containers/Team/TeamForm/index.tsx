import { DatePicker, Form, Input, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useCallback, useEffect, useState } from 'react';
import { CustomModal } from '../../../components';
import { Ceremony, getCeremonies } from '../../../connections/ceremony';
import { Framework, getFrameworks } from '../../../connections/framework';
import { createTeam, NewTeam } from '../../../connections/team';
import { getTechnologies, Technology } from '../../../connections/technology';

type TeamFormProps = {
  visible: boolean;
  closeModal: () => void;
  requestTeams: () => void;
};

type FormValues = {
  nmTime: string;
  flTime: 'S' | 'N';
  dtInicioTime: moment.Moment;
  cerimonias: [
    {
      cdCerimonia: string;
    },
  ];
  framework: {
    cdFramework: string;
  };
  tecnologias: [
    {
      cdTecnologia: string;
    },
  ];
  perguntas: null;
};

export function TeamForm({ visible, closeModal, requestTeams }: TeamFormProps) {
  const [frameworks, setFrameworks] = useState<Framework[] | undefined>([]);
  const [ceremonies, setCeremonies] = useState<Ceremony[] | undefined>([]);
  const [technologies, setTechnologies] = useState<Technology[] | undefined>([]);
  const [form] = useForm();

  const requestFrameworks = useCallback(async () => {
    const responseFrameworks = await getFrameworks();
    setFrameworks(responseFrameworks);
  }, []);

  const requestCeremonies = useCallback(async () => {
    const responseCeremonies = await getCeremonies();
    setCeremonies(responseCeremonies);
  }, []);

  const requestTechnologies = useCallback(async () => {
    const responseTechnologies = await getTechnologies();
    setTechnologies(responseTechnologies);
  }, []);

  useEffect(() => {
    requestFrameworks();
    requestCeremonies();
    requestTechnologies();
  }, []);

  const newTeam = useCallback(async (values: FormValues) => {
    console.log(values);
    const finalValues: NewTeam = {
      ...values,
      dtInicioTime: values.dtInicioTime?.format('YYYY-MM-DD'),
    };
    await createTeam(finalValues);
    requestTeams();
    closeModal();
  }, []);

  return (
    <CustomModal
      closeModal={closeModal}
      visible={visible}
      onFinish={newTeam}
      okButtonText='Criar'
      form={form}
    >
      <>
        <Form.Item label='Nome do Squad' name='nmTime'>
          <Input />
        </Form.Item>
        <Form.Item label='Status' name='flTime'>
          <Select>
            <Select.Option value='S'>Ativo</Select.Option>
            <Select.Option value='N'>Inativo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Data de início' name='dtInicioTime'>
          <DatePicker format='YYYY/MM/DD' />
        </Form.Item>
        <Form.Item label='Framework' name='framework'>
          <Select>
            {frameworks?.map((framework) => (
              <Select.Option value={String(framework.cdFramework)} key={framework.cdFramework}>
                {framework.nmFramework}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Cerimonias' name='cerimonias'>
          <Select mode='multiple'>
            {ceremonies?.map((ceremony) => (
              <Select.Option value={String(ceremony.cdCerimonia)} key={ceremony.cdCerimonia}>
                {ceremony.nmCerimonia}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Tecnologias' name='tecnologias'>
          <Select mode='multiple'>
            {technologies?.map((technology) => (
              <Select.Option value={String(technology.cdTecnologia)} key={technology.cdTecnologia}>
                {technology.nmTecnologia}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </>
    </CustomModal>
  );
}
