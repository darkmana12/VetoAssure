import { NextRequest, NextResponse } from 'next/server'
import { fetchRandomPhoto, searchPhotos } from '@/lib/unsplash'

/**
 * GET /api/unsplash?random=1&q=veterinary
 * GET /api/unsplash?q=dog&per_page=10
 */
export async function GET(req: NextRequest) {
  if (!process.env.UNSPLASH_ACCESS_KEY) {
    return NextResponse.json({ error: 'Unsplash non configuré (UNSPLASH_ACCESS_KEY)' }, { status: 503 })
  }

  const sp = req.nextUrl.searchParams
  const q = sp.get('q') ?? sp.get('query') ?? ''
  const random = sp.get('random') === '1' || sp.get('random') === 'true'

  if (random) {
    const photo = await fetchRandomPhoto(q || 'veterinary')
    if (!photo) {
      return NextResponse.json({ error: 'Aucune photo Unsplash' }, { status: 502 })
    }
    return NextResponse.json(photo)
  }

  if (q) {
    const per = Math.min(Number(sp.get('per_page')) || 10, 30)
    const results = await searchPhotos(q, per)
    if (!results) {
      return NextResponse.json({ error: 'Recherche Unsplash impossible' }, { status: 502 })
    }
    return NextResponse.json({ results })
  }

  return NextResponse.json(
    { error: 'Utilisez ?random=1&q=... ou ?q=mot-clé' },
    { status: 400 }
  )
}
