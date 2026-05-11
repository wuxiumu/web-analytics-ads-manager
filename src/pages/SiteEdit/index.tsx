import { useEffect } from 'react'
import { Form, Input, Button, Card } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useSiteStore } from '@/store/siteStore'

export default function SiteEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const getSite = useSiteStore((s) => s.getSite)
  const updateSite = useSiteStore((s) => s.updateSite)
  const [form] = Form.useForm()

  const site = id ? getSite(id) : undefined

  useEffect(() => {
    if (site) {
      form.setFieldsValue({
        name: site.name,
        domain: site.domain,
        description: site.description,
      })
    }
  }, [site])

  const handleSubmit = (values: any) => {
    if (!id) return
    updateSite(id, {
      name: values.name,
      domain: values.domain,
      description: values.description || '',
    })
    navigate(`/site/${id}`)
  }

  if (!site) {
    return <div>网站不存在</div>
  }

  return (
    <Card title="编辑网站" extra={<Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>返回</Button>}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="name" label="网站名称" rules={[{ required: true, message: '请输入网站名称' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="domain" label="域名" rules={[{ required: true, message: '请输入域名' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="描述">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
