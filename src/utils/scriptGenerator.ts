import type { Site, StatConfig, AdConfig } from '@/types'

function generateStatScript(stat: StatConfig): string {
  switch (stat.type) {
    case 'ga4': {
      const id = stat.params.measurementId || ''
      return `
// Google Analytics (GA4)
(function() {
  var s = document.createElement('script');
  s.src = 'https://www.googletagmanager.com/gtag/js?id=${id}';
  s.async = true;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${id}');
})();`
    }
    case 'gtm': {
      const id = stat.params.containerId || ''
      return `
// Google Tag Manager
(function(w,d,s,l,i){
  w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
  f.parentNode.insertBefore(j,f);
}) (window,document,'script','dataLayer','${id}');`
    }
    case 'baidu': {
      const id = stat.params.trackerId || ''
      return `
// 百度统计
(function() {
  var h = document.location.protocol;
  var p = document.createElement('script');
  p.type = 'text/javascript';
  p.async = true;
  p.src = h + '//hm.baidu.com/hm.js?${id}';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(p, s);
})();`
    }
    case 'custom': {
      return stat.params.code || ''
    }
    default:
      return ''
  }
}

function generateAdScript(ad: AdConfig): string {
  return `
// Ad: ${ad.type} (${ad.id})
(function() {
  var container = document.createElement('div');
  container.innerHTML = ${JSON.stringify(ad.content)};
  ${ad.type === 'banner' ? `
  container.style.cssText = 'display:block;width:${ad.width || '100%'};height:${ad.height || 'auto'};';
  document.body.appendChild(container);
  ` : ad.type === 'floating' ? `
  container.style.cssText = 'position:fixed;bottom:0;right:0;width:${ad.width || 300}px;height:${ad.height || 250}px;z-index:9999;';
  document.body.appendChild(container);
  ` : ad.type === 'popup' ? `
  var overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:99999;display:flex;align-items:center;justify-content:center;';
  container.style.cssText = 'background:#fff;padding:24px;border-radius:8px;max-width:90%;max-height:90%;overflow:auto;';
  overlay.appendChild(container);
  document.body.appendChild(overlay);
  ` : `
  document.body.appendChild(container);
  `}
})();`
}

export function generateScript(site: Site): string {
  const parts: string[] = []

  parts.push(`// ${site.name} (${site.domain})`)
  parts.push(`// Generated on ${new Date().toISOString()}`)
  parts.push(`;`)

  // Stats
  const enabledStats = site.stats.filter((s) => s.enabled).sort((a, b) => a.order - b.order)
  if (enabledStats.length > 0) {
    parts.push('/* === Stats === */')
    parts.push(...enabledStats.map(generateStatScript))
  }

  // Ads
  const enabledAds = site.ads.filter((a) => a.enabled).sort((a, b) => (a.priority || 0) - (b.priority || 0))
  if (enabledAds.length > 0) {
    parts.push('/* === Ads === */')
    parts.push(...enabledAds.map(generateAdScript))
  }

  return parts.join('\n')
}
