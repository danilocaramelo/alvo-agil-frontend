import { Button, Popover, Row, Table, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { deleteTechnology, getTechnologies, Technology } from '../../../connections/technology';
import { TechnologyForm } from '../TechnologyForm';

export function TechnologiesTable() {
  const [technologies, setTechnologies] = useState<Technology[] | undefined>([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [isTechnologyModalOpen, setIsTechnologyModalOpen] = useState(false);

  const openTechnologyModal = useCallback(() => setIsTechnologyModalOpen(true), []);

  const requestTechnologies = useCallback(async () => {
    setLoadingTable(true);
    const response = await getTechnologies();
    setTechnologies(response);
    setLoadingTable(false);
  }, []);

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
    },
    {
      title: 'Status',
      key: 'flTecnologia',
      dataIndex: 'flTecnologia',
      render: (_, { flTecnologia }) =>
        flTecnologia === 'S' ? <Tag color='green'>Ativo</Tag> : <Tag color='red'>Inativo</Tag>,
    },
    {
      title: 'Ações',
      key: 'actions',
      dataIndex: 'cdTecnologia',
      render: (_, { cdTecnologia }) => (
        <Popover
          content={
            <>
              <div>Tem certeza que deseja excluir?</div>
              <Row justify='center'>
                <Button onClick={() => removeTechnology(cdTecnologia)}>Confirma</Button>
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
    <div id='technologies-table'>
      <Button onClick={openTechnologyModal}>Nova Tecnologia</Button>
      <Table
        columns={columns}
        dataSource={technologies}
        loading={loadingTable}
        rowKey='cdTecnologia'
        pagination={{ pageSize: 4 }}
      />
      <TechnologyForm
        requestTechnologies={requestTechnologies}
        visible={isTechnologyModalOpen}
        setVisible={setIsTechnologyModalOpen}
      />
    </div>
  );
}
