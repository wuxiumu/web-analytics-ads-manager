import { useState } from 'react'
import { Segmented } from 'antd'
import type { Site } from '@/types'

interface PreviewProps {
  site: Site
}

const SIZES: Record<string, { width: number; label: string }> = {
  desktop: { width: 1024, label: '桌面' },
  tablet: { width: 768, label: '平板' },
  mobile: { width: 375, label: '手机' },
}

export default function Preview({ site }: PreviewProps) {
  const [size, setSize] = useState<string>('desktop')
  const currentWidth = SIZES[size]?.width || 1024

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Segmented
          options={Object.values(SIZES).map((s) => ({ label: s.label, value: s.label }))}
          onChange={(val) => {
            const key = Object.entries(SIZES).find(([, v]) => v.label === val)?.[0] || 'desktop'
            setSize(key)
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', background: '#f5f5f5', borderRadius: 8, padding: 16 }}>
        <div style={{ width: currentWidth, maxWidth: '100%', transition: 'width 0.3s' }}>
          <iframe
            src={`/demo/${site.id}`}
            style={{
              width: '100%',
              height: 600,
              border: '1px solid #d9d9d9',
              borderRadius: 8,
            }}
            title={`${site.name} 预览`}
          />
        </div>
      </div>
    </div>
  )
}
