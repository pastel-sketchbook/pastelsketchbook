import { serve } from 'bun'

async function fetchSingleVideo(videoId: string) {
  const url = `https://www.youtube.com/watch?v=${videoId}`
  try {
    const response = await fetch(url)
    const html = await response.text()
    const match = html.match(/var ytInitialData = ({.*?});/)
    if (!match) {
      console.error(`Failed to find ytInitialData for video ${videoId}`)
      return null
    }

    const data = JSON.parse(match[1])
    const contents = data.contents?.twoColumnWatchNextResults?.results?.results?.contents

    if (!contents) {
      console.error(`Failed to find contents for video ${videoId}`)
      return null
    }

    const videoPrimaryInfo = contents.find((item: any) => item.videoPrimaryInfoRenderer)
    const videoSecondaryInfo = contents.find((item: any) => item.videoSecondaryInfoRenderer)

    if (!videoPrimaryInfo || !videoSecondaryInfo) {
      console.error(`Failed to find video info for ${videoId}`)
      return null
    }

    const title = videoPrimaryInfo.videoPrimaryInfoRenderer.title?.runs?.[0]?.text || ''
    const viewsText =
      videoPrimaryInfo.videoPrimaryInfoRenderer.viewCount?.videoViewCountRenderer?.viewCount
        ?.simpleText || '0 views'
    const dateText = videoPrimaryInfo.videoPrimaryInfoRenderer.dateText?.simpleText || 'Unknown'

    const views = parseInt(viewsText.replace(/,/g, '').replace(/\D/g, ''), 10) || 0

    return {
      id: videoId,
      title,
      views,
      date: dateText,
    }
  } catch (e) {
    console.error(`Error fetching video ${videoId}:`, e)
    return null
  }
}

async function fetchVideoMetadata(videoIds: string[]) {
  const batchSize = 5
  const results = []

  for (let i = 0; i < videoIds.length; i += batchSize) {
    const batch = videoIds.slice(i, i + batchSize)
    const batchResults = await Promise.all(batch.map((id) => fetchSingleVideo(id)))
    results.push(...batchResults.filter((r) => r !== null))
  }

  return results
}

serve({
  port: 3001,
  idleTimeout: 255,
  fetch: async (req) => {
    const url = new URL(req.url)

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    if (url.pathname === '/api/videos') {
      const videoIds = url.searchParams.get('ids')?.split(',') || []
      if (videoIds.length === 0) {
        return new Response(JSON.stringify({ error: 'No video IDs provided' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        })
      }

      const metadata = await fetchVideoMetadata(videoIds)
      return new Response(JSON.stringify(metadata), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders })
  },
})

console.log('Server running on http://localhost:3001')
