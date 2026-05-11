import { useState } from 'react'
import { Table, Button, Space, Popconfirm, Switch, Tag, Modal, Form, Select, InputNumber, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { Site, AdConfig } from '@/types'
import { useSiteStore } from '@/store/siteStore'
import Editor from '@monaco-editor/react'

const AD_TYPES: Record<string, string> = {
  banner: '横幅广告 (Banner)',
  popup: '弹窗广告 (Popup)',
  floating: '悬浮广告 (Floating)',
  custom: '自定义 HTML/JS',
}

interface AdsProps {
  site: Site
}

export default function Ads({ site }: AdsProps) {
  const updateSite = useSiteStore((s) => s.updateSite)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<AdConfig | null>(null)
  const [form] = Form.useForm()

  const openAdd = () => {
    setEditing(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openEdit = (ad: AdConfig) => {
    setEditing(ad)
    form.setFieldsValue({
      type: ad.type,
      content: ad.content,
      position: ad.position,
      width: ad.width,
      height: ad.height,
      enabled: ad.enabled,
      priority: ad.priority,
    })
    setModalOpen(true)
  }

  const handleSubmit = (values: any) => {
    if (editing) {
      const newAds = site.ads.map((a) =>
        a.id === editing.id
          ? {
              ...a,
              type: values.type,
              content: values.content,
              position: values.position,
              width: values.width,
              height: values.height,
              enabled: values.enabled ?? a.enabled,
              priority: values.priority ?? a.priority,
            }
          : a
      )
      updateSite(site.id, { ads: newAds })
    } else {
      const newAd: AdConfig = {
        id: crypto.randomUUID?.() || Date.now().toString(36),
        type: values.type,
        content: values.content,
        position: values.position,
        width: values.width,
        height: values.height,
        enabled: true,
        priority: 0,
      }
      updateSite(site.id, { ads: [...site.ads, newAd] })
    }

    setModalOpen(false)
    setEditing(null)
    form.resetFields()
    message.success('保存成功')
  }

  const handleDelete = (adId: string) => {
    updateSite(site.id, { ads: site.ads.filter((a) => a.id !== adId) })
    message.success('删除成功')
  }

  const toggleEnabled = (adId: string) => {
    updateSite(site.id, {
      ads: site.ads.map((a) => (a.id === adId ? { ...a, enabled: !a.enabled } : a)),
    })
  }

  const columns: ColumnsType<AdConfig> = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 160,
      render: (type) => <Tag>{AD_TYPES[type]}</Tag>,
    },
    {
      title: '位置',
      dataIndex: 'position',
      key: 'position',
      width: 100,
      render: (pos) => pos || '-',
    },
    {
      title: '尺寸',
      dataIndex: 'width',
      key: 'size',
      width: 100,
      render: (_, record) => `${record.width || '-'}x${record.height || '-'}`,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
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
          添加广告
        </Button>
      </div>
      <Table rowKey="id" columns={columns} dataSource={site.ads} pagination={false} size="middle" />
      <Modal
        title={editing ? '编辑广告' : '添加广告'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="type" label="广告类型" rules={[{ required: true, message: '请选择类型' }]}>
            <Select
              options={Object.entries(AD_TYPES).map(([value, label]) => ({ value, label }))}
            />
          </Form.Item>
          <Form.Item name="content" label="广告内容" rules={[{ required: true, message: '请输入广告内容' }]}>
            <div style={{ border: '1px solid #d9d9d9', borderRadius: 6 }}>
              <Editor
                height={200}
                defaultLanguage="html"
                theme="vs-light"
                options={{ minimap: { enabled: false }, fontSize: 13 }}
              />
            </div>
          </Form.Item>
          <Form.Item name="position" label="显示位置">
            <Select
              options={[
                { value: 'top', label: '顶部' },
                { value: 'bottom', label: '底部' },
                { value: 'left', label: '左侧' },
                { value: 'right', label: '右侧' },
                { value: 'center', label: '居中' },
                { value: 'fullscreen', label: '全屏' },
              ]}
              placeholder="选择位置"
              allowClear
            />
          </Form.Item>
          <Form.Item noStyle shouldUpdate>
            {() => {
              const type = form.getFieldValue('type')
              if (type === 'banner' || type === 'floating') {
                return (
                  <div style={{ display: 'flex', gap: 16 }}>
                    <Form.Item name="width" label="宽度 (px)" style={{ flex: 1 }}>
                      <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="height" label="高度 (px)" style={{ flex: 1 }}>
                      <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                  </div>
                )
              }
              return null
            }}
          </Form.Item>
          <Form.Item name="enabled" label="启用" valuePropName="checked" initialValue={true}>
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
