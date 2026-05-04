#!/usr/bin/env node
/**
 * IndexNow bulk submit — VetoAssure
 *
 * Lit le sitemap.xml de production, en extrait toutes les URLs et les
 * soumet à api.indexnow.org. Bing, Yandex, DuckDuckGo et Seznam reçoivent
 * automatiquement la notification (protocole IndexNow partagé).
 *
 * Usage :
 *   node scripts/indexnow-submit.mjs                  # toutes les URLs du sitemap
 *   node scripts/indexnow-submit.mjs URL1 URL2 ...    # URLs spécifiques uniquement
 *
 * Documentation : https://www.indexnow.org/documentation
 */

const HOST = 'vetoassure.fr'
const KEY = '8063f87ddd204f8caa78b87a421ee10e'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const SITEMAP_URL = `https://${HOST}/sitemap.xml`
const ENDPOINT = 'https://api.indexnow.org/IndexNow'

async function fetchSitemapUrls() {
  console.log(`📥 Fetching sitemap: ${SITEMAP_URL}`)
  const res = await fetch(SITEMAP_URL)
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`)
  const xml = await res.text()
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  console.log(`📦 Found ${urls.length} URLs in sitemap`)
  return urls
}

async function submitBatch(urls) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })
  return { status: res.status, body: await res.text().catch(() => '') }
}

async function main() {
  const args = process.argv.slice(2)
  const urls = args.length > 0 ? args : await fetchSitemapUrls()

  if (urls.length === 0) {
    console.log('⚠️ No URLs to submit')
    process.exit(0)
  }

  // IndexNow accepte jusqu'à 10 000 URLs par requête.
  const BATCH_SIZE = 1000
  let totalSubmitted = 0
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE)
    console.log(`📤 Submitting batch ${i / BATCH_SIZE + 1} (${batch.length} URLs)...`)
    const result = await submitBatch(batch)
    if (result.status === 200 || result.status === 202) {
      console.log(`   ✅ OK (${result.status})`)
      totalSubmitted += batch.length
    } else {
      console.error(`   ❌ Status ${result.status}: ${result.body || '(empty)'}`)
      console.error('   Codes courants : 400 (format invalide), 403 (clé invalide), 422 (URLs non sur le host), 429 (rate limit)')
      process.exit(1)
    }
  }

  console.log(`\n🎉 ${totalSubmitted} URL(s) soumise(s) à IndexNow.`)
  console.log(`Bing, Yandex, DuckDuckGo et Seznam vont recrawler dans les heures qui viennent.`)
  console.log(`Vérification : https://www.bing.com/webmasters → URL Inspection`)
}

main().catch((err) => {
  console.error('💥 Erreur :', err.message)
  process.exit(1)
})
