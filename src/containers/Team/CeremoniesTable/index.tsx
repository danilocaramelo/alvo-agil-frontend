import { Popover, Row, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { Ceremony, deleteCeremony, updateCeremony } from '../../../connections/ceremony';
import { CustomButton } from '../../../components';
import { SimpleForm, SimpleFormTypes } from '../../General/SimpleForm';

type CeremoniesTableProps = {
  ceremonies: Ceremony[] | undefined;
  loading: boolean;
  requestCeremonies: () => void;
};

export function CeremoniesTable({ ceremonies, loading, requestCeremonies }: CeremoniesTableProps) {
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
  const [editFormInitialValues, setEditFormInitialValues] = useState<Ceremony | undefined>();

  const openEditForm = useCallback(
    (initialValues: Ceremony) => () => {
      setEditFormInitialValues(initialValues);
      setEditFormVisible(true);
    },
    [],
  );
  const closeEditForm = useCallback(() => setEditFormVisible(false), []);

  const editCeremony = useCallback(async (values: Ceremony) => {
    await updateCeremony(values);
    requestCeremonies();
  }, []);

  const removeCeremony = useCallback(async (ceremonyId: number) => {
    await deleteCeremony(ceremonyId);
    requestCeremonies();
  }, []);

  useEffect(() => {
    requestCeremonies();
  }, []);

  const columns: ColumnsType<Ceremony> = [
    {
      title: 'Nome',
      dataIndex: 'nmCerimonia',
      key: 'nmCerimonia',
      align: 'center',
    },
    {
      title: 'Status',
      key: 'flCerimonia',
      dataIndex: 'flCerimonia',
      align: 'center',
      render: (_, { flCerimonia }) =>
        flCerimonia === 'S' ? <Tag color='green'>Ativo</Tag> : <Tag color='red'>Inativo</Tag>,
    },
    {
      title: 'Ações',
      key: 'actions',
      dataIndex: 'cdCerimonia',
      align: 'center',
      render: (_, ceremony) => (
        <>
          <CustomButton
            icon={<EditOutlined />}
            onClick={openEditForm(ceremony)}
            style={{ marginRight: '10px' }}
          />
          <Popover
            content={
              <>
                <div>Tem certeza que deseja excluir?</div>
                <Row justify='center'>
                  <CustomButton
                    onClick={() => removeCeremony(ceremony.cdCerimonia)}
                    label='Confirma'
                    color='orange'
                    style={{ marginTop: '10px' }}
                  />
                </Row>
              </>
            }
            trigger='click'
          >
            <CustomButton icon={<DeleteOutlined />} />
          </Popover>
        </>
      ),
    },
  ];

  return (
    <div id='ceremonies-table'>
      <Table
        columns={columns}
        dataSource={ceremonies}
        loading={loading}
        rowKey='cdCerimonia'
        pagination={{ pageSize: 4 }}
      />
      <SimpleForm
        visible={editFormVisible}
        closeModal={closeEditForm}
        submit={editCeremony}
        type={SimpleFormTypes.CEREMONY}
        request={requestCeremonies}
        initialValues={editFormInitialValues}
      />
    </div>
  );
}
