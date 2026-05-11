import { useState } from 'react'
import { Table, Button, Space, Popconfirm, Switch, Tag, Modal, Form, Select, Input, InputNumber, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { Site, StatConfig } from '@/types'
import { useSiteStore } from '@/store/siteStore'

const STAT_TYPES: Record<string, string> = {
  ga4: 'Google Analytics (GA4)',
  gtm: 'Google Tag Manager (GTM)',
  baidu: '百度统计',
  custom: '自定义 JS',
}

const STAT_PARAMS: Record<string, { key: string; label: string }[]> = {
  ga4: [{ key: 'measurementId', label: 'Measurement ID' }],
  gtm: [{ key: 'containerId', label: 'Container ID' }],
  baidu: [{ key: 'trackerId', label: '分析 ID' }],
  custom: [{ key: 'code', label: 'JS 代码' }],
}

interface StatsProps {
  site: Site
}

export default function Stats({ site }: StatsProps) {
  const updateSite = useSiteStore((s) => s.updateSite)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<StatConfig | null>(null)
  const [form] = Form.useForm()

  const openAdd = () => {
    setEditing(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openEdit = (stat: StatConfig) => {
    setEditing(stat)
    form.setFieldsValue({
      type: stat.type,
      ...stat.params,
      enabled: stat.enabled,
      order: stat.order,
    })
    setModalOpen(true)
  }

  const handleSubmit = (values: any) => {
    const type = values.type as StatConfig['type']
    const paramsConfig = STAT_PARAMS[type] || []
    const params: Record<string, string> = {}
    for (const p of paramsConfig) {
      if (values[p.key] !== undefined) {
        params[p.key] = String(values[p.key])
      }
    }

    if (editing) {
      const newStats = site.stats.map((s) =>
        s.id === editing.id
          ? { ...s, type, params, enabled: values.enabled ?? s.enabled, order: values.order ?? s.order }
          : s
      )
      updateSite(site.id, { stats: newStats })
    } else {
      const newStat: StatConfig = {
        id: crypto.randomUUID?.() || Date.now().toString(36),
        type,
        params,
        enabled: true,
        order: site.stats.length,
      }
      updateSite(site.id, { stats: [...site.stats, newStat] })
    }

    setModalOpen(false)
    setEditing(null)
    form.resetFields()
    message.success('保存成功')
  }

  const handleDelete = (statId: string) => {
    updateSite(site.id, { stats: site.stats.filter((s) => s.id !== statId) })
    message.success('删除成功')
  }

  const toggleEnabled = (statId: string) => {
    updateSite(site.id, {
      stats: site.stats.map((s) => (s.id === statId ? { ...s, enabled: !s.enabled } : s)),
    })
  }

  const columns: ColumnsType<StatConfig> = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 220,
      render: (type) => <Tag>{STAT_TYPES[type]}</Tag>,
    },
    {
      title: '参数',
      dataIndex: 'params',
      key: 'params',
      render: (params) => Object.entries(params).map(([k, v]) => `${k}=${v}`).join(', '),
    },
    {
      title: '排序',
      dataIndex: 'order',
      key: 'order',
      width: 80,
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      key: 'enabled',
      width: 80,
      render: (enabled, record) => <Switch checked={enabled} onChange={() => toggleEnabled(record.id)} />,
    },
    {
      title: '操作',
      key: 'action',
      width: 140,
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => openEdit(record)}>
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
        <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
          添加统计
        </Button>
      </div>
      <Table rowKey="id" columns={columns} dataSource={site.stats} pagination={false} size="middle" />
      <Modal
        title={editing ? '编辑统计' : '添加统计'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="type" label="统计类型" rules={[{ required: true, message: '请选择类型' }]}>
            <Select
              options={Object.entries(STAT_TYPES).map(([value, label]) => ({ value, label }))}
              onChange={() => {
                form.resetFields(['code', 'measurementId', 'containerId', 'trackerId'])
              }}
            />
          </Form.Item>
          {Form.useWatch('type', form) && (
            <>
              {(STAT_PARAMS[Form.useWatch('type', form)] || []).map((p) => (
                <Form.Item key={p.key} name={p.key} label={p.label} rules={[{ required: true, message: `请输入${p.label}` }]}>
                  <Input />
                </Form.Item>
              ))}
            </>
          )}
          <Form.Item name="order" label="排序" initialValue={site.stats.length}>
            <InputNumber min={0} max={999} />
          </Form.Item>
          <Form.Item name="enabled" label="启用" valuePropName="checked" initialValue={true}>
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
