import { Button, Popover, Row, Table, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { deleteFramework, Framework, getFrameworks } from '../../../connections/framework';
import { FrameworkForm } from '../FrameworkForm';

export function FrameworksTable() {
  const [frameworks, setFrameworks] = useState<Framework[] | undefined>([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [isFrameworkModalOpen, setIsFrameworkModalOpen] = useState(false);

  const openFrameworkModal = useCallback(() => setIsFrameworkModalOpen(true), []);

  const requestFrameworks = useCallback(async () => {
    setLoadingTable(true);
    const response = await getFrameworks();
    setFrameworks(response);
    setLoadingTable(false);
  }, []);

  const removeFramework = useCallback(async (ceremonyId: number) => {
    await deleteFramework(ceremonyId);
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
    },
    {
      title: 'Status',
      key: 'flFramework',
      dataIndex: 'flFramework',
      render: (_, { flFramework }) =>
        flFramework === 'S' ? <Tag color='green'>Ativo</Tag> : <Tag color='red'>Inativo</Tag>,
    },
    {
      title: 'Ações',
      key: 'actions',
      dataIndex: 'cdFramework',
      render: (_, { cdFramework }) => (
        <Popover
          content={
            <>
              <div>Tem certeza que deseja excluir?</div>
              <Row justify='center'>
                <Button onClick={() => removeFramework(cdFramework)}>Confirma</Button>
              </Row>
            </>
          }
          trigger='click'
        >
          <Button shape='circle' icon={<DeleteOutlined />} />
        </Popover>
      ),
    },
  ];

  return (
    <div id='frameworks-table'>
      <Button onClick={openFrameworkModal}>Novo Framework</Button>
      <Table
        columns={columns}
        dataSource={frameworks}
        loading={loadingTable}
        rowKey='cdFramework'
      />
      <FrameworkForm
        requestFrameworks={requestFrameworks}
        visible={isFrameworkModalOpen}
        setVisible={setIsFrameworkModalOpen}
      />
    </div>
  );
}
