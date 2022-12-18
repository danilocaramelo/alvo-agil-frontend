import { DatePicker, Form, Input, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { CustomModal } from '../../../components';
import { Ceremony, getCeremonies } from '../../../connections/ceremony';
import { Framework, getFrameworks } from '../../../connections/framework';
import { createTeam, NewTeam, Team, updateTeam } from '../../../connections/team';
import { getTechnologies, Technology } from '../../../connections/technology';

type TeamFormProps = {
  visible: boolean;
  closeModal: () => void;
  requestTeams: () => void;
  initialValues?: Team;
  frameworks?: Framework[];
  ceremonies?: Ceremony[];
  technologies?: Technology[];
};

type FormValues = {
  nmTime?: string;
  flTime?: 'S' | 'N';
  dtInicioTime?: moment.Moment;
  dtFinalizacaoTime?: moment.Moment;
  cerimonias?: string[];
  framework?: string | null;
  tecnologias?: string[];
};

export function TeamForm({
  visible,
  closeModal,
  requestTeams,
  initialValues,
  frameworks,
  ceremonies,
  technologies,
}: TeamFormProps) {
  const [form] = useForm();

  if (initialValues) {
    form.setFieldValue('nmTime', initialValues.nmTime);
    form.setFieldValue('flTime', initialValues.flTime);
    form.setFieldValue(
      'dtInicioTime',
      initialValues.dtInicioTime ? moment(initialValues.dtInicioTime) : undefined,
    );
    form.setFieldValue(
      'dtFinalizacaoTime',
      initialValues.dtFinalizacaoTime ? moment(initialValues?.dtFinalizacaoTime) : undefined,
    );
    form.setFieldValue('framework', initialValues.framework.cdFramework);
    form.setFieldValue(
      'cerimonias',
      initialValues.cerimonias.map((cerimony) => cerimony.cdCerimonia),
    );
    form.setFieldValue(
      'tecnologias',
      initialValues.tecnologias.map((technology) => technology.cdTecnologia),
    );
  }

  const submit = useCallback(
    async (values: FormValues) => {
      const finalValues: NewTeam = {
        ...values,
        dtInicioTime: values.dtInicioTime?.format('YYYY-MM-DD'),
        dtFinalizacaoTime: values.dtFinalizacaoTime?.format('YYYY-MM-DD'),
        participantes: initialValues?.participantes.map((participant) =>
          String(participant.cdParticipante),
        ),
      };
      if (initialValues) {
        await updateTeam({ ...finalValues, cdTime: initialValues.cdTime });
      } else {
        await createTeam({ ...finalValues, participantes: [] });
      }
      await requestTeams();
      form.resetFields();
      closeModal();
    },
    [initialValues],
  );

  return (
    <CustomModal
      closeModal={closeModal}
      visible={visible}
      onFinish={submit}
      okButtonText={initialValues ? 'Editar' : 'Criar'}
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
          <DatePicker format='DD/MM/YYYY' />
        </Form.Item>
        <Form.Item label='Data de final' name='dtFinalizacaoTime'>
          <DatePicker format='DD/MM/YYYY' />
        </Form.Item>
        <Form.Item label='Framework' name='framework'>
          <Select>
            {frameworks?.map((framework) => (
              <Select.Option value={framework.cdFramework} key={framework.cdFramework}>
                {framework.nmFramework}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Cerimonias' name='cerimonias'>
          <Select mode='multiple'>
            {ceremonies?.map((ceremony) => (
              <Select.Option value={ceremony.cdCerimonia} key={ceremony.cdCerimonia}>
                {ceremony.nmCerimonia}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Tecnologias' name='tecnologias'>
          <Select mode='multiple'>
            {technologies?.map((technology) => (
              <Select.Option value={technology.cdTecnologia} key={technology.cdTecnologia}>
                {technology.nmTecnologia}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </>
    </CustomModal>
  );
}
