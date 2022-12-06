import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { CustomModal } from '../../components';
import {
  getParticipantFunctions,
  ParticipantFunction,
} from '../../connections/participantFunction';
import {
  createParticipant,
  NewParticipant,
  Participant,
  updateParticipant,
} from '../../connections/particpant';

type ParticipantFormProps = {
  visible: boolean;
  closeModal: () => void;
  requestParticipants: () => void;
  initialValues?: Participant;
};

type FormValues = {
  nmParticipante: string;
  flParticipante: 'S' | 'N';
  dtInicioParticipante: moment.Moment;
  dtFimParticipante?: moment.Moment;
  emailParticipante: string;
  cdFuncao: number;
};

export function ParticipantForm({
  visible,
  closeModal,
  requestParticipants,
  initialValues,
}: ParticipantFormProps) {
  const [form] = useForm();
  const [participantFunctions, setParticipantFunctions] = useState<
    ParticipantFunction[] | undefined
  >([]);

  const requestParticipantFunctions = useCallback(async () => {
    const responseFrameworks = await getParticipantFunctions();
    setParticipantFunctions(responseFrameworks);
  }, []);

  useEffect(() => {
    requestParticipantFunctions();
  }, []);

  const submit = useCallback(
    async (values: FormValues) => {
      const finalValues: NewParticipant = {
        ...values,
        dtInicioParticipante: values.dtInicioParticipante?.format('YYYY-MM-DD'),
        dtFimParticipante: values.dtFimParticipante
          ? values.dtFimParticipante.format('YYYY-MM-DD')
          : undefined,
      };
      if (initialValues) {
        updateParticipant({ ...finalValues, cdParticipante: String(initialValues.cdParticipante) });
      } else {
        await createParticipant(finalValues);
      }
      await requestParticipants();
      closeModal();
    },
    [initialValues],
  );

  if (initialValues) {
    form.setFieldValue('nmParticipante', initialValues.nmParticipante);
    form.setFieldValue('emailParticipante', initialValues.emailParticipante);
    form.setFieldValue('flParticipante', initialValues.flParticipante);
    form.setFieldValue(
      'dtInicioTime',
      initialValues.dtInicioParticipante ? moment(initialValues.dtInicioParticipante) : undefined,
    );
    form.setFieldValue(
      'dtFinalizacaoTime',
      initialValues.dtFimParticipante ? moment(initialValues?.dtFimParticipante) : undefined,
    );
    form.setFieldValue('cdFuncao', initialValues.funcao.cdFuncao);
  }

  return (
    <CustomModal
      closeModal={closeModal}
      visible={visible}
      onFinish={submit}
      okButtonText='Criar'
      form={form}
      initialValues={initialValues}
    >
      <>
        <Form.Item label='Nome' name='nmParticipante'>
          <Input />
        </Form.Item>
        <Row>
          <Col span={16}>
            <Form.Item label='Email' name='emailParticipante'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item label='Status' name='flParticipante'>
              <Select>
                <Select.Option value='S'>Ativo</Select.Option>
                <Select.Option value='N'>Inativo</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify='space-around'>
          <Form.Item label='início' name='dtInicioParticipante'>
            <DatePicker format='DD/MM/YYYY' />
          </Form.Item>
          <Form.Item label='fim' name='dtFimParticipante'>
            <DatePicker format='DD/MM/YYYY' />
          </Form.Item>
          <Row>
            <Form.Item label='Função' name='cdFuncao'>
              <Select>
                {participantFunctions?.map((participantFunction) => (
                  <Select.Option
                    value={participantFunction.cdFuncao}
                    key={participantFunction.cdFuncao}
                  >
                    {participantFunction.nmFuncao}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Row>
        </Row>
      </>
    </CustomModal>
  );
}
