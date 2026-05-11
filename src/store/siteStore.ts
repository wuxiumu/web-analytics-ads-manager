import { create } from 'zustand'
import type { Site } from '@/types'

const STORAGE_KEY = 'waam_sites'

function loadSites(): Site[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveSites(sites: Site[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sites))
}

interface SiteStore {
  sites: Site[]
  addSite: (site: Omit<Site, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => Site
  updateSite: (id: string, site: Partial<Omit<Site, 'id' | 'createdAt'>>) => void
  deleteSite: (id: string) => void
  getSite: (id: string) => Site | undefined
}

export const useSiteStore = create<SiteStore>((set, get) => ({
  sites: loadSites(),

  addSite: (data) => {
    const now = new Date().toISOString()
    const siteId = data.id || crypto.randomUUID?.() || Date.now().toString(36)
    const site: Site = {
      id: siteId,
      name: data.name,
      domain: data.domain,
      description: data.description,
      stats: data.stats,
      ads: data.ads,
      createdAt: now,
      updatedAt: now,
    }
    set((state) => {
      const sites = [...state.sites, site]
      saveSites(sites)
      return { sites }
    })
    return site
  },

  updateSite: (id, updates) => {
    set((state) => {
      const sites = state.sites.map((s) =>
        s.id === id ? { ...s, ...updates, id: s.id, createdAt: s.createdAt, updatedAt: new Date().toISOString() } : s
      )
      saveSites(sites)
      return { sites }
    })
  },

  deleteSite: (id) => {
    set((state) => {
      const sites = state.sites.filter((s) => s.id !== id)
      saveSites(sites)
      return { sites }
    })
  },

  getSite: (id) => get().sites.find((s) => s.id === id),
}))
