import { Form, Input, Button, Card } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useSiteStore } from '@/store/siteStore'

export default function SiteAdd() {
  const navigate = useNavigate()
  const addSite = useSiteStore((s) => s.addSite)
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    const site = addSite({
      name: values.name,
      domain: values.domain,
      description: values.description || '',
      stats: [],
      ads: [],
    })
    navigate(`/site/${site.id}`)
  }

  return (
    <Card title="新建网站" extra={<Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>返回</Button>}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="name" label="网站名称" rules={[{ required: true, message: '请输入网站名称' }]}>
          <Input placeholder="例如：我的博客" />
        </Form.Item>
        <Form.Item name="domain" label="域名" rules={[{ required: true, message: '请输入域名' }]}>
          <Input placeholder="例如：example.com" />
        </Form.Item>
        <Form.Item name="description" label="描述">
          <Input.TextArea placeholder="网站描述（可选）" rows={3} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            创建
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
