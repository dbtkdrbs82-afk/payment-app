import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'POST only'
    })
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Supabase environment variables are missing')

    return res.status(500).json({
      result: 'ERROR',
      message: 'Supabase environment variables are missing'
    })
  }

  try {
    // Supabase 연결 확인용 읽기 테스트
    const response = await fetch(
      `${supabaseUrl}/rest/v1/merchants?select=id&limit=1`,
      {
        method: 'GET',
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Supabase connection failed:', data)

      return res.status(500).json({
        result: 'ERROR',
        message: 'Supabase connection failed',
        detail: data
      })
    }

    console.log('========== KORPAY NOTI TEST ==========')
    console.log('body:', req.body)
    console.log('supabase:', data)

    return res.status(200).json({
      result: 'OK',
      db: 'connected'
    })
  } catch (error) {
    console.error('Korpay Noti API error:', error)

    return res.status(500).json({
      result: 'ERROR',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}