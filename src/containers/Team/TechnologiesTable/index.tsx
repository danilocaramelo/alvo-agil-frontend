import { Button, Popover, Row, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { deleteTechnology, Technology, updateTechnology } from '../../../connections/technology';
import { CustomButton } from '../../../components';
import { SimpleForm, SimpleFormTypes } from '../../General/SimpleForm';

type TechnologiesTableProps = {
  technologies: Technology[] | undefined;
  loading: boolean;
  requestTechnologies: () => void;
};

export function TechnologiesTable({
  technologies,
  loading,
  requestTechnologies,
}: TechnologiesTableProps) {
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
  const [editFormInitialValues, setEditFormInitialValues] = useState<boolean>(false);

  const closeEditForm = useCallback(() => setEditFormVisible(false), []);

  const editTechnology = useCallback(async (values: Technology) => {
    await updateTechnology(values);
    requestTechnologies();
  }, []);

  const openEditForm = useCallback(
    (initialValues: any) => () => {
      setEditFormInitialValues(initialValues);
      setEditFormVisible(true);
    },
    [],
  );

  const removeTechnology = useCallback(async (ceremonyId: number) => {
    await deleteTechnology(ceremonyId);
    requestTechnologies();
  }, []);

  useEffect(() => {
    requestTechnologies();
  }, []);

  const columns: ColumnsType<Technology> = [
    {
      title: 'Nome',
      dataIndex: 'nmTecnologia',
      key: 'nmTecnologia',
      align: 'center',
    },
    {
      title: 'Status',
      key: 'flTecnologia',
      dataIndex: 'flTecnologia',
      align: 'center',
      render: (_, { flTecnologia }) =>
        flTecnologia === 'S' ? <Tag color='green'>Ativo</Tag> : <Tag color='red'>Inativo</Tag>,
    },
    {
      title: 'Ações',
      key: 'actions',
      dataIndex: 'cdTecnologia',
      align: 'center',
      render: (_, tecnologia) => (
        <>
          <CustomButton
            icon={<EditOutlined />}
            onClick={openEditForm(tecnologia)}
            style={{ marginRight: '10px' }}
          />
          <Popover
            content={
              <>
                <div>Tem certeza que deseja excluir?</div>
                <Row justify='center'>
                  <Button onClick={() => removeTechnology(tecnologia.cdTecnologia)}>
                    Confirma
                  </Button>
                </Row>
              </>
            }
            trigger='click'
          >
            <CustomButton icon={<DeleteOutlined />} onClick={() => console.log()} />
          </Popover>
        </>
      ),
    },
  ];

  return (
    <div id='technologies-table'>
      <Table
        columns={columns}
        dataSource={technologies}
        loading={loading}
        rowKey='cdTecnologia'
        pagination={{ pageSize: 4 }}
      />
      <SimpleForm
        visible={editFormVisible}
        closeModal={closeEditForm}
        submit={editTechnology}
        type={SimpleFormTypes.TECHNOLOGY}
        request={requestTechnologies}
        initialValues={editFormInitialValues}
      />
    </div>
  );
}
