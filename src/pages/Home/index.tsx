import { Table, Button, Space, Popconfirm, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useSiteStore } from '@/store/siteStore'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

export default function Home() {
  const navigate = useNavigate()
  const { sites, deleteSite } = useSiteStore()

  const handleDelete = (id: string) => {
    deleteSite(id)
    message.success('删除成功')
  }

  const columns: ColumnsType<typeof sites[0]> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (name, record) => (
        <a onClick={() => navigate(`/site/${record.id}`)}>{name}</a>
      ),
    },
    {
      title: '域名',
      dataIndex: 'domain',
      key: 'domain',
      width: 250,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '统计',
      dataIndex: 'stats',
      key: 'stats',
      width: 80,
      render: (stats) => stats?.length || 0,
    },
    {
      title: '广告',
      dataIndex: 'ads',
      key: 'ads',
      width: 80,
      render: (ads) => ads?.length || 0,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (time) => dayjs(time).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/site/${record.id}`)}
          >
            查看
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => navigate(`/site/${record.id}/edit`)}
          >
            编辑
          </Button>
          <Popconfirm title="确定删除？" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/site/add')}
        >
          新建网站
        </Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={sites}
        pagination={{ pageSize: 10 }}
      />
    </div>
  )
}
