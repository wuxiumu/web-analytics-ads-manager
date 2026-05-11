export interface Site {
  id: string
  name: string
  domain: string
  description: string
  stats: StatConfig[]
  ads: AdConfig[]
  createdAt: string
  updatedAt: string
}

export interface StatConfig {
  id: string
  type: 'ga4' | 'gtm' | 'baidu' | 'custom'
  params: Record<string, string>
  enabled: boolean
  order: number
}

export interface AdConfig {
  id: string
  type: 'banner' | 'popup' | 'floating' | 'custom'
  content: string
  position?: string
  width?: number
  height?: number
  enabled: boolean
  priority: number
}
