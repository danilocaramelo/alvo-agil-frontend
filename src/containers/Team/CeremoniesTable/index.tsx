import { Button, Popover, Row, Table, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { Ceremony, deleteCeremony, getCeremonies } from '../../../connections/ceremony';

export function CeremoniesTable() {
  const [loadingTable, setLoadingTable] = useState(false);
  const [ceremonies, setCeremonies] = useState<Ceremony[] | undefined>([]);
  // const [popOverDelete, setPopOverDelete] = useState<boolean>(false);
  // const hide = () => {
  //   setPopOverDelete(false);
  // };

  const requestCeremonies = useCallback(async () => {
    setLoadingTable(true);
    const response = await getCeremonies();
    setCeremonies(response);
    setLoadingTable(false);
  }, []);

  const removeCeremony = useCallback(async (ceremonyId: number) => {
    await deleteCeremony(ceremonyId);
    // hide();
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
    },
    {
      title: 'Status',
      key: 'flCerimonia',
      dataIndex: 'flCerimonia',
      render: (_, { flCerimonia }) =>
        flCerimonia === 'S' ? <Tag color='green'>Ativo</Tag> : <Tag color='red'>Inativo</Tag>,
    },
    {
      title: 'Ações',
      key: 'actions',
      dataIndex: 'cdCerimonia',
      render: (_, { cdCerimonia }) => (
        <Popover
          content={
            <>
              <div>Tem certeza que deseja excluir?</div>
              <Row justify='center'>
                <Button onClick={() => removeCeremony(cdCerimonia)}>Confirma</Button>
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
    <div id='ceremonies-table'>
      <Table
        columns={columns}
        dataSource={ceremonies}
        loading={loadingTable}
        rowKey='cdCerimonia'
        pagination={{ pageSize: 4 }}
      />
    </div>
  );
}
