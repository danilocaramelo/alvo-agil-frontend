import { Button, Popover, Row, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { deleteFramework, Framework, updateFramework } from '../../../connections/framework';
import { CustomButton } from '../../../components';
import { SimpleForm, SimpleFormTypes } from '../../General/SimpleForm';

type FrameworksTableProps = {
  frameworks: Framework[] | undefined;
  loading: boolean;
  requestFrameworks: () => void;
};

export function FrameworksTable({ frameworks, loading, requestFrameworks }: FrameworksTableProps) {
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
  const [editFormInitialValues, setEditFormInitialValues] = useState<Framework | undefined>();

  const openEditForm = useCallback(
    (initialValues: Framework) => () => {
      setEditFormInitialValues(initialValues);
      setEditFormVisible(true);
    },
    [],
  );
  const closeEditForm = useCallback(() => setEditFormVisible(false), []);

  const removeFramework = useCallback(async (ceremonyId: number) => {
    await deleteFramework(ceremonyId);
    requestFrameworks();
  }, []);

  const editFramework = useCallback(async (values: Framework) => {
    await updateFramework(values);
    requestFrameworks();
  }, []);

  useEffect(() => {
    requestFrameworks();
  }, []);

  const columns: ColumnsType<Framework> = [
    {
      title: 'Nome',
      dataIndex: 'nmFramework',
      key: 'nmFramework',
      align: 'center',
    },
    {
      title: 'Status',
      key: 'flFramework',
      dataIndex: 'flFramework',
      align: 'center',
      render: (_, { flFramework }) =>
        flFramework === 'S' ? <Tag color='green'>Ativo</Tag> : <Tag color='red'>Inativo</Tag>,
    },
    {
      title: 'Ações',
      key: 'actions',
      dataIndex: 'cdFramework',
      align: 'center',
      render: (_, framework) => (
        <>
          <CustomButton
            icon={<EditOutlined />}
            onClick={openEditForm(framework)}
            style={{ marginRight: '10px' }}
          />
          <Popover
            content={
              <>
                <div>Tem certeza que deseja excluir?</div>
                <Row justify='center'>
                  <Button onClick={() => removeFramework(framework.cdFramework)}>Confirma</Button>
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
    <div id='frameworks-table'>
      <Table
        columns={columns}
        dataSource={frameworks}
        loading={loading}
        rowKey='cdFramework'
        pagination={{ pageSize: 4 }}
      />
      <SimpleForm
        visible={editFormVisible}
        closeModal={closeEditForm}
        submit={editFramework}
        type={SimpleFormTypes.FRAMEWORK}
        request={requestFrameworks}
        initialValues={editFormInitialValues}
      />
    </div>
  );
}
