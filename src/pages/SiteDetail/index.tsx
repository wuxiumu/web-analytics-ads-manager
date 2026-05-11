import { Tabs, Descriptions, Card, Space, Button } from 'antd'
import { ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useSiteStore } from '@/store/siteStore'
import Stats from './Stats'
import Ads from './Ads'
import Preview from './Preview'
import { generateScript } from '@/utils/scriptGenerator'

function useSite(id: string) {
  return useSiteStore((s) => s.sites.find((site) => site.id === id))
}

export default function SiteDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const site = useSite(id!)

  if (!site) {
    return <div>网站不存在</div>
  }

  const handleExport = () => {
    const script = generateScript(site)
    const blob = new Blob([script], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${site.name.replace(/\s+/g, '_')}.js`
    a.click()
    URL.revokeObjectURL(url)
  }

  const items = [
    {
      key: 'stats',
      label: '统计代码',
      children: <Stats site={site} />,
    },
    {
      key: 'ads',
      label: '广告代码',
      children: <Ads site={site} />,
    },
    {
      key: 'preview',
      label: '预览',
      children: <Preview site={site} />,
    },
  ]

  return (
    <div>
      <Card
        title={site.name}
        extra={
          <Space>
            <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <Button icon={<DownloadOutlined />} onClick={handleExport}>
              导出 JS
            </Button>
            <Button type="primary" onClick={() => navigate(`/site/${site.id}/edit`)}>
              编辑
            </Button>
          </Space>
        }
        style={{ marginBottom: 16 }}
      >
        <Descriptions column={3}>
          <Descriptions.Item label="域名">{site.domain}</Descriptions.Item>
          <Descriptions.Item label="描述" span={2}>{site.description || '-'}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Tabs defaultActiveKey="stats" items={items} />
    </div>
  )
}
