import { useSiteStore } from '@/store/siteStore'
import { useParams } from 'react-router-dom'
import type { AdConfig, StatConfig } from '@/types'

function useSite(id: string) {
  return useSiteStore((s) => s.sites.find((site) => site.id === id))
}

export default function Demo() {
  const { id } = useParams<{ id: string }>()
  const site = useSite(id!)

  if (!site) {
    return <div style={{ padding: 40, textAlign: 'center' }}>网站不存在</div>
  }

  const { stats, ads } = site

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* 模拟目标网站 */}
      <div style={{ padding: 24, maxWidth: 960, margin: '0 auto' }}>
        <h1>{site.name}</h1>
        <p style={{ color: '#888' }}>{site.domain}</p>
        <div style={{ marginTop: 24, padding: 24, background: '#fafafa', borderRadius: 8 }}>
          <h2>这是一个模拟页面</h2>
          <p>此页面用于预览统计和广告代码的实际效果。</p>
          <p style={{ marginTop: 16 }}>当前已配置：</p>
          <ul style={{ marginLeft: 24 }}>
            {stats.map((s: StatConfig) => (
              <li key={s.id}>{s.type} {s.enabled ? '(启用)' : '(停用)'}</li>
            ))}
            {ads.map((a: AdConfig) => (
              <li key={a.id}>{a.type} - {a.position || '无'} {a.enabled ? '(启用)' : '(停用)'}</li>
            ))}
            {stats.length === 0 && ads.length === 0 && (
              <li style={{ color: '#999' }}>暂无配置</li>
            )}
          </ul>
        </div>

        {/* 渲染 Banner 广告 */}
        {ads
          .filter((a: AdConfig) => a.enabled && a.type === 'banner')
          .sort((a: AdConfig, b: AdConfig) => (a.priority || 0) - (b.priority || 0))
          .map((ad: AdConfig) => (
            <div
              key={ad.id}
              style={{
                marginTop: 16,
                padding: 16,
                background: '#fffbe6',
                border: '1px dashed #faad14',
                borderRadius: 4,
                width: ad.width || '100%',
                height: ad.height || 'auto',
                overflow: 'hidden',
              }}
              dangerouslySetInnerHTML={{ __html: ad.content }}
            />
          ))}
      </div>

      {/* 渲染悬浮广告 */}
      {ads
        .filter((a: AdConfig) => a.enabled && a.type === 'floating')
        .map((ad: AdConfig) => (
          <div
            key={ad.id}
            style={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              width: ad.width || 300,
              height: ad.height || 250,
              zIndex: 9999,
              background: '#fff',
              border: '1px solid #e8e8e8',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
            dangerouslySetInnerHTML={{ __html: ad.content }}
          />
        ))}

      {/* 渲染弹窗广告 */}
      {ads
        .filter((a: AdConfig) => a.enabled && a.type === 'popup')
        .map((ad: AdConfig) => (
          <div
            key={ad.id}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                background: '#fff',
                padding: 24,
                borderRadius: 8,
                maxWidth: '90%',
                maxHeight: '90%',
                overflow: 'auto',
              }}
              dangerouslySetInnerHTML={{ __html: ad.content }}
            />
          </div>
        ))}
    </div>
  )
}
