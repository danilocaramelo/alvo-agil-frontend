import { Popover, Row, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { CustomButton } from '../../../components';
import { SimpleForm, SimpleFormTypes } from '../../General/SimpleForm';
import { deleteFunction, FunctionElement, updateFunction } from '../../../connections/functions';

type FunctionsTableProps = {
  functions: FunctionElement[] | undefined;
  loading: boolean;
  requestFunctions: () => void;
};

export function FunctionsTable({ functions, loading, requestFunctions }: FunctionsTableProps) {
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
  const [editFormInitialValues, setEditFormInitialValues] = useState<FunctionElement | undefined>();

  const openEditForm = useCallback(
    (initialValues: FunctionElement) => () => {
      setEditFormInitialValues(initialValues);
      setEditFormVisible(true);
    },
    [],
  );
  const closeEditForm = useCallback(() => setEditFormVisible(false), []);

  const removeFunction = useCallback(async (ceremonyId: number) => {
    await deleteFunction(ceremonyId);
    requestFunctions();
  }, []);

  const editFunction = useCallback(async (values: FunctionElement) => {
    await updateFunction(values);
    requestFunctions();
  }, []);

  useEffect(() => {
    requestFunctions();
  }, []);

  const columns: ColumnsType<FunctionElement> = [
    {
      title: 'Nome',
      dataIndex: 'nmFuncao',
      key: 'nmFuncao',
      align: 'center',
    },
    {
      title: 'Status',
      key: 'flFuncao',
      dataIndex: 'flFuncao',
      align: 'center',
      render: (_, { flFuncao }) =>
        flFuncao === 'S' ? <Tag color='green'>Ativo</Tag> : <Tag color='red'>Inativo</Tag>,
    },
    {
      title: 'Ações',
      key: 'actions',
      dataIndex: 'cdFuncao',
      align: 'center',
      render: (_, functionElement) => (
        <>
          <CustomButton
            icon={<EditOutlined />}
            onClick={openEditForm(functionElement)}
            style={{ marginRight: '10px' }}
          />
          <Popover
            content={
              <>
                <div>Tem certeza que deseja excluir?</div>
                <Row justify='center'>
                  <CustomButton
                    onClick={() => removeFunction(functionElement.cdFuncao)}
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
    <div id='function-table'>
      <Table
        columns={columns}
        dataSource={functions}
        loading={loading}
        rowKey='cdFuncao'
        pagination={{ pageSize: 4 }}
      />
      <SimpleForm
        visible={editFormVisible}
        closeModal={closeEditForm}
        submit={editFunction}
        type={SimpleFormTypes.FUNCTION}
        request={requestFunctions}
        initialValues={editFormInitialValues}
      />
    </div>
  );
}
